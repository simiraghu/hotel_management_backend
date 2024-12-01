import RoomSchema from '../../models/RoomSchema.js';
import mongoose from 'mongoose';

const GetRoomByRoomId = async (req, res) => {
    try {
        const { roomId } = req?.query;

        const room = await RoomSchema.findOne(
            {
                _id : new mongoose.Types.ObjectId(roomId),
                status: {
                    $ne: "deleted"
                }
            }
        )

        return res.status(200).json(
            {
                success: true,
                message: "successfully get room",
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

export default GetRoomByRoomId;