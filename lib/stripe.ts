import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_PRIVATE_API_KEY || '', {
    apiVersion: '2022-11-15',
    typescript: true,
    // stripeAccount: 
})

