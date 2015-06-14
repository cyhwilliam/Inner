from flask.ext.sqlalchemy import SQLAlchemy
from time import time

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'i_user'
    uid = db.Column('t_uid', db.Integer, primary_key=True, autoincrement=True)
    username = db.Column('t_username', db.String(32))
    password = db.Column('t_password', db.String(32))
    email_addr = db.Column('t_emailaddr', db.String(128))
    is_admin = db.Column('t_isadmin', db.Integer)
    created_at = db.Column('t_created_at', db.Float)

    def __init__(self, username, password, emailaddr, isadmin):
        self.username = username
        self.password = password
        self.email_addr = emailaddr
        self.is_admin = isadmin
        self.created_at = time.time()


class UserMisc(db.Model):
    __tablename__ = 'i_user_misc'
    uid = db.Column('t_uid', db.Integer, primary_key=True)
    credit = db.Column('t_credit', db.Integer)
    qqid = db.Column('t_qqid', db.String(12))
    wechat = db.Column('t_wechat', db.String(24))
    cellphone = db.Column('t_cellphone', db.String(11))
    rank = db.Column('t_rank', db.Integer)
    avatar = db.Column('t_avatar', db.Text)
    motto = db.Column('t_motto', db.String(200))
    website = db.Column('t_website', db.String(72))
    birthday = db.Column('t_birthday', db.Float)


class UserLoginRecord(db.Model):
    __tablename__ = 'i_login_record'
    rec_id = db.Column('t_id', db.Integer, primary_key=True, autoincrement=True)
    uid = db.Column('t_uid', db.Integer)
    loginip = db.Column('t_loginip', db.String(12))
    logintime = db.Column('t_logintime', db.Float)

    def __init__(self, uid, ip):
        self.uid = uid
        self.loginip = ip
        self.logintime = time.time()
