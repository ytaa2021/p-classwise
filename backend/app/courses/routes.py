from flask import request, jsonify
from . import courses
import json

# Do we need to check if data has course number, name, description, and timings?
@courses.route('/')
def hello_world():
    return 'Hello, World!'

@courses.route('/search', methods=['GET'])
def search_courses():
  """Searches for courses that match the query string.

  Args:
    query: The query string to search for.
    courses: A list of courses.

  Returns:
    A list of courses that match the query string.
  """
  # Change for specific file path
  DATA = "C:/Users/catel/OneDrive/Documents/GitHub/p-classwise/backend/app/courses/data.json"

  query = request.args.get('q', '')

  with open(DATA, 'r') as file:
     data = json.load(file)

  results = []
  for course in data:
    if query.lower() in course['courseNumber'].lower() or query.lower() in course['courseTitle'].lower() or query.lower() in course['departmentExternalId'].lower() or query.lower() in course['institutionExternalId'].lower():
       results.append(course)
    """
      "courseNumber": "CSCI136",
      "courseTitle": "Computer Architecture",
      "departmentExternalId": "CompSci",
      "institutionExternalId": "PO",
    """
    # TODO: Implement search logic to fetch courses based on the query from data.json

  return jsonify(results)


#Testing: http://localhost:5000/courses/search?q=coursename