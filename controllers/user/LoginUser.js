import UserSchema from "../../models/UserSchema.js";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req?.body;
        console.log(email, "email")

        if (!email) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Email is required"
                }
            )
        }

        const isUser = await UserSchema.findOne({ email })
        if (!isUser) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Invalid credential"
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

        const isPassword = await bcrypt.compare(password, isUser?.password)
        if (!isPassword) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Invalid credential"
                }
            )
        }

        const token = await JWT.sign({ userId: isUser?._id, email: isUser?.email }, process.env.JWT_SECRET_KEY)

        return res.status(200).json(
            {
                success: true,
                message: "Logged In successfully",
                token
            }
        )

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: error?.message
            }
        )
    }
}

export default LoginUser;