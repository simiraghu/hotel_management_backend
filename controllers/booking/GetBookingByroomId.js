import BookingSchema from "../../models/BookingSchema.js";
import mongoose from "mongoose";

const GetBookingByroomId = async (req, res) => {
    try {

        const { roomId } = req?.query;

        const booking = await BookingSchema.aggregate(
            [
                {
                    $match: {
                        roomId: new mongoose.Types.ObjectId(roomId),
                        status: {
                            $ne: "deleted"
                        }
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
        return rse.status(500).json(
            {
                success: false,
                message: error?.message
            }
        )
    }
}

export default GetBookingByroomId;