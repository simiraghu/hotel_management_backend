import HotelSchema from '../../models/HotelSchema.js';
import RoomSchema from '../../models/RoomSchema.js';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary'

const CreateRoom = async (req, res) => {

    cloudinary.config(
        {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        }
    )

    let success = false;
    try {

        const { roomtype, description, price, hotelId } = req?.body;

        const files = req?.files;

        if (!roomtype) {
            return res.status(400).json(
                {
                    success,
                    message: "Room type is required"
                }
            )
        }

        if (!description) {
            return res.status(400).json(
                {
                    success,
                    message: "Description is required"
                }
            )
        }

        if (!price) {
            return res.status(400).json(
                {
                    success,
                    message: "Price is required"
                }
            )
        }

        if (!hotelId) {
            return res.status(400).json(
                {
                    success,
                    message: "Hotel is required"
                }
            )
        }

        const isHotel = await HotelSchema.findOne(
            {
                _id: new mongoose.Types.ObjectId(hotelId)
            }
        )

        if (!isHotel) {
            return res.status(400).json(
                {
                    success,
                    message: "Hotel not found"
                }
            )
        }

        const imageUrls = await Promise.all(
            files.map((file) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: 'images' },
                        (error, result) => {
                            if (error) {
                                console.error("Cloudinary Upload Error:", error);
                                reject(error);
                            } else {
                                resolve(result.url); // Extract the `url` property
                            }
                        }
                    );
                    stream.end(file.buffer); // Pass the buffer to the stream
                });
            })
        );

        const room = await RoomSchema.create(
            {
                roomtype,
                description,
                price,
                hotelId,
                image: imageUrls
            }
        )

        return res.status(200).json(
            {
                success: true,
                message: "Successfully created",
                room
            }
        )

    } catch (error) {
        return res.status(500).json(
            {
                success,
                message: error?.message
            }
        )
    }
}

export default CreateRoom;