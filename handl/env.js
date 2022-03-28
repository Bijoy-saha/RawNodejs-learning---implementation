const environment = {};
environment.staging = { port: 3001, envName: "staging", secretKey: "bijoy",twilo:{
  fromPhone:'',
} };
environment.production = { port: 3002, envName: "production",secretKey: "bijoy1",twilo:{
  fromPhone:'',
} };
const currentEnvironment =
  typeof process.env.NODE_ENV == "string" ? process.env.NODE_ENV : "staging";
const environmenttoExport =
  typeof environment[currentEnvironment] == "object"
    ? environment[currentEnvironment]
    : environment.staging;

module.exports = environmenttoExport;
