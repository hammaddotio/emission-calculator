import bcrypt from "bcrypt"

export const encrypt_password = async (password) => {
    try {
        return await bcrypt.hash(password, 8)
    } catch (error) {
        console.log(error)
        return error
    }
}

export const compare_password = async (password, encrypted_password) => {
    try {
        return await bcrypt.compare(password, encrypted_password)
    } catch (error) {
        console.log(error)
        return error
    }
}