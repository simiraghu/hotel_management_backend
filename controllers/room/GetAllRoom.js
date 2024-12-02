import RoomSchema from '../../models/RoomSchema.js';

const GetAllRoom = async (req, res) => {

    try {

        let rooms;
        const { check_in_date, check_out_date, roomtype } = req?.query;

        if (check_in_date && check_out_date && roomtype) {
            rooms = await RoomSchema.aggregate([
                {
                    $match: {
                        status: { $ne: "deleted" } // Exclude deleted rooms
                    }
                },
                {
                    $lookup: {
                        from: 'bookings', // Reference the bookings collection
                        localField: '_id', // Room ID in RoomSchema
                        foreignField: 'roomId', // Room ID in bookings
                        as: 'bookings' // Retrieve bookings for each room
                    }
                },
                {

                    $lookup: {
                        from: 'hotels',
                        localField: 'hotelId',
                        foreignField: '_id',
                        as: 'hotel'
                    }
                },
                {
                    $match: {
                        $or: [
                            { "bookings": { $exists: false } }, // Include rooms without bookings
                            {
                                $nor: [ // Exclude rooms with overlapping bookings
                                    {
                                        $or: [
                                            {
                                                "bookings.check_in_date": {
                                                    $lte: check_out_date, // Booking start overlaps with the query range
                                                    $gte: check_in_date
                                                }
                                            },
                                            {
                                                "bookings.check_out_date": {
                                                    $gte: check_in_date, // Booking end overlaps with the query range
                                                    $lte: check_out_date
                                                }
                                            },
                                            {
                                                $and: [ // Booking range completely overlaps the query range
                                                    {
                                                        "bookings.check_in_date": { $lte: check_in_date }
                                                    },
                                                    {
                                                        "bookings.check_out_date": { $gte: check_out_date }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    $project: {
                        bookings: 0 // Exclude bookings from the final output
                    }
                }
            ]);

        } else {

            rooms = await RoomSchema.aggregate(
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
        }

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