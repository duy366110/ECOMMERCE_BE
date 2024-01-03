"use strict"
const router = require("express").Router();
const { body } = require("express-validator");
const ModelProduct = require("../../model/model.product");
const MiddlewareCategory = require("../../middleware/admin/middleware.category");
const ControllerProduct = require("../../controller/admin/controller.product");

// TRUY XUẤT SỐ LƯỢNG PRODUCT
router.get("/amount", ControllerProduct.getAmount);

// TRUY XUẤT DANH MỤC PRODUCT
router.get("/:limit/:start", ControllerProduct.getProducts);

// TRUY XUẤT PRODUCT THEO ID 
router.get("/:product", ControllerProduct.getProductById);

// CREATE PRODUCT
router.post('/', [
    body('name').notEmpty().withMessage('Product name not empty'),
    body('price').notEmpty().withMessage('Product price not empty'),
    body('quantity').notEmpty().withMessage('Product quantity not empty'),
    body('category').notEmpty().withMessage('Category product not empty'),
],
MiddlewareCategory.findCategoryById,
ControllerProduct.createProduct);

// UPDATE PRODUCT
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

// DELETE PRODUCT
router.delete('/', [
    body("product").notEmpty().withMessage('Product ID not empty'),
], ControllerProduct.deleteProduct);

// DELETE IMAGE PRODUCT
router.delete('/photo', [
    body("id").notEmpty().withMessage("ID product not empty"),
    body("photo").notEmpty().withMessage("ID product not empty")
], ControllerProduct.deleteProductPhoto);

module.exports = router;