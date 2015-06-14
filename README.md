# Inner
A storage for our memory
### Directory structure
```
Inner/
  venv/ - Virtual environment
  config/ - Backend configurations
  static/ - Static resources
    js/ - Javascripts
    css/ - Stylesheets
    images/ - Images
    fonts/ - Fonts
    uploads/ - User-uploaded files
  templates/ - Jinja2 templates
```
### Backend structure:
Language: Python 2.7

Framework: Flask

Database: MySQL
### Usage (POSIX-compatible OSes recommended)
First initialize virtual environment:
`. venv/bin/activate`

Then run the `urls.py` to start the test server
`python urls.py`
### Login and register functions
As is defined in the `urls.py`, index page and register page should be put into the `templates` directory and named `index.html` and `register.html` respectively.

For register, front-end client should POST data including `username`,`password`,`email` and `captcha` to `/api/register`.

For register, `email` and `password` should be submitted to `/api/auth` via POST method.

NOTE:

1.Retrieve or refresh captcha using the url `/api/captcha`. It will return a 120x34 GIF image

2.Passwords should be MD5-hashed at front-end.
