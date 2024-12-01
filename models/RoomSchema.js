import mongoose, { Schema } from 'mongoose';

const RoomSchema = new Schema(
    {
        status: {
            type: String,
            default: "saved"
        },

        hotelId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Hotels'
        },

        roomtype: {
            type: String,
            required: true,
            enum: ["Deluxe", "Family"]
        },

        description: {
            type: String,
            required: true
        },

        image: {
            type: [],
            required: true
        },

        price: {
            type: Number,
            required: true
        }

    }, { timestamps: true }
)

export default mongoose.model('Room', RoomSchema)