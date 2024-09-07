import userModel from '../models/userModel.js'
const addToCart = async (request, response) => {
  try {
    let userData = await userModel.findById(request.body.userId);
    let cartData = userData.cart || {};

    if (!cartData[request.body.itemId]) {
      cartData[request.body.itemId] = 1;
    } else {
      cartData[request.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(
      request.body.userId,
      { cart: cartData },
      { new: true }
    );

    response.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error" });
  }
}

const removeFromCart = async (request, response) => {
  try {
    let userData = await userModel.findById(request.body.userId);
    let cartData = userData.cart;
    if (cartData[request.body.itemId] > 0) {
      cartData[request.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(request.body.userId, { cart: cartData },
      { new: true });
    response.json({ success: true, message: "Removed From Cart" })
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error" })
  }
}

const getCart = async (request, response) => {
  try {
    let userData = await userModel.findById(request.body.userId);
    let cartData = await userData.cart;
    response.json({ success: true, cartData })
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error" })
  }
}

export { addToCart, removeFromCart, getCart }