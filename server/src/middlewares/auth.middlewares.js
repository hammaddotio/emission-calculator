import { User } from "../models/user.models.js"
import { decrypt_jwt_token } from "../utils/jwt.js"

export const auth_middleware = (roles) => async (req, res, next) => {
    try {
        const token = req.header('Authorization') || req.body.token
        if (!token) return res.status(401).json(new ApiResponse(401, {}, 'Unauthorized user'))

        const verify_token = decrypt_jwt_token(token, process.env.JWT_PRIVATE_KEY)
        if (!verify_token) return res.status(401).json(new ApiResponse(401, {}, 'invalid token'))

        const user = await User.findById(verify_token.id)
        console.log(user)
        if (!user) return res.status(404).json(new ApiResponse(404, {}, 'user not found'))

        if (!roles.includes(user.role)) return res.status(401).json(new ApiResponse(401, {}, 'unauthorized user'))

        req.user_id = user._id
        req.user_role = user.user_role

        next()
    } catch (error) {
        res.status(401).json({ error: error })
    }
}