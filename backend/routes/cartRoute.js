import express from 'express'
import { addToCart, removeFromCart, getCart } from '../controllers/cartController.js'
import authorization from '../middleware/authorization.js';

const cartRouter = express.Router();

cartRouter.post('/add', authorization, addToCart)
cartRouter.post('/remove', authorization, removeFromCart)
cartRouter.post('/get', authorization, getCart)

export default cartRouter;