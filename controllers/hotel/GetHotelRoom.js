import RoomSchema from '../../models/RoomSchema.js';
import mongoose from 'mongoose';

const GetHotelRoom = async (req, res) => {
    try {
        const { hotelId, roomtype } = req?.query;

        let hotel;
        let query;

        if (hotelId, roomtype) {
            query = {
                status: {
                    $ne: "deleted"
                },
                roomtype,
                hotelId: new mongoose.Types.ObjectId(hotelId)
            }

        } else if (hotelId) {
            query = {
                status: {
                    $ne: "deleted"
                },
                hotelId: new mongoose.Types.ObjectId(hotelId)
            }
        } else {
            query = {
                status: {
                    $ne: "deleted"
                }
            }
        }
        
        hotel = await RoomSchema.aggregate(
            [
                {
                    $match: query
                    
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
            console.log(query, "<<<<<query")

        return res.status(200).json(
            {
                success: true,
                message: "successfully get hotel room",
                hotel
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

export default GetHotelRoom;