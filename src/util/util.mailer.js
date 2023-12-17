"use strict"
const NodeMailer = require('nodemailer');
const ModelOrder = require("../model/model.order");

class UtilMailer {

    constructor() { }

    transactionTemplate(orderInformation) {
        let template = ``;
        let templateTr = ``;

        for(let orderItem of orderInformation.order) {
            let tr = `
                <tr>
                    <td>${orderItem.product.name}</td>
                    <td>
                        <img style="width: 100px;" src="${orderItem.product.images[0]}" alt="Product image"/>
                    </td>
                    <td>${Number(orderItem.product.price).toFixed(6).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VND</td>
                    <td>${orderItem.quantity}</td>
                    <td>${Number(Number(orderItem.product.price) * orderItem.quantity).toFixed(6).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VND</td>
                </tr>
            `;

            templateTr += tr;
        }

        let total = orderInformation.order.reduce((acc, orderItem) => {
            acc += Number(orderItem.product.price) * orderItem.quantity;
            return acc;
        }, 0).toFixed(6).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

        return template = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>ECOMMER TRANSACTION</title>
                    <style>
                        .container {
                            background-color: #ffffff;
                            box-shadow: 0px 0px 2px 0px #000000;
                            margin: 0px auto;
                            padding: 15px;
                            overflow-x: auto;
                            width: 90%;
                        }

                        .table-information-order {
                            border: 1px solid #aaaaaa;
                            border-collapse: collapse;
                            font-size: 17px;
                            width: 100%;
                        }

                        .table-information-order thead th, .table-information-order tbody td {
                            border: 1px solid #aaaaaa;
                            padding: 5px;
                        }

                        .user_name {
                            font-size: 25px;
                            text-transform: capitalize;
                        }

                        .user_infor {
                            font-size: 18px;
                        }

                        .user-order-total {
                            display: flex;
                            align-items: center;
                            flex-direction: column;
                        }

                    </style>
                </head>

                <body>
                    <div class="container">
                        <h1 class="user_name"> Xin chào: ${orderInformation.email}</h1>
                        <h2 class="user_infor"> Số điện thoại: ${orderInformation.phone}</h2>
                        <h2 class="user_infor"> Địa chỉ: ${orderInformation.address}</h2>

                        <table class="table-information-order">
                            <thead>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Hình ảnh</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>

                            <tbody>
                                ${templateTr}
                            </tbody>
                        </table>

                        <h2 class="user-order-total">
                            <span>Tổng thanh toán: </span>
                            <span>${total} VND</span>
                        </h2>
                        <h2>Xin cảm ơn bạn!</h2>
                    </div>
                </body>
            </html>
        `;
    }

    async send(email, template, cb) {
        
        let transporter = NodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'phuongduynguyen75@gmail.com',
                pass: 'boqn xtvm ggvs ywgz'
            }
        })

        var mailOption = {
            from: 'phuongduynguyen75@gmail.com',
            to: email,
            subject: 'ECOMMER TRANSACTION',
            html: template
        }

        transporter.sendMail(mailOption, (error, info) => {
            if(error) cb({status: false, infor: error});
            cb({status: true, infor: info});
        })
    }
}

module.exports = new UtilMailer();