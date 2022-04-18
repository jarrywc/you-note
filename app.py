# pylint: disable=E1101
# pylint: disable=C0413
# pylint: disable=W1508
# pylint: disable=R0903
# pylint: disable=W0603
import email
from enum import unique
import flask
import os
import flask_login
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

# from flask_oauthlib.client import OAuth, OAuthException
# from flask_oauthlib.client import OAuth, OAuthException
from flask_login import (
    LoginManager,
    UserMixin,
    login_user,
    login_required,
    logout_user,
)
from werkzeug.security import generate_password_hash, check_password_hash
from dataclasses import dataclass
from data.fakeData import data

load_dotenv(find_dotenv())

app = flask.Flask(__name__)

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
# oauth = OAuth(app)

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

    __tablename__: "Users"
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    ID = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    videos = db.relationship("Video", backref="Users")

    def get_id(self):
        return self.ID

    def verify_password(self, pwd):
        return check_password_hash(self.password, pwd)

@dataclass
class Video(db.Model):
    ID = int
    user_id: int
    ext_video_id: str
    title: str
    notes: str

    __tablename__: "Video"
    ID = db.Column(db.Integer, primary_key=True)
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

    __tablename__: "Note"
    ID = db.Column(db.Integer, primary_key=True)
    location_index = db.Column(db.Integer)
    video_id = db.Column(db.Integer, db.ForeignKey(Video.ID))
    content = db.Column(db.String(500), nullable=False)


db.create_all()


# set up a separate route to serve the react index.html file generated
@bp.route("/main")
@login_required
def index():
    print(f"User Into React: {flask_login.current_user.ID}")
    return flask.render_template("index.html")


# ---------------------------------------------------------------------------
# LOGIN/REGISTER FUNCTIONS
# ---------------------------------------------------------------------------

# User loader callback to reload user ID stored in the session


@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))


# routes for login/sign up/landing pages
@app.route("/login", methods=["POST", "GET"])
def login():
    if flask.request.method == "POST":
        email = flask.request.form.get("email")
        password = flask.request.form.get("password")
        user = Users.query.filter_by(email=email).first()
        # If user is in the database login user and redirect to dashboard.
        if user and user.verify_password(password):
            login_user(user)
            print(f"Logged in User: {flask_login.current_user.ID}")
            return flask.redirect(flask.url_for("bp.index"))
        # else flash wrong email/password and render login page
        else:
            flask.flash(
                "Incorrect Email and/or Password. Check your login details and try again!"
            )
            return flask.render_template("login.html")

    return flask.render_template("login.html")


@app.route("/signup", methods=["GET", "POST"])
def signup():

    if flask.request.method == "POST":
        first = flask.request.form.get("first")
        last = flask.request.form.get("last")
        email = flask.request.form.get("email")
        password = flask.request.form.get("password")
        new_user = Users(
            first_name=first,
            last_name=last,
            email=email,
            password=generate_password_hash(password, method="sha256"),
        )
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
    """
    Allows user to edit username, password, etc
    """
    return flask.jsonify(data["users"])


@app.route("/get_videos", methods=["GET", "POST"])
def get_videos():
    """
    Returns all videos in DB for the user logged in
    """
    user_logged_in = 1 # flask_login.current_user.ID
    print(f"Current User {user_logged_in}")
    video_list = Video.query.with_entities(
        Video.ID,
        Video.ext_video_id,
        Video.title
    ).filter_by(user_id=int(user_logged_in)).all()
    print(f"Video List:: {video_list}")
    export_list = []
    for vid in video_list:
        export_list.append({"ID": vid[0], "ext_video_id": vid[1], "title": vid[2]})
    export_list_json = flask.jsonify(export_list)
    print(f"Video List as JSON:: {export_list_json}")
    return export_list_json


@app.route("/get_notes", methods=["GET", "POST"])
def get_notes():
    '''
    Returns all videos in DB for the user logged in

    Need to add comparison of user_id for video with current_user for read security
    '''
    req = flask.request.json
    try:
        vid_id = req["video_id"]
    except KeyError:
        return "404"
    if flask.request.method == "GET":
        req = flask.request.json
        vid_id = req["video_id"]
        print(f"Video ID:: {vid_id}")
        note_list = Note.query.with_entities(
            Note.ID,
            Note.video_id,
            Note.location_index,
            Note.content
        ).filter_by(video_id=1).all()
        print(f"Note List:: {note_list}")
        export_list = []
        for note in note_list:
            export_list.append(
                {
                    "ID": note[0],
                    "video_id": note[1],
                    "location_index": note[2],
                    "content": note[3]
                }
            )
        export_list_json = flask.jsonify(export_list)
        print(f"Video List as JSON:: {export_list_json}")
        return export_list_json
    return "404"


@app.route("/video", methods=["GET", "POST"])
def video():
    '''
    Video app route is for individual video info editing
    The function takes the requested add/edit
    and returns the same data if successful, appending ID if New
    '''
    #
    user_logged_in = 1 # flask_login.current_user.ID
    print(f"User_Id {user_logged_in}")
    if flask.request.method == "POST":
        # Get the request as JSON
        request=flask.request.json
        print(f"Inbound Request {request}")
        # Get the request data
        request=request["data"]
        # Get the request id
        req_id = request["ID"]
        print(f"Request as JSON --> {request}")
        # Begin Session
        db.session.begin()
        # Assign User to requested Row Entry
        request.update({"user_id":user_logged_in})
        print(f"                                current user {user_logged_in}")
        # Conditional: New or Update
        if req_id == 0:
            #       Is External_Video_ID is not blank
            if request["ext_video_id"] != "":
            #                           Find out if External_Video_ID already exists
                if Video.query.filter_by(ext_video_id=request["ext_video_id"]).first() is not None:
                    print(f"Video doesn't exist")
                    return "404 - Video Duplicate"
            print(f"   Creating new video: {request}")
            #                           Remove the temp ID from req
            request.pop("ID", None)
            #                           Unpack JSON to Dict Obj
            t = Video(**request)
            print(f"    Table Row Append |_|_| {t}")
            #                           Add Item to DB
            db.session.add(t)
            #                           Commit and grab result
            commit_result = db.session.commit()
            print(f"     Commit: {commit_result}")
            #                           Refresh and retrieve new Table Row
            db.session.refresh(t)
            #                           Set Update back
            updated_table = t
            #                           Extract Table Row ID
            req_id = updated_table.ID
        else:
            #                           Find out if ID already exists
            if Video.query.filter_by(ID=req_id, user_id=user_logged_in).first() is None:
                    print(f"Video doesn't exist")
                    return "404 - Video Not Here"
            print(f"  Updating values for ID: {req_id}")
            #                           Unpack Dict Obj
            t = Video(**request)
            print(f'         Post Table is {t}')
            #                               Get the Table Row by it's ID, only THIS user
            updated_table = Video.query.filter_by(ID=req_id,user_id=user_logged_in).first()
            print(f"            Old Table: {updated_table}")
            #                           Set Update back
            updated_table.ext_video_id = t.ext_video_id
            updated_table.title = t.title
            #                           Commit and grab result
            commit_result = db.session.commit()
            print(f"     Commit: {commit_result}")
        #                           Create JSON-able ID
        response_id = {"ID": req_id}
        print(f"                ID is {req_id}, in JSON {response_id}")
        #                           Convert back to Response Obj for response
        response = flask.jsonify(updated_table)
        #                           Get to JSON Format
        response_json = response.get_json()
        #                           Add ID
        response_json.update(response_id)
        print(f" :::Compiled Response ::: {response_json}")
        #                   Return the whole Row back as JSON
        return response_json
    req = flask.request.json
    print(f"!!! Couldn't update {req}")
    return "404"



@app.route("/note", methods=["GET", "POST"])
def note():
    '''
    Note app route is for individual note info editing
    The function takes the requested add/edit
    and returns the same data if successful, appending ID if New
    '''
    # Current Logged in User
    current_user_id = current_user.ID
    if flask.request.method == "POST":
        # Get the request as JSON
        request=flask.request.json
        print(f"Inbound Request {request}")
        # Get the request data
        request=request["data"]
        # Get the request id
        req_id = request["ID"]
        print(f"Request as JSON --> {request}")
        # Begin Session
        db.session.begin()
        try:
            # Get the video_id
            video_id = request["video_id"]
            # Check DB for Video ID
            video = Video.query.filter_by(ID=video_id).first()
            # Video User ID
            video_user_id = video.user_id

            # Compare with logged in User ID
            if (current_user_id != video_user_id):
                print("Error with User ID")
                # Stop any DB mutation if the user for this video is wrong
                return "404 - Invalid User ID"
        except AttributeError or KeyError:
            print("Error with Note ID")
            return "404 - Invalid Key for Note"
        # Current User
        print(f"                                current user {current_user_id}")
        # Conditional: New or Update
        if req_id == 0:
            print(f"   Creating new Note: {request}")
            #                           Remove the temp ID from req
            request.pop("ID", None)
            #                           Unpack JSON to Dict Obj
            t = Note(**request)
            print(f"    Table Row Append |_|_| {t}")
            #                           Add Item to DB
            db.session.add(t)
            #                           Commit and grab result
            commit_result = db.session.commit()
            print(f"     Commit: {commit_result}")
            #                           Refresh and retrieve new Table Row
            db.session.refresh(t)
            #                           Set Update back
            updated_table = t
            #                           Extract Table Row ID
            req_id = updated_table.ID
        else:
            print(f"  Updating values for ID: {req_id}")
            #                           Unpack Dict Obj
            t = Video(**request)
            print(f'         Post Table is {t}')
            #                               Get the Table Row by it's ID, only THIS user
            updated_table = Video.query.filter_by(ID=req_id,user_id=current_user_id).first()
            print(f"            Old Table: {updated_table}")
            #                           Set Update back
            updated_table.ext_video_id = t.ext_video_id
            updated_table.title = t.title
            #                           Commit and grab result
            commit_result = db.session.commit()
            print(f"     Commit: {commit_result}")
        #                           Create JSON-able ID
        response_id = {"ID": req_id}
        print(f"                ID is {req_id}, in JSON {response_id}")
        #                           Convert back to Response Obj for response
        response = flask.jsonify(updated_table)
        #                           Get to JSON Format
        response_json = response.get_json()
        #                           Add ID
        response_json.update(response_id)
        print(f" :::Compiled Response ::: {response_json}")
        #                   Return the whole Row back as JSON
        return response_json
    req = flask.request.json
    print(f"!!! Couldn't update {req}")
    return "404"

@app.route("/update_password", methods=["GET", "POST"])
def update_password():

    if flask.request.method == "POST":
        password = flask.request.form.get("password")
        new_user = Users(
            email=email,
            password=generate_password_hash(password, method="sha256"),
        )
        db.session.add(new_user)
        db.session.commit()
        # redirect to login page
        return flask.redirect(flask.url_for("update_password"))

    return flask.render_template("update_password.html")


# send manifest.json file
@app.route("/manifest.json")
def manifest():
    return flask.send_from_directory("./build", "manifest.json")


app.register_blueprint(bp)

# Delete a video!!!
# Video.query.filter(Video.ID == 2).delete()
# Video.query.filter(Video.ID == 4).delete()
# db.session.commit()


if __name__ == "__main__":
    app.run(
        host=os.getenv("IP", "0.0.0.0"), port=int(os.getenv("PORT", 8080)), debug=True
    )
