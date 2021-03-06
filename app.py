from flask import Flask

from routes import init_api_routes
from routes import init_website_routes
from routes import init_error_handlers


# create the Flask application
app = Flask(__name__)

app.config['SECRET_KEY'] = 'Hello from the secret world of Flask! ;)'

init_website_routes(app)
init_api_routes(app)







if __name__ == "__main__":
    app.run(debug=True)
