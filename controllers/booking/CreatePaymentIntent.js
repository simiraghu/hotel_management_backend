import Stripe from 'stripe';

const CreatPaymentIntent = async (req, res) => {

    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    const { amount, currency, paymentMethodId } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create(
            {
                amount,
                currency,
                payment_method: paymentMethodId,
                confirm: true,
                payment_method_types: ['card'],
            }
        );


        res.status(200).json(
            {
                success: true,
                paymentIntent
            }
        );

    } catch (error) {
        res.status(400).json(
            {
                success: false,
                error: error.message
            }
        );
    }

}

export default CreatPaymentIntent;