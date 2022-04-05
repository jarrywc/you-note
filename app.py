# pylint: disable=E1101
# pylint: disable=C0413
# pylint: disable=W1508
# pylint: disable=R0903
# pylint: disable=W0603
import email
from enum import unique
from turtle import title
import flask
import os
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
#from flask_oauthlib.client import OAuth, OAuthException
from flask_login import (
    LoginManager,
    UserMixin,
    login_user,
    login_required,
    logout_user,
    current_user,
)
from werkzeug.security import generate_password_hash, check_password_hash
load_dotenv(find_dotenv())

app = flask.Flask(__name__, static_url_path='/static')

bp = flask.Blueprint(
    "bp",
    __name__,
    template_folder="./build",
)

db_url = os.getenv("DATABASE_URL")
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)
app.config["SQLALCHEMY_DATABASE_URI"] = db_url

# If we add Google OAuth
# app.config['GOOGLE_CLIENT_ID'] = os.getenv("GOOGLE_CLIENT_ID")
# app.config['GOOGLE_CLIENT_SECRET'] = os.getenv("GOOGLE_CLIENT_SECRET")

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = os.environ.get("SECRET_KEY")
#oauth = OAuth(app)

db = SQLAlchemy(app)

# Login_manager for flask-login
login_manager = LoginManager()
login_manager.init_app(app)

class Users(db.Model):
    '''
    Defines the structure of the user in the database.
    '''
    __tablename__:"Users"
    first_name = db.Column(db.String(50),nullable=False)
    last_name = db.Column(db.String(50),nullable=False)
    ID = db.Column(db.Integer, primary_key = True)
    password = db.Column(db.String(100), nullable = False)
    email = db.Column(db.String(50), nullable = False, unique = True)
    videos = db.relationship("Video", backref="User")

    def verify_password(self, pwd):
        return check_password_hash(self.password, pwd)

class Video(db.Model):
    
    '''
    Defines the structure of the user in the database
    '''
    __tablename__:"Video"
    ID = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(Users.ID))
    ext_video_id = db.Column(db.String(25))
    title = db.Column(db.String(100), nullable=False)
    notes = db.relationship("Note", backref="Video")
class Note(db.Model):
    '''
    defines the structure of a note in the database
    '''
    __tablename__:"Note"
    ID = db.Column(db.Integer, primary_key = True)
    location_index = db.Column(db.Integer)
    video_id =db.Column(db.Integer, db.ForeignKey(Video.ID))
    content = db.Column(db.String(280),nullable=False) 
db.create_all()

# set up a separate route to serve the react index.html file generated
@bp.route("/")
def index():
    return flask.render_template("index.html")

# ---------------------------------------------------------------------------
# LOGIN/REGISTER FUNCTIONS
# ---------------------------------------------------------------------------

# User loader callback to reload user ID stored in the session
@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))

#routes for login/sign up/landing pages
@app.route("/login", methods=["POST", "GET"])
def login():

    return ("Login")

@app.route("/signup", methods=["GET", "POST"])
def signup():
    if flask.request.method == "POST":
        first = flask.request.form.get("first")
        last = flask.request.form.get("last")
        email = flask.request.form.get("email")
        password = flask.request.form.get("password")
        new_user = Users(first_name=first,last_name=last,email=email, password=generate_password_hash(password))
        db.session.add(new_user)
        db.session.commit()
        # redirect to login page
        return flask.redirect(flask.url_for("login"))

    return flask.render_template("signup.html")

@app.route("/landing")
def landing():
    
    return ("Landing Page")
  
app.register_blueprint(bp)

app.run(debug=True)
