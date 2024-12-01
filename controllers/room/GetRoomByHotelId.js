import RoomSchema from "../../models/RoomSchema.js";

const GetRoomByHotelId = async (req, res) => {
    try {
        const { hotelId } = req?.query;

        const rooms = await RoomSchema.find(
            {
                hotelId,
                status: {
                    $ne: "deleted"
                }
            }
        )

        return res.status(200).json(
            {
                success: true,
                message: "successfully get room",
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

export default GetRoomByHotelId;