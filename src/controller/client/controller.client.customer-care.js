"use strict"
const ModelCustomerCare = require("../../model/model.customer-care");
const ModelUser = require("../../model/model.user");
const UtilJWT = require("../../util/util.jwt");

class ControllerClientCustomerCare {

    constructor() { }

    // KHÁCH HÀNG THỰC HIỆN KẾT NỐI CHAT
    clientConnect = async function(io, socket) {
        socket.on('client-connect', (data) => {
            let { token } = data;

            UtilJWT.verify(token, async (information) => {
                let { status, message, infor } = information;

                if(status) {
                    let userInfor = await ModelUser.findOne({email: {$eq: infor.email}}).exec();
                    let userCare = await ModelCustomerCare.findOne({user: {$eq: userInfor._id}}).exec();

                    // THƯỜNG HỢP TÀI KHOẢN USER CHƯA CÓ THÔNG TIN CHAT TẠO MƠI
                    if(!userCare) {
                        userCare = await ModelCustomerCare.create({user: userInfor, email: userInfor.email, socket_id: socket.id, status: true});

                    } else {
                        // TRƯỜNG HỢP TÀI KHOẢN USER ĐÃ CÓ THÔNG TIN CHAT
                        userCare.socket_id = socket.id;
                        userCare.status = true;
                        await userCare.save();
                    }

                    // LẤY THÔNG TIN CHAT TRƯỚC ĐÓ TRẢ VỀ CLIENT VỪA JOIN CHAT
                    socket.emit('client-join-chat', {userCare});

                    // CẬP NHẬT DANH SÁCH CLIENT ĐANG HOẠT ĐỘNG
                    let usersOnline = await ModelCustomerCare.find({status: {$eq: true}}).populate({path: 'user', populate: {path: 'role'}}).lean();
                    socket.broadcast.emit('client-join-connect', {usersOnline});
                }
            })
        })
    }

    // KHÁCH HÀNG NGẮT KẾT NỐI
    clientDisconnect = async function(io, socket) {
        socket.on('client-disconnect', (data) => {
            let { token } = data;

            UtilJWT.verify(token, async (information) => {
                let { status, message, infor } = information;

                if(status) {
                    let userCare = await ModelCustomerCare.findOne({email: {$eq: infor.email}}).exec();

                    // CẬP NHẬT THÔNG TIN NGƯỜI DÙNG HUỶ KẾT NỐI CHAT
                    if(userCare) {
                        userCare.socket_id = '';
                        userCare.current_care = '';
                        userCare.status = false;
                        await userCare.save();
                    }

                    // CẬP NHẬT DANH SÁCH CLIENT HIỆN ĐANG HOẠT ĐỘNG
                    let usersOnline = await ModelCustomerCare.find({status: {$eq: true}}).populate({path: 'user', populate: {path: 'role'}}).lean();
                    socket.broadcast.emit('client-leave-chat', {usersOnline});
                }
            })
        })
    }

    // KHÁCH HÀNG THỰC HIỆN SEND MESSAGE TO SERVER
    clientSendMessage = async function(io, socket) {
        socket.on('client-send-message', (data) => {
            let { token, message: messageFormClient } = data;

            UtilJWT.verify(token, async (information) => {
                let { status, message, infor } = information;

                if(status) {
                    let userCare = await ModelCustomerCare.findOne({email: {$eq: infor.email}}).populate({path: 'user', populate: {path: 'role'}}).exec();
                    
                    // THÊM MESSAGE MỚI VÀO DANH MỤC TIN NHẮN CHĂM SÓC KHÁCH HÀNG TỪ USER.
                    userCare.message.push({content: messageFormClient});

                    // KIỂM TRA USER ĐÃ ĐƯỢC HỖ TRỢ ĐỂ THÔNG BÁO CLIENT VỪA GỬI THÔNG BÁO MỚI
                    if(!userCare.current_care) {
                        userCare.status_new_message = true;
                    }

                    await userCare.save();

                    // CẬP NHẬT HOẠT ĐỘNG CỦA SINGLE CLIENT - ĐẾN CÁC ADMIN
                    socket.broadcast.emit('client-send-message-admin', {userCare});

                    // THỰC HIỆN CẬP NHẬT LẠI MESSAGE VỪA GỬI
                    socket.emit('update-message-client-just-send', {userCare});
                }
            })
        })
    }

}

module.exports = new ControllerClientCustomerCare();