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
from flask_oauthlib.client import OAuth, OAuthException

load_dotenv(find_dotenv())

app = flask.Flask(__name__, static_folder="./build/static")

bp = flask.Blueprint(
    "bp",
    __name__,
    template_folder="./static/react",
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
oauth = OAuth(app)

db = SQLAlchemy(app)
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
# you can change the route name to be more specific.
@bp.route("/")
def index():
    return flask.render_template("index.html")

#routes for login/sign up/landing pages
@app.route("/login", methods=["POST", "GET"])
def login():

    return ("Login")

@app.route("/sign-up", methods=["GET", "POST"])
def signup():

    return ("Sign Up")

@app.route("/landing")
def landing():
    
    return ("Landing Page")
app.run(debug=True)