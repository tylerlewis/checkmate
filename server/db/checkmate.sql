CREATE DATABASE Checkmate;

USE Checkmate;

CREATE TABLE Users (
  userId int NOT NULL AUTO_INCREMENT,
  username varchar(255),
  password varchar(255),
  PRIMARY KEY (userID)
);

CREATE TABLE Groups (
  groupId int NOT NULL AUTO_INCREMENT,
  name varchar(255),
  password varchar(255),
  userId int,
  PRIMARY KEY (groupId),
  FOREIGN KEY (userId) REFERENCES Users (userId)
);

CREATE TABLE Bills (
  billId int NOT NULL AUTO_INCREMENT,
  whoPaid varchar(255),
  type varchar(255),
  amount decimal(65, 2),
  created date,
  groupId int,
  userId int,
  PRIMARY KEY (billId),
  FOREIGN KEY (groupId) REFERENCES Groups (groupId),
  FOREIGN KEY (userId) REFERENCES Users (userId)
);

CREATE TABLE Link (
  linkId int NOT NULL AUTO_INCREMENT,
  groupId int,
  userId int,
  PRIMARY KEY (linkId),
  FOREIGN KEY (groupId) REFERENCES Groups (userId),
  FOREIGN KEY (userId) REFERENCES Users (userId)
);