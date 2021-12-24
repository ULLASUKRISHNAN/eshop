// domain/.netlify/functions/create-payment-intent
require('dotenv').config()

const stripe = require('stripe')('sk_test_51K9s1DSECFcxWpo45Us6qSnorCH0ZCSOaYpw8AiTlgz8dMfoNkiQBBfVRdeSyNoIdqiizxY3f2JrsLTdY2diGGwJ00nvQcrYbG')

exports.handler = async function (event, context) {
 if (event.body) {
  const { cart, shipping_fee, total_amount } = JSON.parse(event.body)

  const calculateOrderAmount = () => {
   return shipping_fee + total_amount
  }
  try {
   const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: 'usd',
    description: 'Software development services',
    shipping: {
     name: 'Jenny Rosen',
     address: {
      line1: '510 Townsend St',
      postal_code: '98140',
      city: 'San Francisco',
      state: 'CA',
      country: 'US',
     },
    },
   })
   return {
    statusCode: 200,
    body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
   }
  } catch (error) {
   return {
    statusCode: 500,
    body: JSON.stringify({ msg: error.message }),
   }
  }
 }
 return {
  statusCode: 200,
  body: 'Create Payment Intent',
 }
}
