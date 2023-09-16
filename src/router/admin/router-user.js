const router = require('express').Router();
const ModelUser = require("../../model/model.user");
const { body } = require('express-validator');
const ControllerUser = require('../../controller/admin/controller-user');

// ROUTER LẤY VỀ SỐ LƯỢNG USER.
router.get("/amount", ControllerUser.getAmoutnUser);

// ROUTER TRẢ VỀ USER VỚI SỐ LƯỢNG ĐƯỢC CHỈ ĐỊNH
router.get("/:limit/:start", ControllerUser.getLimitUser);

// ROUTER TÌM USẺ THEO ID   
router.get("/:user", ControllerUser.findUserById);

// ROUTER ADMIN TÌM TẤT CẢ ACCOUNT HIỆN CÓ
router.get("/", ControllerUser.findUsers);

// ROUTER ADMIN TẠO MỚI ACCOUNT USER.
router.post('/', [
    body('email').custom( async (val, {req}) => {
        if(!val.trim()) throw Error('Email can\'t empty');

        // KIỂM TRA E-MAIL ĐÃ ĐƯỢC SỬ DỤNG CHƯA
        let userInfor = await ModelUser.findOne({email: {$eq: val}});
        if(userInfor) throw Error('E-mail exists already');
        
        return true;
    })
], ControllerUser.createUser);

// ROUTER ADMIN SỬA THÔNG TIN TÀI KHOẢN
router.patch('/', [
    body('email').custom( async (val, { req }) => {
        if(!val.trim()) throw Error('Email can\'t empty');
        
        // KIỂM TRA E-MAIL ĐÃ ĐƯỢC SỬ DỤNG CHƯA
        let userInfor = await ModelUser.findOne({email: {$eq: val}});
        if(userInfor) throw Error('E-mail exists already');

        return true;
        
    })
], ControllerUser.modifiUser);

// ROUTER ADMIN XOÁ ACCOUNT
router.delete('/', [
    body("user").custom( async(val, {req}) => {
        if(!val.trim()) {
            throw Error('User ID can\'t empty');
        }

        // KIỂM TRA USER ACCOUNT CÓ ĐƠN HÀNG HAY KHÔNG
        let userInfor = await ModelUser.findById(val).lean();
        if(userInfor.cart.length || userInfor.order.length) {
            throw Error('User account has transaction not delete');
        }
        
        return true;
    })
], ControllerUser.deleteUser);


module.exports = router;