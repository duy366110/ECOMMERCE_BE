"use strict"
const app = require("./src/index");
const appSocket = require("./src/index.socket");
const Environment = require("./src/environment");

let server = app.listen(process.env.PORT || Environment.PORT, (error) => {
    if(error) console.log('Start server unsuccessfully');
    console.log("Start server successfully");
})

appSocket.on(server);