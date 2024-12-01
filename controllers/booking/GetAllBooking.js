import BookingSchema from '../../models/BookingSchema.js';


const GetAllBooking = async (req, res) => {
    try {
        const booking = await BookingSchema.aggregate(
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
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
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
                },
                {
                    $project: {
                        "user.original_password": 0,
                        "user.password": 0
                    }
                }
            ]
        )

        return res.status(200).json(
            {
                success: true,
                message: "successfull get all the bookings",
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

export default GetAllBooking;