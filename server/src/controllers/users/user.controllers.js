import { User } from "../../models/user.models.js"
import { encrypt_password } from "../../utils/bcrypt.js"

export const get_all_users = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ users })
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

export const get_user = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const update_user = async (req, res) => {
    try {
        const { username, email, password } = req.body;


        const find_user = await User.findById(req.params.id);
        if (!find_user) return res.status(400).json({ message: 'user not found' })

        // const decrypt_password = compare_password(password, find_user.password)
        // console.log(decrypt_password)

        const updated_data = {
            username,
            email,
            password: await encrypt_password(password),
        };

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updated_data,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const delete_user = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findByIdAndDelete(id)
        res.status(200).json({ user })
    } catch (error) {
        res.status(400).json({ error: error })
    }
}