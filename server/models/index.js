var db = require('../db');




module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (data) {
      console.log("im in models post");
      postMessage(data);
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

var postMessage = function (data) {
  var data = JSON.parse(data);
  var username = data['username'];
  var text = data['text'];
  var roomname = data['roomname'] || 'lobby';
  var date = new Date();
  messages[Object.keys(messages).length + 1] = {'createdAt' : date, 'username': username, 'text': text, 'roomname': roomname};

  //replace with db.
  console.log("before i write");
  fs.writeFile('messages.txt', JSON.stringify(messages), 'utf8', function (err) {
    if (err) {
      console.log("did not write");
    } else {
      console.log("Messages stored to file");
    }
  });
};
