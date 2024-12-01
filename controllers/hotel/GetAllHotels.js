import HotelSchema from '../../models/HotelSchema.js';

const GetAllHotels = async (req, res) => {
    try {

        const hotels = await HotelSchema.find(
            {
                status: {
                    $ne: "deleted"
                }
            }
        )

        return res.status(200).json(
            {
                success: true,
                message: "successfully find",
                hotels
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

export default GetAllHotels;