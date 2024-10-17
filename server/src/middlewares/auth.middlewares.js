import { User } from "../models/user.models.js"
import { decrypt_jwt_token } from "../utils/jwt.js"

export const auth_middleware = (roles) => async (req, res, next) => {
    try {
        const token = req.header('Authorization') || req.body.token
        // console.log(token)
        // console.log('token', token)
        if (!token) return res.status(401).json({ error: 'Unauthorized user' })

        const verify_token = decrypt_jwt_token(token, process.env.JWT_PRIVATE_KEY)
        // console.log(verify_token)
        if (!verify_token) return res.status(401).json({ erorr: 'Unauthorized user' })
        // console.log('verify_token', verify_token)

        const user = await User.findById(verify_token._id._id)
        if (!user) return res.status(404).json({ error: 'user not found' })
        // console.log('user', user)

        if (!roles.includes(user.user_role)) return res.status(401).json({ error: 'Unauthorized user' })
        // console.log(user.user_role)

        req.user_id = user._id
        req.user_role = user.user_role

        next()
    } catch (error) {
        res.status(401).json({ error: error })
    }
}