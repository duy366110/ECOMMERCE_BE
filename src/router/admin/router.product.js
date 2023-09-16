"use strict"
const router = require("express").Router();
const { body } = require("express-validator");
const ModelProduct = require("../../model/model.product");
const MiddlewareCategory = require("../../middleware/admin/middleware.category");
const ControllerProduct = require("../../controller/admin/controller.product");

// ROUTER LẤY VỀ SỐ LƯỢNG PRODUCT.
router.get("/amount", ControllerProduct.getAmoutnProduct);

// ROUTER TRẢ VỀ PRODUCT VỚI SỐ LƯỢNG ĐƯỢC CHỈ ĐỊNH
router.get("/:limit/:start", ControllerProduct.getLimitProducts);

// ROUTER TÌM PRODUCT THEO ID   
router.get("/:product", ControllerProduct.getProductById);

// ROUTER ADMIN TẠO MỚI PRODUCT.
router.post('/', [
    body('name').notEmpty().withMessage('Product name not empty'),
    body('price').notEmpty().withMessage('Product price not empty'),
    body('quantity').notEmpty().withMessage('Product quantity not empty'),
    body('category').notEmpty().withMessage('Category product not empty'),
],
MiddlewareCategory.findCategoryById,
ControllerProduct.createProduct);

// ROUTER ADMIN SỬA THÔNG TIN TÀI KHOẢN
router.patch('/', [
    body('name').custom( async(val, {req}) => {
        if(!val.trim()) throw Error('Product name not empty');

        let productsInfor = await ModelProduct.find({name: {$eq: val}}).exec();
        if(productsInfor && productsInfor.length) {
            throw Error('Name product exists already');
        }
        
        return true;
    }),
    body('price').notEmpty().withMessage('Product price not empty'),
    body('quantity').notEmpty().withMessage('Product quantity not empty'),
    body('category').notEmpty().withMessage('Category product not empty'),
],
MiddlewareCategory.findCategoryById,
ControllerProduct.modifiProduct);

// ROUTER ADMIN XOÁ ACCOUNT
router.delete('/', [
    body("product").notEmpty().withMessage('Product ID not empty'),
], ControllerProduct.deleteProduct);

// ROUTER XOÁ ẢNH CATEGORY
router.delete('/photo', [
    body("id").notEmpty().withMessage("ID category not empty"),
    body("photo").notEmpty().withMessage("ID category not empty")
], ControllerProduct.deletePhoto);

module.exports = router;