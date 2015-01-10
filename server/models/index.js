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
//
  var uIDQuery = "insert into users (userName) select * from (select '"+ data.username +"') as tmp where not exists (select userName from users where userName = '"+ data.username +"') limit 1";
  db.connection.query(uIDQuery, function(err, rows){
    console.log(rows);
  });
  //get userID
  var idQuery ="select (uID) from users where userName='"+data.username+"'";
  var uID;
  db.connection.query(idQuery, function(err, rows){
    uID = rows[0].uID;
  });
  //add room
  var roomQuery = "insert into rooms (roomName) select * from (select '"+ data.roomname +"') as tmp where not exists (select roomName from rooms where roomName = '"+ data.roomname +"') limit 1";
  db.connection.query(roomQuery, function(err, rows){
    console.log(rows);
  });
  //get roomID
  var roomIDQuery = "select (rmID) from rooms where roomName='"+data.roomname+"'";
  var roomID;
  db.connection.query(roomIDQuery, function(err, rows){
    console.log(rows);
    roomID = rows[0].rmID;
    console.log(roomID);
  });
  //add all it main
  data.createdAt = JSON.stringify(data.createdAt);
  // var insertMSG = "insert into messages (createdAt, fk_uID, text, fk_rmID) values ('" + data.createdAt + "'," + parseInt(uID) + ", '" + data.text + "'," + parseInt(roomID) + ")";
  var insertMSG = "insert into messages (createdAt, fk_uID) values ('" + data.createdAt + "',"+parseInt(uID)+")";
  db.connection.query(insertMSG, function(err, rows){
    if(err){console.log(err);}
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
