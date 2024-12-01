import HotelSchema from '../../models/HotelSchema.js';
import { v2 as cloudinary } from 'cloudinary'

const CreateHotel = async (req, res) => {

    cloudinary.config(
        {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        }
    );

    let success = false;
    try {

        const { name, email, contactNo, address, city, description, facilities, image } = req?.body;

        const files = req.files;

        if (!name) {
            return res.status(400).json(
                {
                    success,
                    message: "Name is required"
                }
            )
        }

        if (!email) {
            return res.status(400).json(
                {
                    success,
                    message: "Email is required"
                }
            )
        }

        const isUser = await HotelSchema.findOne({ email })
        if (isUser) {
            return res.status(400).json(
                {
                    success,
                    message: "This email is already registered"
                }
            )
        }

        if (!contactNo) {
            return res.status(400).json(
                {
                    success,
                    message: "Contact no is required"
                }
            )
        }

        if (!address) {
            return res.status(400).json(
                {
                    success,
                    message: "Address is required"
                }
            )
        }

        if (!city) {
            return res.status(400).json(
                {
                    success,
                    message: "City is required"
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

        if (!facilities) {
            return res.status(400).json(
                {
                    success,
                    message: "Facilities are required"
                }
            )
        }

        if (!files) {
            return res.status(400).json(
                {
                    success,
                    message: "Images are required"
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

        const hotel = await HotelSchema.create(
            {
                name,
                email,
                contactNo,
                address,
                city,
                description,
                facilities,
                image: imageUrls
            }
        )

        return res.status(200).json(
            {
                success: true,
                message: "Successfully created",
                hotel
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success,
                message: err?.message
            }
        )
    }
}

export default CreateHotel;