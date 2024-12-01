import JWT from 'jsonwebtoken';
import UserSchema from '../models/UserSchema.js';
import mongoose from 'mongoose';

const Authentication = async (req, res, next) => {
    try {

        const token = req?.header('token')

        if (!token) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Invalid authentication"
                }
            )
        }

        const auth_token = await JWT.verify(token, process.env.JWT_SECRET_KEY)
        if (!auth_token) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Invalid authentication"
                }
            )
        }

        const user = await UserSchema.findOne(
            {
                _id: new mongoose.Types.ObjectId(auth_token?.userId)
            }
        )

        if (!user) {
            return res.status(400).json(
                {
                    success: false,
                    message: "User not found"
                }
            )
        }

        req.userId = auth_token?.userId
        next()

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: error?.message
            }
        )
    }
}

export default Authentication;