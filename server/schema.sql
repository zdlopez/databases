CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  uID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userName varchar(50)
);

CREATE TABLE rooms (
  rmID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  roomName varchar(50)
);

CREATE TABLE messages (
  mID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  createdAt char(24),
  fk_uID INT,
  text varchar(200),
  fk_rmID INT,
  FOREIGN KEY (fk_uID)
  REFERENCES users(uID),
  FOREIGN KEY (fk_rmID)
  REFERENCES rooms(rmID)
);


/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

