from flask import Flask, render_template, request
from config import API_KEY, SEARCH_ENGINE_ID
from flask_frozen import Freezer

import requests
import json

app = Flask(__name__)
freezer = Freezer(app)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/search', methods=['POST'])
def search():
    query = request.form['query'] if 'query' in request.form else ''
    if query:
        results = perform_search(query)
        return render_template('results.html', query=query, results=results)
    else:
        # Handle empty query case, such as displaying an error message
        error_message = "Please enter a search query."
        return render_template('index.html', error=error_message)


@app.route('/suggestions', methods=['POST'])
def suggestions():
    query = request.form['query']
    suggestions = get_suggestions(query)
    return json.dumps(suggestions)


def get_suggestions(query):

    suggestions = []
    if query.startswith('a'):
        suggestions = ['apple', 'android', 'automobile']
    elif query.startswith('b'):
        suggestions = ['banana', 'baseball', 'beach']
    return suggestions


def perform_search(query):
    api_key = (API_KEY)
    cx = (SEARCH_ENGINE_ID)

    url = f'https://www.googleapis.com/customsearch/v1?key={api_key}&cx={cx}&q={query}'
    response = requests.get(url)
    data = response.json()
    results = data['items']
    return results


if __name__ == '__main__':
    app.run(debug=True)
