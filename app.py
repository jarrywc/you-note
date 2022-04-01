# pylint: disable=E1101
# pylint: disable=C0413
# pylint: disable=W1508
# pylint: disable=R0903
# pylint: disable=W0603
import flask
import os
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
from flask_oauthlib.client import OAuth, OAuthException
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
oauth = OAuth(app)

db = SQLAlchemy(app)

# set up a separate route to serve the react index.html file generated
# you can change the route name to be more specific.
@bp.route("/mainpage")
def index():
    return flask.render_template("index.html")

#routes for login/sign up/landing pages
@app.route("/login", methods=["POST", "GET"])
def login():

    return ("Login")

@app.route("/signup", methods=["GET", "POST"])
def signup():

    return ("Sign Up")

@app.route("/landing")
def landing():
    
    return ("Landing Page")

app.register_blueprint(bp)

app.run()