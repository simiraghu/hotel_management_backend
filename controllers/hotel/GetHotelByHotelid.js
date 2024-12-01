import HotelSchema from '../../models/HotelSchema.js';
import mongoose from 'mongoose';

const GetHotelByHotelid = async (req, res) => {
    try {
        const { hotelId } = req?.params;

        const hotel = await HotelSchema.findOne(
            {
                _id: new mongoose.Types.ObjectId(hotelId),
                status: {
                    $ne: "deleted"
                }
            }
        )


        return res.status(200).json(
            {
                success: true,
                message: "Successfully get",
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

export default GetHotelByHotelid;