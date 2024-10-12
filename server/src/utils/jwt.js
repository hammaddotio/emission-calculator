import jwt from "jsonwebtoken"

export const generate_jwt_token = (_id) => {
    return jwt.sign({ _id: _id }, process.env.JWT_PRIVATE_KEY)
}

export const decrypt_jwt_token = (token) => {
    return jwt.verify(token, process.env.JWT_PRIVATE_KEY)
}