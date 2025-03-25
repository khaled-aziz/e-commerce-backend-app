
import { categoryRouter } from './modules/category/category.router.js';
import { subCategoryRouter } from './modules/subCategory/subCategory.router.js';
import { brandRouter } from './modules/brand/brand.router.js';
import { productRouter } from './modules/product/product.router.js';
import { userRouter } from './modules/user/user.router.js';
import { authRouter } from './modules/auth/auth.router.js';
import { reviewRouter } from './modules/review/review.router.js';
import { appError } from './utils/appError.js';
import { addressRouter } from './modules/address/address.router.js';
import { couponRouter } from './modules/coupon/coupon.router.js';
import { cartRouter } from './modules/cart/cart.router.js';
import { wishListRouter } from './modules/wishList/wishList.router.js';
import { orderRouter } from './modules/order/order.router.js';
import { tokenRouter } from './middleware/verify.js';



export function appRouts (app){
    app.use('/app/v1/category', categoryRouter)
    app.use('/app/v1/subCategory', subCategoryRouter)
    app.use('/app/v1/brand', brandRouter)
    app.use('/app/v1/product', productRouter)
    app.use('/app/v1/user', userRouter)
    app.use('/app/v1/auth', authRouter)
    app.use('/app/v1/review', reviewRouter)
    app.use('/app/v1/address', addressRouter)
    app.use('/app/v1/coupon', couponRouter)
    app.use('/app/v1/wishList', wishListRouter)
    app.use('/app/v1/cart', cartRouter)
    app.use('/app/v1/order', orderRouter)
    app.use('/app/v1/', tokenRouter)
    
    
    app.use('*', (req, res, next) => {
        next(new appError(`can't find this route: ${req.originalUrl}`), 404);
    })
    
    app.use((err, req, res, next) => {
        const statusCode = err.statusCode || 500
        res.status(statusCode).json({ error: err.message })
    })
}