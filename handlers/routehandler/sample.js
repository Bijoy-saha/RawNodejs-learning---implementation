const handler = {};
handler.samplehandler = (reqProperties, callback) => {
  callback(200, {
    message: "this is simmpleroute",
  });
};
module.exports = handler;
