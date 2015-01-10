var db = require('../db');
var fs = require('fs');



module.exports = {
  messages: {
    get: function (query, callback) {
      return getMessages(query, callback);
    }, // a function which produces all the messages
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
  data['createdAt'] = JSON.stringify(date);

  var uIDQuery = "insert into users (userName) select * from (select '"+ data.username +"') as tmp where not exists (select userName from users where userName = '"+ data.username +"') limit 1";
  db.connection.query(uIDQuery, function(err, rows){
    //console.log(rows);
  });

  var roomQuery = "insert into rooms (roomName) select * from (select '"+ data.roomname +"') as tmp where not exists (select roomName from rooms where roomName = '"+ data.roomname +"') limit 1";
  db.connection.query(roomQuery, function(err, rows){
    //console.log(rows);
  });

  var insertMSG = "insert into messages (createdAt, fk_uID, text, fk_rmID) values ('" + data.createdAt + "',(select uID from users where userName ='" + data.username + "'), '" + data.text + "',(select rmID from rooms where roomName = '"+ data.roomname +"'))";

  db.connection.query(insertMSG, function(err, rows){
    // if(err){console.log(err);}
    // console.log(rows);
  });

};

var getMessages = function(query,callback){
  console.log("query is : ",query);
  // =
  var roomname = query.where.roomname;
  var msgQuery = "select messages.createdAt, users.userName,  messages.text, rooms.roomName from messages inner join users on messages.fk_uID = users.uID inner join rooms on messages.fk_rmID = rooms.rmID where rooms.roomName='"+roomname+ "'";
  db.connection.query(msgQuery, function(err, rows){
    console.log('returning from models');
    callback(null, rows);
  });
};
