const handler = {};
const { hash } = require("./utilities");
const { parseJson } = require("./utilities");
const data = require("../../lib/data");
const tokenhandler = require("./tokenhandler");
handler.userHandler = (reqProperties, callback) => {
  const acceptedMethod = ["get", "post", "put", "delete"];
  if (acceptedMethod.indexOf(reqProperties.method) > -1) {
    handler._user[reqProperties.method](reqProperties, callback);
  } else {
    callback(405);
  }
};
handler._user = {};
handler._user.post = (reqProperties, callback) => {
  const firstName =
    typeof reqProperties.body.firstName == "string" &&
    reqProperties.body.firstName.trim().length > 0
      ? reqProperties.body.firstName
      : false;
  const lastName =
    typeof reqProperties.body.lastName == "string" &&
    reqProperties.body.lastName.trim().length > 0
      ? reqProperties.body.lastName
      : false;
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
  const tosagreement =
    typeof reqProperties.body.tosagreement == "boolean"
      ? reqProperties.body.tosagreement
      : false;
  if (firstName && phone && lastName && tosagreement && password) {
    // make sure user doesnot exist.
    data.read("users", phone, (err, user) => {
      if (err) {
        const userobj = {
          firstName,
          lastName,
          phone,
          password: hash(password),
          tosagreement,
        };
        data.create("users", phone, userobj, (err) => {
          if (!err) {
            callback(200, { message: `${hash(password)}` });
          } else {
            callback(500, { error: "serverside error" });
          }
        });
      } else {
        callback(500, { error: "problems is server" });
      }
    });
  } else {
    callback(400, {
      error: `${tosagreement}`,
    });
  }
};
handler._user.get = (reqProperties, callback) => {
  //start from here now
  const phone =
    typeof reqProperties.queryStringObject.phone == "string" &&
    reqProperties.queryStringObject.phone.trim().length == 11
      ? reqProperties.queryStringObject.phone
      : false;
  if (phone) {
    let token =
      typeof reqProperties.headerObject.token == "string"
        ? reqProperties.headerObject.token
        : false;
    tokenhandler._token.varify(token, phone, (tokenid) => {
      if (tokenid) {
        data.read("users", phone, (err, u) => {
          const user = { ...parseJson(u) };
          if (!err && user) {
            delete user.password;
            callback(200, user);
          } else {
            callback(400, { error: "not found" });
          }
        });
      } else {
        callback(403, {
          error: "unauthenticated token",
        });
      }
    });
    //lokk up user
  } else {
    callback(400, { error: `${phone} fuck` });
  }
};
handler._user.put = (reqProperties, callback) => {
  const phone =
    typeof reqProperties.body.phone == "string" &&
    reqProperties.body.phone.trim().length == 11
      ? reqProperties.body.phone
      : false;
  const firstName =
    typeof reqProperties.body.firstName == "string" &&
    reqProperties.body.firstName.trim().length > 0
      ? reqProperties.body.firstName
      : false;
  const lastName =
    typeof reqProperties.body.lastName == "string" &&
    reqProperties.body.lastName.trim().length > 0
      ? reqProperties.body.lastName
      : false;
  const password =
    typeof reqProperties.body.password == "string" &&
    reqProperties.body.password.trim().length > 0
      ? reqProperties.body.password
      : false;
  if (phone) {
    if (firstName || lastName || password) {
      if (phone) {
        let token =
          typeof reqProperties.headerObject.token == "string"
            ? reqProperties.headerObject.token
            : false;
        tokenhandler._token.varify(token, phone, (tokenid) => {
          if (tokenid) {
            data.read("users", phone, (err, udata) => {
              const userData = { ...parseJson(udata) };
              if (!err && udata) {
                if (firstName) {
                  userData.firstName = firstName;
                }
                if (lastName) {
                  userData.lastName = lastName;
                }
                if (password) {
                  userData.password = password;
                }
                data.update("users", phone, userData, (err) => {
                  if (!err) {
                    callback(200, { message: "update successfull" });
                  } else {
                    callback(500, { error: "serverside error" });
                  }
                });
              } else {
                callback(400, { error: "req problem" });
              }
            });
          } else {
            callback(403, {
              error: "unauthenticated token",
            });
          }
        });
        //lokk up user
      } else {
        callback(400, { error: `${phone} fuck` });
      }
    } else {
      callback(400, { error: "req problem" });
    }
  } else {
    callback(404, { error: "invalid phone" });
  }
};
handler._user.delete = (reqProperties, callback) => {
  const phone =
    typeof reqProperties.body.phone == "string" &&
    reqProperties.body.phone.trim().length == 11
      ? reqProperties.body.phone
      : false;
  if (phone) {
    data.read("users", phone, (err, datas) => {
      if (!err && datas) {
        data.delete("users", phone, (err) => {
          if (!err) {
            callback(200, { message: "success delete" });
          } else {
            callback(500, { error: "dekete error" });
          }
        });
      } else {
        callback(404, { error: "problems !" });
      }
    });
  } else {
    callback(404, { error: "sorry can not delete" });
  }
};
module.exports = handler;
