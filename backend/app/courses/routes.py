from flask import request, jsonify
from . import courses

@courses.route('/search', methods=['GET'])
def search_courses():
    query = request.args.get('q', '')

    # TODO: Implement search logic to fetch courses based on the query from data.json

    return jsonify([])  # Return empty list for now
