from flask import Flask, jsonify, render_template
from flask import session, request, make_response
from api import APIError, datetime_filter
from captcha import generate_captcha
from config.config import configs
from model import db, User, UserLoginRecord
import re

_RE_MD5 = re.compile(r'^[0-9a-fA-F]{32}$')
_RE_EMAIL = re.compile(r'^[\w\.\-]+@[\w\-]+(\.[\w\-]+){1,4}$')
_COOKIE_KEY = configs.session.secret

app = Flask(__name__)
db.init_app(app)


def login(uid):
    ip = request.remote_addr
    log_rec = UserLoginRecord(uid, ip)
    db.session.add(log_rec)
    db.session.commit()
    db.session.flush()


@app.errorhandler(APIError)
def handle_api_error(error):
    '''
        API Error handler
    '''
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


@app.route('/', methods=['GET'])
def index_page():
    return render_template('index.html')


@app.route('/register', methods=['GET'])
def reg_page():
    return render_template('register.html')


@app.route('/test')
def index():
    return "Hello World"


@app.route('/api/captcha', methods=['GET'])
def get_captcha():
    cap, img = generate_captcha()
    session['captcha'] = cap
    response = make_response(img.getvalue())
    response.headers['Content-Type'] = 'image/gif'
    return response


@app.route('/api/register', methods=['POST'])
def api_register():
    '''
    User registration API
    Required HTTP Method: POST
    Required data:
        1. username - User's nickname
        2. email    - Email address !CAUTION: UNIQUE CREDENTIAL FOR USERS!
        3. password - Password should be sent MD5 hashed
        5. captcha
    '''
    try:
        username = request.form['username'].strip()
        email = request.form['email'].strip().lower()
        password = request.form['password'].strip()
        captcha = request.form['captcha'].strip()
        cap_answer = session['captcha']
        if captcha.lower() != cap_answer.lower():
            raise APIError('Wrong captcha.', 200)
        check_exist = User.query.filter_by(email_addr=email).first()
        if check_exist:
            raise APIError('Email address has been registered.', 200)
        if not _RE_MD5.match(password):
            raise APIError('Invalid password format', 200)
        if not _RE_EMAIL.match(email):
            raise APIError('Invalid email address', 200)
        if not username.strip():
            raise APIError('Empty username', 200)
        u = User(username, password, email, 0)
        db.session.add(u)
        db.session.commit()
        # Login
        session['email'] = u.email_addr
        session['username'] = u.username
        session['password'] = u.password
        return jsonify(username=u.username, emailaddr=u.email_addr)
    except KeyError, ex:
        raise APIError(ex.message, 500)


@app.route('/api/auth', methods=['POST'])
def api_authenticate():
    try:
        email = request.form['email'].strip().lower()
        password = request.form['password'].strip()
        try:
            remember = request.form['remember'].strip()
            if isinstance(remember, str):
                if remember == 'on':
                    remember = 1
            else:
                remember = int(remember)
        except KeyError:
            remember = 0
        user = User.query.filter_by(email_addr=email).first()
        if not user:
            raise APIError('User does not exist', 200)
        if not user.password == password:
            raise APIError('Wrong password', 200)
        if remember:
            session.permanent = True
        session['email'] = user.t_emailaddr
        session['username'] = user.t_username
        session['password'] = user.t_password
        login(user.uid)
        return jsonify(username=user.username, emailaddr=user.email_addr)
    except KeyError, e:
        raise APIError(e.message, 500)


if __name__ == '__main__':
    db_user = configs.db.user
    db_pass = configs.db.password
    db_name = configs.db.database
    db_host = configs.db.host
    db_port = configs.db.port

    db_connection_str = 'mysql+mysqlconnector://' + db_user + ':' + db_pass + '@' + db_host + ':' + \
                        str(db_port) + '/' + db_name
    app.config['SQLALCHEMY_DATABASE_URI'] = db_connection_str
    app.config.from_object('config.config')
    app.jinja_env.filters['datetime'] = datetime_filter
    app.run(debug=True)
