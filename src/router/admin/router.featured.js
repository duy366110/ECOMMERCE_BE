const router = require("express").Router();
const { body } = require("express-validator");
const ControllerFeatured = require("../../controller/admin/controller.featured");

router.get("/:limit/:start", ControllerFeatured.getFeatureds);
router.get("/amount", ControllerFeatured.getAmount);
router.get("/:feature", ControllerFeatured.getFeatureById);

// TRUY XUẤT DANH MỤC CATEGORY
// router.get("/", ControllerCategory.getCategoriesAll);

// CREATE FEATURED
router.post("/",[
    body('title').custom( async(val, {req}) => {

        // KIỂM TRA TITLE KHÔNG ĐƯỢC TRỐNG
        if(!val.trim()) throw Error("Title not empty");

        // KIỂM TRA TITLE CÓ  ĐÃ ĐƯỢC SỬ DỤNG HAY CHƯA
        // let categoryInfor = await ModelCategory.find({title: {$eq: val}});
        // if(categoryInfor.length) {
        //     throw Error("category exists already");
        // }

        return true;
    }),
], ControllerFeatured.createFeatured);

// UPDATE FEATURE
router.patch("/", [
    body('feature').notEmpty().withMessage('ID category not empty'),
    body('title').custom( async(val, {req}) => {

        // KIỂM TRA TITLE KHÔNG ĐƯỢC TRỐNG
        if(!val.trim()) {
            throw Error("Title not empty");
        }

        return true;
    }),

], ControllerFeatured.modifiFeature);

// DELETE FEATURE
router.delete("/", [
    body("feature").custom( async(val, { req }) => {
        if(!val.trim()) throw Error('Feature ID not empty');
        
        return true;
    })
], ControllerFeatured.deleteFeature);

// DELETE CATEGORY IMAGE
// router.delete('/photo', [
//     body("id").notEmpty().withMessage("ID category not empty"),
//     body("photo").notEmpty().withMessage("ID category not empty")
// ], ControllerCategory.deletePhoto);

module.exports = router;