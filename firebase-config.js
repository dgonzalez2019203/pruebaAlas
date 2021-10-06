var admin = require("firebase-admin");

var serviceAccount = require("./alasgt-firebase-adminsdk-5ccrk-7e614cd67c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports = admin;