// const handler = {};
// const { hash } = require("./utilities");
// const { parseJson } = require("./utilities");
// const data = require("../../lib/data");
// const tokenhandler = require("./tokenhandler");
// handler.checkHandler = (reqProperties, callback) => {
//   const acceptedMethod = ["get", "post", "put", "delete"];
//   if (acceptedMethod.indexOf(reqProperties.method) > -1) {
//     handler._check[reqProperties.method](reqProperties, callback);
//   } else {
//     callback(405);
//   }
// };
// handler._check = {};
// handler._check.post = (reqProperties, callback) => {
//   const protocol =
//     typeof reqProperties.body.protocol == "string" &&
//     ["http", "https"].indexOf(reqProperties.body.protocol) > -1
//       ? reqProperties.body.protocol
//       : false;
//   const url =
//     typeof reqProperties.body.url == "string" &&
//     reqProperties.body.url.trim().length > 0
//       ? reqProperties.body.url
//       : false;
//   const method =
//     typeof reqProperties.body.method == "string" &&
//     ["get", "post", "put", "delete"].indexOf(reqProperties.body.method) > -1
//       ? reqProperties.body.method
//       : false;
//   const successCodes =
//     typeof reqProperties.body.successCodes == "object" &&
//     reqProperties.body.successCodes instanceof Array
//       ? reqProperties.body.successCodes
//       : false;
//   const timeOutSeconds =
//     typeof reqProperties.body.timeOutSeconds == "number" &&
//     reqProperties.body.timeOutSeconds % 1 == 0 &&
//     reqProperties.body.timeOutSeconds >= 1 &&
//     reqProperties.body.timeOutSeconds <= 5
//       ? reqProperties.body.timeOutSeconds
//       : false;
//   if (protocol && method && timeOutSeconds && successCodes && url) {
//     let token =
//       typeof reqProperties.headerObject.token == "string"
//         ? reqProperties.headerObject.token
//         : false;
//     data.read("token", token, (err1, tokendata) => {
//       if (!err1 && tokendata) {
//         let userphone = parseJson(tokendata).phone;
//         data.read('users',userphone, (err,userData)=>{
//           if(!err&&userData){
//             tokenhandler._token.varify(token,phone,(isvalidtoken)=>{
//               if(isvalidtoken){

//               }else{
//                 callback(400, {
//                   error: "error in checking request",
//                 });
//               }
//             });

//           }else{
//             callback(400, {
//               error: "error in checking request",
//             });
//           }

//         });

//       } else {
//         callback(400, {
//           error: "error in checking request",
//         });
//       }
//     });
//   } else {
//     callback(400, {
//       error: "error in checking request",
//     });
//   }
// };
// handler._check.get = (reqProperties, callback) => {
//   //start from here now
// };
// handler._check.put = (reqProperties, callback) => {};
// handler._check.delete = (reqProperties, callback) => {};
// module.exports = handler;
