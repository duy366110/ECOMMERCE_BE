const router = require("express").Router();
const { body, check } = require("express-validator");
const ModelUser = require("../../model/model.user");
const ControllerUser = require("../../controller/client/controller-user");


// ROUTER KHÁCH HÀNG THỰC HIỆN ĐĂNG KÝ TÀI KHOẢN MỚI
router.post("/account", [
    body('fullName').notEmpty().withMessage('User name not empty'),
    body('email').custom( async (val, { req}) => {
        if(!val.trim()) throw Error('E-mail not empty');

        let userInfor = await ModelUser.findOne({email: {$eq: val}}).lean();
        if(userInfor) {
            throw Error('E-mail exists already');
        }
        return true;
    }),
    check('password', 'Password has to be invalid')
    .isLength({ min: 6, max: 20 })
    .notEmpty().withMessage('Password not empty'),
    body('phone').notEmpty().withMessage('Phone not empty'),
    body('address').notEmpty().withMessage('Address not empty')

], ControllerUser.registerAccount);

module.exports = router;