import UserSchema from '../../models/UserSchema.js';
import mongoose from 'mongoose';

export const GetUserDetails = async (req, res) => {
    try {

        const userId = req?.userId;
        if (!userId) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Please Login first"
                }
            )
        }

        const user = await UserSchema.findOne(
            {
                _id: new mongoose.Types.ObjectId(userId),
                status: {
                    $ne: "deleted"
                }
            }
        ).select('-password -original_password')

        return res.status(200).json(
            {
                success: true,
                message: "successfully get",
                user
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

export default GetUserDetails;