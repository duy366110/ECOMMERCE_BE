const router = require("express").Router();
const { body } = require("express-validator");
const ModelCategory = require("../../model/model.category");
const ControllerCategory = require("../../controller/admin/controller.category");

// TRUY XUẤT CATEGORY
router.get("/:limit/:start", ControllerCategory.getCategories);

// TRUY XUẤT SỐ LƯỢNG CATEGORY
router.get("/amount", ControllerCategory.getAmount);

// TRUY XUẤT CATEGORY THEO ID
router.get("/:category", ControllerCategory.getCategoryById);

// TRUY XUẤT DANH MỤC CATEGORY
router.get("/", ControllerCategory.getCategoriesAll);

// CREATE CATEGORY
router.post("/",[
    body('title').custom( async(val, {req}) => {

        // KIỂM TRA TITLE KHÔNG ĐƯỢC TRỐNG
        if(!val.trim()) throw Error("Title not empty");

        // KIỂM TRA TITLE CÓ  ĐÃ ĐƯỢC SỬ DỤNG HAY CHƯA
        let categoryInfor = await ModelCategory.find({title: {$eq: val}});
        if(categoryInfor.length) {
            throw Error("category exists already");
        }

        return true;
    }),
], ControllerCategory.createCategory);

// UPDATE CATEGORY
router.patch("/", [
    body('category').notEmpty().withMessage('ID category not empty'),
    body('title').custom( async(val, {req}) => {

        // KIỂM TRA TITLE KHÔNG ĐƯỢC TRỐNG
        if(!val.trim()) {
            throw Error("Title not empty");
        }

        // KIỂM TRA TITLE CÓ  ĐÃ ĐƯỢC SỬ DỤNG HAY CHƯA
        let categoryInfor = await ModelCategory.find({title: {$eq: val}});
        if(categoryInfor.length) {
            throw Error("category exists already");
        }

        return true;
    }),

], ControllerCategory.modifiCategory);

// DELETE CATEGORY
router.delete("/", [
    body("category").custom( async(val, { req }) => {
        if(!val.trim()) throw Error('Category ID not empty');

        // KIỂM TRA CATEGORY CÓ LIÊN ĐẾN HOTEL -  KHÔNG THỰC HIỆN CHỨC NĂNG
        let categoryInfor = await ModelCategory.findById(val);
        if(categoryInfor.collections.length) {
            throw Error('Category reference hotel not delete');
        }

        return true;
    })
], ControllerCategory.deleteCategory);

// DELETE CATEGORY IMAGE
router.delete('/photo', [
    body("id").notEmpty().withMessage("ID category not empty"),
    body("photo").notEmpty().withMessage("ID category not empty")
], ControllerCategory.deletePhoto);

module.exports = router;