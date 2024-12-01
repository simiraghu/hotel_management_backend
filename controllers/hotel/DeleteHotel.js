import HotelSchema from '../../models/HotelSchema.js';
import RoomSchema from '../../models/RoomSchema.js';
import mongoose from 'mongoose';

const DeleteHotel = async (req, res) => {
    try {
        const { hotelId } = req?.query;
        console.log(hotelId, "hotelId")

        const hotel = await HotelSchema.findByIdAndUpdate(
            {
                _id: new mongoose.Types.ObjectId(hotelId),
                status: {
                    $ne: "deleted"
                }
            },
            { status: "deleted" },
            { new: true }
        )

        console.log(hotelId, hotel)

        const rooms = await RoomSchema.updateMany(
            {
                hotelId: new mongoose.Types.ObjectId(hotel?._id),
                status: {
                    $ne: "deleted"
                }
            },
            { status: "deleted" }
        )

        return res.status(200).json(
            {
                success: true,
                message: "successfully deleted",
                hotel,
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

export default DeleteHotel;