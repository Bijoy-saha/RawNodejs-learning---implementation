const https = require("https");
const {twilo}=require('../handl/env');
const querystring=require('querystring');
const notification = {};
notification.sendTwilioSms = (phone, msg, callback) => {
  const phn =
    typeof phone == "string" && phone.trim().length == 11
      ? phone.trim()
      : false;
  const sms =
    typeof msg == "string" && msg.trim().length > 0 && msg.trim().length <= 1600
      ? msg.trim()
      : false; 
      if(phone&&sms) {
          const payload={
              From:twilo.fromPhone,
              To:`+88${phone}`,
              Body:sms,
          }; 
const  stringfypayload=querystring.stringify(payload);
      }else{
          callback('given parameters are missing'); 
      }
};
