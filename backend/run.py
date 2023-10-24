# set FLASK_APP=run.py
# python -m flask run
# Make sure debugger is active

from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)

"""
2.1 Load and Parse JSON data
● Read the JSON file containing courses. Ensure the data has course number,
name, description, and timings.

2.2 Implement Search Logic
● Given a search string, you should be able to filter and fetch relevant courses from
the JSON data based on course name or number.


3.1 Create an endpoint for Course Search
● Design a GET route that can take a search string and return matching courses
from the parsed JSON data.

3.2 Test the endpoint
● Before handing it over to the frontend team, test your endpoint

"""