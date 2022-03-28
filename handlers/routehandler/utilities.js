const utilities = {};
const crypto = require("crypto");
utilities.parseJson = (jsonString) => {
  let output;
  try {
    output = JSON.parse(jsonString);
  } catch (e) {
    output = {};
  }
  return output;
};
const environment = require("../../handl/env");
utilities.hash = (string) => {
  if (typeof string === "string" && string.length > 0) {
    const hash = crypto
      .createHmac("sha256", environment.secretKey)
      .update(string)
      .digest("hex");
    return hash;
  } else {
    return false;
  }
};
utilities.createRandomString = (stringLength) => {
  let length = stringLength;
  length =
    typeof stringLength == "number" && stringLength > 0 ? stringLength : false;
  if (length) {
    let possiblechar = "abcdefghijklmnopqrstuvwxyz123456789";
    let output = "";
    for (var i = 0; i <= length; i++) {
      const random = possiblechar.charAt(
        Math.floor(Math.random() * possiblechar.length)
      );
      output += random;
    }
    return output;
  } 
  return false;
};
module.exports = utilities;
