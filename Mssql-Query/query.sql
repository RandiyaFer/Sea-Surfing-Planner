mysql> create table user(
    -> id int not null AUTO_INCREMENT,
    -> name varchar(25) not null,
    -> email varchar(50) not null,
    -> phoneNumber varchar(10) not null,
    -> password varchar(25) not null,
    -> emailVerified smallInt not null,
    -> phoneVerified smallInt not null,
    -> primary key(id)
    -> );