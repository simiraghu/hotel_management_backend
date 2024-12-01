import BookingSchema from '../../models/BookingSchema.js';
import mongoose from 'mongoose';
import Stripe from 'stripe';


const createBookingWithPayment = async (req, res) => {

    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    try {

        const userId = req?.userId

        const {
            fullname,
            email,
            address,
            phone_number,
            check_in_date,
            check_out_date,
            guests,
            payment_details,
            roomId,
            amount,
            currency,
            paymentMethodId
        } = req?.body;

        let success = false;

        if (!userId) {
            return res.status(400).json(
                {
                    success,
                    message: "Please login first"
                }
            )
        }

        if (
            !fullname
            ||
            !address
            ||
            !email
            ||
            !phone_number
            ||
            !check_in_date
            ||
            !check_out_date
            ||
            !guests
            ||
            !roomId
            ||
            !amount
        ) {
            return res.status(400).json(
                {
                    success,
                    message: "All Fields are required"
                }
            )
        }

        const overlappingRooms = await BookingSchema.aggregate(
            [
                {
                    $match: {
                        roomId: new mongoose.Types.ObjectId(roomId),
                        $or: [
                            {
                                check_in_date: {
                                    $lte: check_out_date,
                                    $gte: check_in_date
                                }
                            },
                            {
                                check_out_date: {
                                    $gte: check_in_date,
                                    $lte: check_out_date
                                }
                            },
                            {
                                $and: [
                                    {
                                        check_in_date: {
                                            $lte: check_in_date
                                        }
                                    },
                                    {
                                        check_out_date: {
                                            $gte: check_out_date
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        )

        if (overlappingRooms.length > 0) {
            return res.status(400).json(
                {
                    success,
                    message: "On this date room is booked try another room or date"
                }
            )
        }



        const bookingRoom = await BookingSchema.create(
            {
                fullname,
                userId,
                email,
                address,
                phone_number,
                check_in_date,
                check_out_date,
                guests,
                roomId,
                payment_details: {}
            }
        )

        const paymentIntent = await stripe.paymentIntents.create(
            {
                amount,
                currency,
                payment_method: paymentMethodId,
                confirm: true,
                payment_method_types: ['card'],
            }
        );

        const OrderDetails = await BookingSchema.findByIdAndUpdate(
            {
                _id: new mongoose.Types.ObjectId(bookingRoom?._id)
            },
            {
                payment_details: paymentIntent
            },
            { new: true }
        )

        return res.status(200).json(
            {
                success: true,
                message: "Successfully booked",
                OrderDetails
            }
        )


    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                messgae: error?.message
            }
        )
    }
}

export default createBookingWithPayment;