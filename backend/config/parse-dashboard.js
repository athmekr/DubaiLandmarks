/* eslint-disable linebreak-style */
module.exports = {
  "apps": [
    {
      "serverURL": process.env.SERVER_URL || "http://localhost:1337/parse",
      "appId": process.env.APP_ID || "myAppId",
      "masterKey": process.env.MasterKey || "myMasterKey",
      "appName": process.env.appName || "MyApp"
    }
  ],
  "users": [
    {
      "user": process.env.APP_USER || "admin",
      "pass": process.env.APP_PASS || "admin"
    }
  ],
  "useEncryptedPasswords": true | false
}

