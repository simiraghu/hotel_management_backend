import UserSchema from '../../models/UserSchema.js'
import bcrypt from 'bcryptjs';

const CreateUser = async (req, res) => {
    try {

        const { username, email, password, phonenumber, city, role } = req?.body;

        if (!username) {
            return res.status(400).json(
                {
                    success: false,
                    message: "User name is required"
                }
            )
        }

        if (!email) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Email is required"
                }
            )
        }

        const isEmail = await UserSchema.findOne({ email })
        if (isEmail) {
            return res.status(400).json(
                {
                    success: false,
                    message: "This email is already exists"
                }
            )
        }

        if (!password) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Password is required"
                }
            )
        }

        const hash_password = await bcrypt.hash(password, 10)

        if (!phonenumber) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Phone number is required"
                }
            )
        }

        if (!city) {
            return res.status(400).json(
                {
                    success: false,
                    message: "City is required"
                }
            )
        }

        const user = await UserSchema.create(
            {
                username,
                email,
                password: hash_password,
                original_password: password,
                phonenumber,
                city,
                role
            }
        )

        return res.status(200).json(
            {
                success: true,
                message: "successfully created",
                user
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: err?.message
            }
        )
    }
}

export default CreateUser;