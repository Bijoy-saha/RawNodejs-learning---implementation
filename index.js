//title:Uptime monitoring Applications

//dependencies:
const http = require("http");
const url = require("url");
const { StringDecoder } = require("string_decoder");
const { handRequest } = require("./handl/reqResHandler");
const { clear } = require("console");
const environment = require("./handl/env");
const data = require("./lib/data");
//module Scaffoldings
const app = {};
// data.create('test','newfileeee',{name:"bijoy",age:23,},(err)=>{
//   console.log(err);
// });
// data.read('test','newfileeee',(err,data)=>{
//   console.log(err,data);
// });
// data.update("test", "newfileeee", { name: "dipti", age: 22 },(err)=>{
//   console.log(err);
// });
// delete
// data.delete("test", "newfileeee",(err)=>{
// console.log(err);
// });
//configuration
app.config = {
  port: 3001,
};

//creating Server
app.createServer = () => {
  const server = http.createServer(app.handleRequest);
  server.listen(app.config.port);
  console.log(`environment variable is ${process.env.NODE_ENV}`);
  console.log(`listening to ${environment.port}`);
};
//handle request and response
app.handleRequest = handRequest;
app.createServer();
