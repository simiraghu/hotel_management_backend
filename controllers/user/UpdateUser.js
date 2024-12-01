import UserSchema from '../../models/UserSchema.js';
import mongoose from 'mongoose';

const UpdateUser = async (req, res) => {
    try {

        const userId = req?.userId;
        const { username, phonenumber, city } = req?.body;

        if (!userId) {
            return res.status(400).json(
                {
                    success: false,
                    message: "please login first"
                }
            )
        }

        const user = await UserSchema.findByIdAndUpdate(
            {
                _id: new mongoose.Types.ObjectId(userId),
                status: {
                    $ne: "deleted"
                }
            },
            { username, phonenumber, city },
            { new: true }
        )

        return res.status(200).json(
            {
                success: true,
                message: "Update succesfully",
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

export default UpdateUser;