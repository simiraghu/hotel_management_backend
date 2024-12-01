import HotelSchema from '../../models/HotelSchema.js';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';

const UpdateHotel = async (req, res) => {

    cloudinary.config(
        {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        }
    );

    try {
        const { id } = req?.query;
        const { name, description, facilities, image, city, address, email, contactNo } = req?.body;

        const files = req?.files;

        const imageUrls = await Promise.all(
            files.length > 0 ? files.map((file) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: 'images' },
                        (error, result) => {
                            if (error) {
                                console.log(error, "image uploading err")
                                reject(error)
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


        const hotel = await HotelSchema.findByIdAndUpdate(
            {
                _id: new mongoose.Types.ObjectId(id),
                status: {
                    $ne: "deleted"
                }
            },
            {
                name,
                email,
                contactNo,
                description,
                facilities,
                image: finalImages,
                address,
                city
            },
            { new: true }
        )

        return res.status(200).json(
            {
                success: true,
                message: "successfully updated",
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

export default UpdateHotel;