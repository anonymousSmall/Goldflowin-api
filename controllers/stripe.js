const prisma = require('../config/prisma')
const stripe = require('stripe')('sk_test_51Qqy6WBFbJg92Yu9GkwKELbt20BLVXQPLf6SuWOoLitfRBs5icpjVk6C4P9znOTX4U21C2895HR8gKIXX3GjT5je004E5mbTWn');


exports.payment = async (req, res) => {
  try {
    // Code
    const paymentIntent = await stripe.paymentIntent.create({
      amount: 5000,
      currency: "thb",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server Error' })
  }
}