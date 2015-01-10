var db = require('../db');
var fs = require('fs');



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
  var date = new Date();
  data['createdAt'] = date;
  console.log(data);
  // console.log(db);
  //replace with db.
  //db.connection.query('insert into users (userName) values ("' + data.username+ '")',function(err, rows){
//     if(err){console.log('your error is: '+err);
//   }
// });
  db.connection.query("insert into users (userName) select * from (select '"+ data.username +"') as tmp where not exists (select userName from users where userName = '"+ data.username +"') limit 1", function(err, rows){
    console.log(rows);
  });


  console.log("before i write");
  fs.writeFile('messages.txt', JSON.stringify(data), 'utf8', function (err) {
    if (err) {
      console.log("did not write");
    } else {
      console.log("Messages stored to file");
    }
  });
};
