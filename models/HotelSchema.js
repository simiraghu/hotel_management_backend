import mongoose, { Schema } from 'mongoose';

const HotelSchema = new Schema(
    {
        status: {
            type: String,
            default: "saved"
        },

        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        contactNo: {
            type: Number,
            required: true
        },

        address: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        facilities: {
            type: Array,
            required: true
        },

        image: {
            type: [],
            required: true
        }

    }, { timestamps: true }
)

export default mongoose.model('Hotel', HotelSchema)