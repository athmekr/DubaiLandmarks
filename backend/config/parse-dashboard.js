/* eslint-disable linebreak-style */
module.exports = {
  "apps": [
    {
      "serverURL": process.env.SERVER_URL || "http://localhost:1337/parse",
      "appId": process.env.APP_ID || "myAppId",
      "masterKey": process.env.MASTER_KEY || "myMasterKey",
      "appName": process.env.APP_NAME || "MyApp",
      //"primaryBackgroundColor": "rgb(255, 0, 0)", // Red
      //"secondaryBackgroundColor": "rgb(204, 0, 0)" // DarkRed
    }
  ],
  "users": [
    {
      "user": process.env.APP_USER || "admin",
      "pass": process.env.APP_PASS || "admin"
    }
  ]
}

