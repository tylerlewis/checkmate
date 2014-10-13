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
  PRIMARY KEY (groupId)
);

CREATE TABLE Bills (
  billId int NOT NULL AUTO_INCREMENT,
  whoPaid varchar(255),
  type varchar(255),
  amount decimal(65, 2),
  date varchar(255),
  groupName varchar(255),
  PRIMARY KEY (billId)
);

CREATE TABLE Links (
  linkId int NOT NULL AUTO_INCREMENT,
  groupName varchar(255),
  username varchar(255),
  PRIMARY KEY (linkId)
);