var Sequelize = require("sequelize");

module.exports.sequelize = new Sequelize('chat2', 'root', '',{
  host: "localhost",
  port: 3000,
  dialect: 'mysql'
});

module.exports.sequelize.authenticate().complete(function(err){
  if(err){
    console.log("There is connection in ERROR");
  } else {
    console.log('Connection has been established successfully');
  }
});

//Creating Tables
module.exports.Users = module.exports.sequelize.define('Users',{
  userName: Sequelize.STRING,
});

module.exports.Rooms = module.exports.sequelize.define('Rooms',{
  roomName: Sequelize.STRING,
});

module.exports.Messages = module.exports.sequelize.define('Messages',{
  createdAt: Sequelize.STRING,
  userID:{
    references:"Users",
    referencesKey: "id"
  },
  text:Sequelize.STRING,
  roomID:{
    references:"Rooms",
    referencesKey: "id"
  },
});

module.exports.sequelize.sync({force:true}).complete(function(err){
  if(err){
    console.log('An error occur while creating table');
  }else{
    console.log('Tables created successfully');
  }
});

