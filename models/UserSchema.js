import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        original_password: {
            type: String,
            required: true
        },

        phonenumber: {
            type: Number,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        role: {
            type: String,
            default: "user"
        }
    }
)

export default mongoose.model('User', UserSchema)