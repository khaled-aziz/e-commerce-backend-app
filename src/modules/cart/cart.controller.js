import slugify from "slugify";
import { catchError } from "../../middleware/catchAsyncError.js";
import { appError } from "../../utils/appError.js";
import { productModel } from "../../../database/model/product.model.js";
import { cartModel } from "../../../database/model/cart.model.js";
import { couponModel } from "../../../database/model/coupon.model.js";


function calcTotalPrice(cart) {
    let totalPrice = 0;
    cart.cartItems.forEach(elm => {
        totalPrice += elm.quantity * elm.price
    });
    cart.totalPrice = totalPrice;
}

export const addProductToCart = catchError(async (req, res, next) => {
    let product = await productModel.findById(req.body.product);
    if (!product) return next(new appError('product not found'), 401);
    req.body.price = product.price;
    let cart = await cartModel.findOne({ user: req.user.userId  });
    if (!cart) {
        let result = new cartModel({
            user: req.user.userId ,
            cartItems: [req.body]
        })
        calcTotalPrice(result);
        await result.save();
        return res.json({ messege: 'success', result })
    }
    let item = cart.cartItems.find(elm => elm.product == req.body.product);
    if (item) {
        item.quantity += req.body.quantity || 1
    } else {
        cart.cartItems.push(req.body);
    }
    calcTotalPrice(cart);
    if (cart.discount) cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount) / 100;
    await cart.save();
    res.json({ messege: 'success', cart })

})

export const removeProductFromCart = catchError(async (req, res, next) => {
    const { id } = req.params
    let cart = await cartModel.findOneAndUpdate({ user: req.user.userId  }, { $pull: { cartItems : {  product: id } } }, { new: true })
    !cart && next(new appError('item not found'), 404);
    calcTotalPrice(cart)
    if (cart.discount) cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount) / 100;
    await cart.save();
    cart && res.status(200).json({ message: 'success', cart });
})

export const updateQuantity = catchError(async (req, res, next) => {
    let product = await productModel.findById(req.params.id);
    if (!product) return next(new appError('product not found'), 401);
    let cart = await cartModel.findOne({ user: req.user.userId  });
    let item = cart.cartItems.find(elm => elm.product == req.params.id);
    if (item) {
        item.quantity = req.body.quantity
    }
    calcTotalPrice(cart);
    if (cart.discount) cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount) / 100;
    await cart.save();
    res.json({ messege: 'success', cart })

})
export const applyCoupon = catchError(async (req, res, next) => {
    let coupon = await couponModel.findOne({ code: req.body.code, expires: { $gt: Date.now() } });
    if (!coupon) return next(new appError('coupon not found', 401));
    let cart = await cartModel.findOne({ user: req.user.userId  });
    cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount) / 100;
    cart.discount = coupon.discount
    await cart.save();
    res.json({ messege: 'success', cart })

})
export const getLoggedUserCart = catchError(async (req, res, next) => {
    let cartItems = await cartModel.findOne({ user: req.user.userId  }).populate('cartItems.product');
    if (!cartItems) return next(new appError('not have product in your cart', 401));
    res.json({ messege: 'success', cartItems })

})