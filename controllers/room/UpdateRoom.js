import RoomSchema from '../../models/RoomSchema.js';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

export const UpdateRoom = async (req, res) => {

    cloudinary.config(
        {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        }
    )

    try {

        const { roomId } = req?.query;
        const { hotelId, roomtype, description, price, image } = req?.body;
        const files = req?.files;
        console.log(files.length > 0)

        const imageUrls = await Promise.all(
            files.length > 0 ? files.map((file) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: 'images' },
                        (error, result) => {
                            if (error) {
                                console.log(error, "Image uploading error");
                                reject(error);
                            } else {
                                resolve(result.url)
                            }
                        }
                    )
                    stream.end(file.buffer)
                })
            }) : []
        )

        let finalImages;

        if (image && imageUrls) {
            finalImages = [...image, ...imageUrls]

        } else if (image) {
            finalImages = [...image]

        } else if (imageUrls) {
            finalImages = [...imageUrls]

        } else {
            finalImages = []
        }

        const room = await RoomSchema.findByIdAndUpdate(
            {
                _id: new mongoose.Types.ObjectId(roomId),
                status: {
                    $ne: "deleted"
                }
            },
            {
                hotelId,
                roomtype,
                description,
                price,
                image: finalImages
            },
            { new: true }
        )

        return res.status(200).json(
            {
                success: true,
                message: "successfully updated",
                room
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

export default UpdateRoom;