var admin = require("firebase-admin");

var serviceAccount = require("./alasgt-firebase-adminsdk-5ccrk-1000b1a375.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports = admin;