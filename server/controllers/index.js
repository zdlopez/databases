var models = require('../models');
var bluebird = require('bluebird');



module.exports = {
  messages: {
    get: function (req, res) {
      console.log("im in controller/get");
      console.log(req.url);
      console.log('req.params: ',req.query);
      getDataWithBluebird(req.query)
        .then(function(data){
          console.log(data);
          res.writeHead(200,{'Content-Type':"Application/JSON"});
          res.end(data);
        })
        .catch(function(error){console.log('error coming out of bluebird func call', error);})
      ;




      // var data = models.messages.get(req.query);


    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log("im in controllers/index.js");
      console.log(req.body);
      models.messages.post(req.body);
      res.send();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }

};
  getDataWithBluebird = function(query){
    return new bluebird.Promise(function(resolve, reject){
      var data = models.messages.get(query, function(error, response){
        if(error){
          reject(error);
          console.log('Error in Bluebird');
        } else{
          console.log('resolve response#####'+response);
          resolve(response);
        }
      });
    });
  }
