const handler = {};
const { hash } = require("./utilities");
const { createRandomString } = require("./utilities");
const { parseJson } = require("./utilities");
const data = require("../../lib/data");
handler.tokenHandler = (reqProperties, callback) => {
  const acceptedMethod = ["get", "post", "put", "delete"];
  if (acceptedMethod.indexOf(reqProperties.method) > -1) {
    handler._token[reqProperties.method](reqProperties, callback);
  } else {
    callback(405);
  }
};
handler._token = {};
handler._token.post = (reqProperties, callback) => {
  const password =
    typeof reqProperties.body.password == "string" &&
    reqProperties.body.password.trim().length > 0
      ? reqProperties.body.password
      : false;
  const phone =
    typeof reqProperties.body.phone == "string" &&
    reqProperties.body.phone.trim().length == 11
      ? reqProperties.body.phone
      : false;
  if (password && phone) {
    data.read("users", phone, (error, userData) => {
      let hashedpassword = hash(password);
      if (hashedpassword == parseJson(userData).password) {
        let tokenID = createRandomString(20);
        let expire = Date.now() + 60 * 60 * 1000;
        let tokenObject = {
          phone,
          id: tokenID,
          expire,
        };
        data.create("token", tokenID, tokenObject, (error) => {
          if (!error) {
            callback(200, tokenObject);
          } else {
            callback(500, {
              error: "error in server",
            });
          }
        });
      } else {
        callback(400, {
          error: `${parseJson(userData).password}`,
        });
      }
    });
  } else {
    callback(400, {
      error: `${phone}`,
    });
  }
};
handler._token.get = (reqProperties, callback) => {
  //start from here now
  const id =
    typeof reqProperties.queryStringObject.id == "string" &&
    reqProperties.queryStringObject.id.trim().length == 21
      ? reqProperties.queryStringObject.id
      : false;
  if (id) {
    //lokk up user
    data.read("token", id, (err, tokenData) => {
      const token = { ...parseJson(tokenData) };
      if (!err && token) {
        //delete user.password;
        callback(200, token);
      } else {
        callback(400, { error: " token not found" });
      }
    });
  } else {
    callback(400, { error: `${id}` });
  }
};
handler._token.put = (reqProperties, callback) => {
  const id =
    typeof reqProperties.body.id == "string" &&
    reqProperties.body.id.trim().length == 21
      ? reqProperties.body.id
      : false;
  const extend =
    typeof reqProperties.body.extend == "boolean" &&
    reqProperties.body.extend == true
      ? true
      : false;
  if (id && extend) {
    data.read("token", id, (err, tokenData) => {
      const tokenObject = parseJson(tokenData);
      if (tokenObject.expire > Date.now()) {
        tokenObject.expire = Date.now() + 60 * 60 * 1000;
        data.update("token", id, tokenObject, (err) => {
          if (!err) {
            callback(400, { message: "takoen validate for more  1 hour" });
          } else {
            callback(500, {
              error: "server error while updating token expirey",
            });
          }
        });
      } else {
        callback(404, { error: `${Date.now()} and ${tokenObject.expire}` });
      }
    });
  } else {
    callback(400, { error: `error in request` });
  }
};
handler._token.delete = (reqProperties, callback) => {
  const id =
    typeof reqProperties.body.id == "string" &&
    reqProperties.body.id.trim().length == 21
      ? reqProperties.body.id
      : false;
  if (id) {
    data.read("token", id, (err, datas) => {
      if (!err && datas) {
        data.delete("token", id, (err) => {
          if (!err) {
            callback(200, { message: " token ...success delete" });
          } else {
            callback(500, { error: " token ...dekete error" });
          }
        });
      } else {
        callback(404, { error: "token.. problems !" });
      }
    });
  } else {
    callback(404, { error: "sorry can not delete" });
  }
  
};
handler._token.varify = (id, phone, callback) => {
  data.read("token", id, (err, tokenData) => {
    if (!err && tokenData) {
      if (
        (parseJson(tokenData).phone == phone,
        parseJson(tokenData).expire >= Date.now())
      ) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};
module.exports = handler;
