import RoomSchema from '../../models/RoomSchema.js';
import mongoose from 'mongoose';

const GetAllRoom = async (req, res) => {

    try {

        const rooms = await RoomSchema.aggregate(
            [
                {
                    $match: {
                        status: {
                            $ne: "deleted"
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'hotels',
                        localField: 'hotelId',
                        foreignField: '_id',
                        as: 'hotel'
                    }
                }
            ]
        )

        return res.status(200).json(
            {
                success: true,
                message: "successfully find",
                rooms
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

export default GetAllRoom;