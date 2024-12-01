import BookingSchema from '../../models/BookingSchema.js';
import mongoose from 'mongoose';

const GetBookingByuserId = async (req, res) => {
    try {
        const userId = req?.userId

        const booking = await BookingSchema.aggregate(
            [
                {
                    $match: {
                        userId: new mongoose.Types.ObjectId(userId),
                        status: {
                            $ne: "deleted"
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'rooms',
                        localField: 'roomId',
                        foreignField: '_id',
                        as: 'room'
                    }
                },
                {
                    $lookup: {
                        from: 'hotels',
                        localField: 'room.hotelId',
                        foreignField: '_id',
                        as: 'hotel'
                    }
                }
            ]
        )

        return res.status(200).json(
            {
                success: true,
                message: "successfully get bookings",
                booking
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

export default GetBookingByuserId;