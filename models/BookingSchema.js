import mongoose, { Schema } from 'mongoose';

const BookingSchema = new Schema(
    {
        status: {
            type: String,
            default: 'saved'
        },

        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'users'
        },

        roomId: {
            type: mongoose.Types.ObjectId,
            ref: 'rooms'
        },

        fullname: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        phone_number: {
            type: Number,
            required: true
        },

        check_in_date: {
            type: String,
            required: true
        },

        check_out_date: {
            type: String,
            required: true
        },

        guests: {
            type: Number,
            required: true
        },

        payment_details: {
            type: {},
            required: true
        },

    }, { timeStamps: true }
)

export default mongoose.model('booking', BookingSchema)