import RoomSchema from '../../models/RoomSchema.js';
import mongoose from 'mongoose';

const GetRoomByHotelIdAndRoomtype = async (req, res) => {
    try {

        const { hotelId, roomtype } = req?.query;

        let rooms;

        if (hotelId) {
            rooms = await RoomSchema.aggregate(
                [
                    {
                        $match: {
                            hotelId: new mongoose.Types.ObjectId(hotelId),
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
        }


        if (roomtype) {
            rooms = await RoomSchema.aggregate(
                [
                    {
                        $match: {
                            hotelId: new mongoose.Types.ObjectId(hotelId),
                            status: {
                                $ne: "deleted"
                            },
                            roomtype
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
        }

        return res.status(200).json(
            {
                success: true,
                message: "Successfully get",
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

export default GetRoomByHotelIdAndRoomtype;