from gsheets import GSheets
import json
from flask import Flask, Response, send_from_directory, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:*"}})

@app.route('/api/sheets/<sheetId>')
def serve_sheets_api(sheetId):
    cacheParam = request.args.get('cache', 'false').lower()
    sheet = GSheets(sheetId)
    response = Response()
    response.headers['Content-Type'] = 'application/json'
    json_data = json.dumps(sheet.read(cacheParam == 'true'), ensure_ascii=False).encode('utf-8')
    response.data = json_data
    return response
@app.route('/')
@app.route('/dashboard/<path:file_path>')
def serve_dashboard(file_path='build/index.html'):
    return send_from_directory('dashboard', file_path)

