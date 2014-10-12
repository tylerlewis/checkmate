CREATE DATABASE Checkmate;

USE Checkmate;

CREATE TABLE Users (
  UserID int NOT NULL AUTO_INCREMENT,
  Username varchar(255),
  Password varchar(255),
  PRIMARY KEY (UserID)
);

CREATE TABLE Groups (
  GroupID int NOT NULL AUTO_INCREMENT,
  Name varchar(255),
  Password varchar(255),
  UserID int,
  PRIMARY KEY (GroupID),
  FOREIGN KEY (UserID) REFERENCES Users (UserID)
);

CREATE TABLE Bills (
  BillID int NOT NULL AUTO_INCREMENT,
  WhoPaid varchar(255),
  Type varchar(255),
  Amount decimal(65, 2),
  Created date,
  GroupID int,
  UserID int,
  PRIMARY KEY (BillID),
  FOREIGN KEY (GroupID) REFERENCES Groups (GroupID),
  FOREIGN KEY (UserID) REFERENCES Users (UserID)
);

CREATE TABLE Link (
  LinkID int NOT NULL AUTO_INCREMENT,
  GroupID int,
  UserID int,
  PRIMARY KEY (LinkID),
  FOREIGN KEY (GroupID) REFERENCES Groups (UserID),
  FOREIGN KEY (UserID) REFERENCES Users (UserID)
);