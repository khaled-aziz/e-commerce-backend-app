import { cartModel } from "../../../database/model/cart.model.js";
import { orderModel } from "../../../database/model/order.model.js";
import { productModel } from "../../../database/model/product.model.js";
import { catchError } from "../../middleware/catchAsyncError.js";
import { appError } from "../../utils/appError.js";

export const creatCashOrder = catchError(async (req, res, next) => {
    const cart = await cartModel.findById(req.params.id);
    if (!cart) return next(new appError('cart not found ', 401));
    const totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;
    const order = new orderModel({
        user: req.user.userId,
        orderItems: cart.cartItems,
        totalOrderPrice,
        shippingAddress: req.body.shippingAddress,
    })
    await order.save();
    if (order) {
        let option = cart.cartItems.map(item => ({
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { quantity: -item.quantity, sold: item.quantity } }
            }
        }))
        await productModel.bulkWrite(option);
        await cartModel.findByIdAndDelete(req.params.id);
        return res.status(201).json({ message: 'succes', order })
    }

    return next(new appError('error, please try again', 404))
})

export const getSpecificOrder = catchError(async (req, res, next) => {
    let order = await orderModel.findOne({ user: req.user.userId }).populate('orderItems.product');
    res.status(200).json({ message: 'succes', order })
})

export const getAllOrder = catchError(async (req, res, next) => {
    let orders = await orderModel.find({}).populate('orderItems.product', 'user');
    res.status(200).json({ message: 'succes', orders })
})