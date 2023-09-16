"use strict";
const MiddlewareCors = require("./middleware/middleware-cors");
const ControllerClientCustomerCare = require("./controller/client/controller.client.customer-care");
const ControllerAdminCustomerCare = require("./controller/admin/controller.admin.customer-care");

class ReadtimeServer {

    constructor() { }

    on(server) {
        const io = require('socket.io')(server, {
            cors: MiddlewareCors.corsSocket().cors,
        });

        io.on('connection', (socket) => {

            // KHÁCH HÀNG KẾT NỐI CHAT
            ControllerClientCustomerCare.clientConnect(io, socket);

            // KHÁCH HÀNG NGẮT KẾT NỐI
            ControllerClientCustomerCare.clientDisconnect(io, socket);

            // KHÁCH HÀNG THỰC HIỆN SEND MESAGE TO SERVER
            ControllerClientCustomerCare.clientSendMessage(io, socket);

            // QUẢN TRỊ VIÊN KẾT NỐI CHAT
            ControllerAdminCustomerCare.adminConnect(io, socket);

            // QUẢN TRỊ VIÊN CHỌN KHÁCH HÀNG HỖ TRỢ
            ControllerAdminCustomerCare.adminChooseUserSupport(io, socket);

            // QUẢN TRỊ VIÊN THỰC HIỆN GỬI MESSAGE VỀ CLIENT
            ControllerAdminCustomerCare.adminSendMessageToClient(io, socket);

            // QUẢN TRỊ VIÊN NGẮT KẾT NỐI
            ControllerAdminCustomerCare.adminDisconnect(io, socket);

            socket.on('disconnect', () => {
                console.log(`${socket.id} disconnect`);
            })
        })

    }
}

module.exports = new ReadtimeServer();