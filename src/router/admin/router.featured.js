"use strict"
const router = require("express").Router();
const { body } = require("express-validator");
const ControllerFeatured = require("../../controller/admin/controller.featured");

router.get("/:limit/:start", ControllerFeatured.getFeatureds);
router.get("/amount", ControllerFeatured.getAmount);
router.get("/:feature", ControllerFeatured.getFeatureById);

// CREATE FEATURED
router.post("/",[
    body('title').custom( async(val, {req}) => {

        // KIỂM TRA TITLE KHÔNG ĐƯỢC TRỐNG
        if(!val.trim()) throw Error("Title not empty");

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

// DELETE FEATURE IMAGE
router.delete('/photo', [
    body("id").notEmpty().withMessage("ID featured not empty"),
    body("photo").notEmpty().withMessage("ID featured not empty")
], ControllerFeatured.deleteFeaturedPhoto);

module.exports = router;