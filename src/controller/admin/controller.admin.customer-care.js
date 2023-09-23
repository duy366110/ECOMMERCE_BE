"use strict"
const ModelCustomerCare = require("../../model/model.customer-care");
const ModelUser = require("../../model/model.user");
const UtilJWT = require("../../util/util.jwt");

class ControllerAdminCustomerCare {

    constructor() { }

    // QUẢN TRỊ VIÊN KẾT NỐI TRANG QUẢN TRỊ CHAT
    async adminConnect(io, socket) {
        socket.on('admin-connect', (data) => {
            let { token } = data;

            UtilJWT.verify(token, async (information) => {
                let { status, message, infor } = information;

                if(status) {
                    let userInfor = await ModelUser.findOne({email: {$eq: infor.email}}).exec();
                    let userCare = await ModelCustomerCare.findOne({user: {$eq: userInfor._id}}).exec();

                    // THƯỜNG HỢP TÀI KHOẢN USER CHƯA CÓ THÔNG TIN CHAT TẠO MƠI
                    if(!userCare) {
                        await ModelCustomerCare.create({user: userInfor, email: userInfor.email, socket_id: socket.id, status: true});

                    } else {
                        // TRƯỜNG HỢP TÀI KHOẢN USER ĐÃ CÓ THÔNG TIN CHAT
                        userCare.socket_id = socket.id;
                        userCare.status = true;
                        await userCare.save();
                    }

                    // CẬP NHẬT DANH SÁCH CLIENT ĐANG HOẠT ĐỘNG
                    let usersOnline = await ModelCustomerCare.find({status: {$eq: true}}).populate({path: 'user', populate: {path: 'role'}}).lean();
                    io.emit('admin-join-connect', {usersOnline});
                }
            })
        })
    }

    // QUẢN TRỊ VIÊN CHỌN USER HỖ TRỢ
    async adminChooseUserSupport(io, socket) {
        socket.on('admin-choose-user-support', (data) => {
            let { customer_care, token } = data;

            if(customer_care && token) {
                UtilJWT.verify(token, async (information) => {
                    let { status, message, infor } = information;
    
                    if(status) {
                        let adminInfor = await ModelUser.findOne({email: {$eq: infor.email}}).exec();
                        let userCare = await ModelCustomerCare.findById(customer_care).populate({path: 'user', populate: {path: 'role'}}).exec();
    
                        // CẬP NHẬT ADMIN HỖ TRỢ KHÁCH HÀNG
                        userCare.current_care = adminInfor._id.toString();
                        userCare.status_new_message = false;
                        await userCare.save();
    
                        // CẬP NHẬT DANH SÁCH CLIENT ĐANG HOẠT ĐỘNG VÀ ĐƯỢC HỖ TRỢ
                        io.emit('update-client-have-been-supported', {userCare});
                    }
                })
            }
            
        })
    }

    // QUẢN TRỊ VIÊN THỰC HIÊN GỬI MESSAGE VỀ CLIENT
    async adminSendMessageToClient(io, socket) {
        socket.on('admin-send-message-to-client', async (data) => {
            let {user, customer, message } = data;

            let  userInfor = await ModelUser.findById(user).exec();
            let customerCareInfor = await ModelCustomerCare.findById(customer).populate({path: 'user', populate: {path: 'role'}}).exec();

            customerCareInfor.message.push({
                content: message,
                care: userInfor,
                type: 'Counselors'
            });

            await customerCareInfor.save();

            // GỬI ĐẾN CÁC ADMIN KHÁC NỘI DUNG VỪA SUPPORT KHÁCH HÀNG
            io.emit('admin-send-message-to-client', {customerCare: customerCareInfor});

            // ADMIN GỬI MESSAGE ĐẾN CLIENT CHỈ ĐỊNH
            io.to(customerCareInfor.socket_id).emit('emit-message-form-admin', {customerCare: customerCareInfor})
        })
    }

    //  QUẢN TRỊ VIÊN NGẮT KẾT NỐI
    async adminDisconnect(io, socket) {
        socket.on('admin-disconnect', (data) => {
            let { token } = data;

            UtilJWT.verify(token, async (information) => {
                let { status, message, infor } = information;

                if(status) {
                    let userCare = await ModelCustomerCare.findOne({email: {$eq: infor.email}}).populate(['user']).exec();

                    await ModelCustomerCare.updateMany({current_care: {$eq: userCare.user._id.toString()}}, {$set: {current_care: ''}});
                    // CẬP NHẬT THÔNG TIN NGƯỜI DÙNG HUỶ KẾT NỐI CHAT
                    if(userCare) {
                        userCare.socket_id = '';
                        userCare.status = false;
                        await userCare.save();
                    }

                    // CẬP NHẬT DANH SÁCH CLIENT HIỆN ĐANG HOẠT ĐỘNG
                    let usersOnline = await ModelCustomerCare.find({status: {$eq: true}}).populate({path: 'user', populate: {path: 'role'}}).lean();
                    socket.broadcast.emit('admin-leave-chat', {usersOnline});
                }
            })
        })
    }


}

module.exports = new ControllerAdminCustomerCare();