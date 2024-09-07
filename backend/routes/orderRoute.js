import express from 'express'
import authorization from '../middleware/authorization.js'
import { placeOrder } from '../controllers/orderController.js'

const orderRouter = express.Router();

orderRouter.post("/place", authorization, placeOrder);

export default orderRouter;