#drop database if exists guesswhat;

create database inner;

use inner;

create table i_user (
    `t_uid` INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `t_username` varchar(32) not null,
    `t_password` varchar(32) not null,
    `t_emailaddr` varchar(128) not null,
    `t_isadmin` tinyint(1),
    `t_created_at` real
) engine=innodb default charset=utf8;

create table i_user_misc (
    `t_uid` int(10) not null primary key,
    `t_credit` int(10),
    `t_qqid` varchar(12),
    `t_wechat` varchar(24),
    `t_cellphone` varchar(11),
    `t_rank` tinyint(2),
    `t_avatar` text,
    `t_motto` varchar(200),
    `t_website` varchar(72),
    `t_birthday` real
) engine=innodb default charset=utf8;


create table i_login_record (
    `t_id` int(10) not null primary key AUTO_INCREMENT,
    `t_uid` int(10),
    `t_loginip` varchar(12),
    `t_logintime` real
) engine=innodb default charset=utf8;