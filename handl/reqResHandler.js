//dependencies
const url = require("url");
const handler = {};
const { StringDecoder } = require("string_decoder");
const route = require("../route");
const { parseJson } = require("../handlers/routehandler/utilities");
const { notfoundhandler } = require("../handlers/routehandler/notfound");
//scaffoldings

handler.handRequest = (req, res) => {
  const parseurl = url.parse(req.url, true);
  const path = parseurl.pathname;
  const trimpath = path.replace(/^\/+|\/+$/g, '');
  let decoder = new StringDecoder("utf-8");
  const method = req.method.toLowerCase();
  const queryStringObject=parseurl.query;
  const headerObject=req.headers;
  let realdata = "";
  const reqProperties = {
    parseurl,
    path,
    trimpath,
    method,
    queryStringObject,
    headerObject,
  };
  const chosenhandler = route[trimpath] ? route[trimpath] : notfoundhandler;

  req.on("data", (buffer) => {
    realdata += decoder.write(buffer);
  });
  req.on("end", () => {
    reqProperties.body = parseJson(realdata);
    chosenhandler(reqProperties, (statuscode, payload) => {
      statuscode = typeof statuscode == "number" ? statuscode : 500;
      payload = typeof payload == "object" ? payload : {};
      const payloadstring = JSON.stringify(payload);

      //  return payloadstring;
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statuscode);
      res.end(payloadstring);
    });
    realdata += decoder.end();
    console.log(realdata);
  });
};
module.exports = handler;
