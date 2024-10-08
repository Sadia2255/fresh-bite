import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// Place order 
const placeOrder = async (request, response) => {
  const frontend_url = 'http://localhost:5173';
  try {
    const order = new orderModel({
      userId: request.body.userId,
      items: request.body.items,
      amount: request.body.amount,
      address: request.body.address
    })
    await order.save();
    await userModel.findByIdAndUpdate(request.body.userId, { cart: {} });

    const line_items = request.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name
        },
        unit_amount: item.price
      },
      quantity: item.quantity
    }))
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: 2
      },
      quantity: 1
    })
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    })
    response.json({ success: true, session_url: session.url })
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error" })
  }
}

export { placeOrder }