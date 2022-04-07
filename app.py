# pylint: disable=E1101
# pylint: disable=C0413
# pylint: disable=W1508
# pylint: disable=R0903
# pylint: disable=W0603
import email
from enum import unique
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
from dataclasses import dataclass
from data.fakeData import data

load_dotenv(find_dotenv())

app = flask.Flask(__name__)

bp = flask.Blueprint("bp", __name__, template_folder="./static/react",)


db_url = os.getenv("DATABASE_URL")
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)
app.config["SQLALCHEMY_DATABASE_URI"] = db_url


# If we add Google OAuth
#app.config['GOOGLE_CLIENT_ID'] = os.getenv("GOOGLE_CLIENT_ID")
#app.config['GOOGLE_CLIENT_SECRET'] = os.getenv("GOOGLE_CLIENT_SECRET")

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = os.environ.get("SECRET_KEY")
#oauth = OAuth(app)

db = SQLAlchemy(app)

# Login_manager for flask-login
login_manager = LoginManager()
login_manager.init_app(app)

@dataclass
class Users(UserMixin, db.Model):
    first_name: str
    last_name: str
    ID: int
    password = str
    email = str
    videos = str

    __tablename__:"Users"
    first_name = db.Column(db.String(50),nullable=False)
    last_name = db.Column(db.String(50),nullable=False)
    ID = db.Column(db.Integer, primary_key = True)
    password = db.Column(db.String(120), nullable = False)
    email = db.Column(db.String(50), nullable = False, unique = True)
    videos = db.relationship("Video", backref="User")

    def get_id(self):
           return (self.ID)

    def verify_password(self, pwd):
        return check_password_hash(self.password, pwd)

@dataclass
class Video(db.Model):
    ID = int
    user_id: int
    ext_video_id: str
    title: str
    notes: str

    __tablename__:"Video"
    ID = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(Users.ID))
    ext_video_id = db.Column(db.String(100))
    title = db.Column(db.String(100), nullable=False)
    notes = db.relationship("Note", backref="Video")

@dataclass
class Note(db.Model):
    ID: int
    location_index: int
    video_id: int
    content: str

    location_index = db.Column(db.Integer)
    video_id =db.Column(db.Integer, db.ForeignKey(Video.ID))
    content = db.Column(db.String(500),nullable=False)
    __tablename__:"Note"
    ID = db.Column(db.Integer, primary_key = True)
    location_index = db.Column(db.Integer)
    video_id =db.Column(db.Integer, db.ForeignKey(Video.ID))
    content = db.Column(db.String(280),nullable=False) 

db.create_all()


# set up a separate route to serve the react index.html file generated
@bp.route("/index")
@login_required
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


    if flask.request.method == "POST":
        email = flask.request.form.get("email")
        password = flask.request.form.get("password")
        user = Users.query.filter_by(email=email).first()
        # If user is in the database login user and redirect to dashboard.
        if user and user.verify_password(password):
            login_user(user)
            return flask.redirect(flask.url_for("bp.index"))
        # else flash wrong email/password and render login page
        else:
            flask.flash("Incorrect Email and/or Password. Check your login details and try again!")
            return flask.render_template("login.html")

    return flask.render_template("login.html")

@app.route("/signup", methods=["GET", "POST"])
def signup():



    if flask.request.method == "POST":
        first = flask.request.form.get("first")
        last = flask.request.form.get("last")
        email = flask.request.form.get("email")
        password = flask.request.form.get("password")
        new_user = Users(first_name=first,last_name=last,email=email, password=generate_password_hash(password, method="sha256"))
        db.session.add(new_user)
        db.session.commit()
        # redirect to login page
        return flask.redirect(flask.url_for("login"))
   
    return flask.render_template("signup.html")

@app.route("/")
def landing():
    
    return flask.render_template("landing.html")

@app.route("/user", methods=["GET", "POST"])
def users():
    '''
    Allows user to edit username, password, etc
    '''
    return flask.jsonify(data['users'])

@app.route("/get_videos", methods=["GET", "POST"])
def get_videos():
    '''
    Returns all videos in DB for the user logged in
    '''
    print(f"Current User {current_user.ID}")
    videos = Video.query.filter_by(user_id=int(current_user.ID)).all()
    video_list = flask.jsonify(videos)
    print(f"Video List{video_list}")
    return video_list

@app.route("/video", methods=["GET", "POST"])
def video():
    '''
    Video app route is for individual video info editing
    The function takes the requested add/edit and returns the same data if successful, appending ID if New
    '''
    #
    if flask.request.method == "POST":
        # Setup a request JSON Obj
        req = flask.request.json
        print(f'Post JSON is {req}')

        # Start DB Session to send updated (or new) data to DB
        db.session.begin()
        # Check that ID -> if ID is 0, its a NEW NOTE
        req_id = req["ID"]
        # NEW ? EDIT
        if req_id == 0:
            print(f"   Creating new video: {req}")
            # Remove the temp ID from req
            req.pop("ID", None)
            # Unpack Dict Obj
            video = Video(**req)
            print(f'        Post Video is {video}')
            # Add note to DB
            db.session.add(video)
            # Commit change
            c = db.session.commit()
            print(f"            Commit: {c}")
            # Refresh and retrieve new note
            db.session.refresh(video)
            video_id = video.ID
            print(f"            New video ID is {video_id}")
            # Convert back to JSON Obj for response
            video_json = flask.jsonify(video)
            print(f'Post Response JSON is {video_json}')
            return video_json
        else:
            print(f"  Updating values for ID: {req_id}")
            # Unpack Dict Obj
            video = Video(**req)
            print(f'         Post Video is {video}')
            update_video = Video.query.filter_by(ID=req_id).first()
            update_video = video
            print(f'         Update Video is {update_video}')
            # Commit change
            c = db.session.commit()
            print(f"            Commit: {c}")
            # Convert back to JSON Obj for response
            video_json = flask.jsonify(update_video)
            print(f'Post Response JSON is {video_json}')
            return video_json
    return flask.jsonify(data['videos'])

@app.route("/note", methods=["GET", "POST"])
def notes():
    '''
    Note app route is for individual note editing
    The function takes the request
    '''
    #
    if flask.request.method == "POST":
        # Setup a request JSON Obj
        req = flask.request.json
        print(f'Post JSON is {req}')

        # Start DB Session to send updated (or new) data to DB
        db.session.begin()
        # Check that ID -> if ID is 0, its a NEW NOTE
        req_id = req["ID"]
        # NEW ? EDIT
        if req_id == 0:
            print(f"   Creating new note: {req}")
            # Remove the temp ID from req
            req.pop("ID", None)
            # Unpack Dict Obj
            note = Note(**req)
            print(f'        Post Note is {note}')
            # Add note to DB
            db.session.add(note)
            # Commit change
            c = db.session.commit()
            print(f"            Commit: {c}")
            # Refresh and retrieve new note
            db.session.refresh(note)
            note_id = note.ID
            print(f"            New note ID is {note_id}")
        else:
            print(f"  Updating values for ID: {req_id}")
            # Unpack Dict Obj
            note = Note(**req)
            print(f'         Post Note is {note}')
            update_note = Note.query.filter_by(ID=req_id).first()
            update_note = note
            # Commit change
            c = db.session.commit()
            print(f"            Commit: {c}")
            return update_note
        # Convert back to JSON Obj for re
        note_json = flask.jsonify(note)
        print(f'Post Response JSON is {note_json}')
        return note_json
    return flask.jsonify(data['notes'])

# send manifest.json file
@app.route("/manifest.json")
def manifest():
    return flask.send_from_directory("./build", "manifest.json")

app.register_blueprint(bp)

if __name__ == "__main__":
    app.run(
        host=os.getenv("IP", "0.0.0.0"), port=int(os.getenv("PORT", 8080)), debug=True
    )
