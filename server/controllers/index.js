var models = require('../models');
var bluebird = require('bluebird');



module.exports = {
  messages: {
    get: function (req, res) {}, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log("im in controllers/index.js");
      var data = '';
      req.on('data', function(chunk) {
        data += chunk;
        console.log("i'm chunking");
        // next();
      });
      req.on('end', function() {
        console.log(data);
        models.messages.post(data);
        res.writeHead(201);
        res.end();
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};
