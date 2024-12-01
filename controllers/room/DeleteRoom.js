import RoomSchema from '../../models/RoomSchema.js';
import mongoose from 'mongoose';

const DeleteRoom = async (req, res) => {
    try {
        const { roomId } = req?.query;

        const room = await RoomSchema.findByIdAndUpdate(
            {
                _id: new mongoose.Types.ObjectId(roomId),
                status: {
                    $ne: "deleted"
                }
            },
            { status: "deleted" },
            { new: true }
        )

        return res.status(200).json(
            {
                success: true,
                message: "successfully deleted",
                room
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

export default DeleteRoom;