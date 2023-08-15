import { auth, currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'
import { stripe } from '@/lib/stripe'
import { absoluteUrl } from '@/lib/utils'

const settingsUrl = absoluteUrl("settings")

export async function GET() {
    try {
        const { userId } = auth();
        const user = await currentUser();


        const userSubscription = await prismadb.userSubscription.findUnique({
            where: { userId: userId! }
        })

        console.log(userSubscription?.stripeCustomerId)


        if (!userId || !user) return new NextResponse("Unautorized", { status: 401 })

        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl
            })

            console.log(stripeSession)

            return new NextResponse(JSON.stringify({ url: stripeSession.url }))
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ['card'],
            mode: 'subscription',
            billing_address_collection: 'auto',
            customer_email: user?.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: 'USD',
                        product_data: {
                            name: "Smater Pro",
                            description: "Unlimited AI Generations"
                        },
                        unit_amount: 2000,
                        recurring: {
                            interval: 'month',
                        }
                    },
                    quantity: 1,

                },
            ],
            metadata: {
                userId: userId
            }
        })


        return new NextResponse(JSON.stringify({ url: stripeSession.url }))

    } catch (error) {
        console.log("[STRIPE ERROR]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
