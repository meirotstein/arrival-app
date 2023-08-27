from gsheets import GSheets
import json
from flask import Flask, Response, send_from_directory
app = Flask(__name__)

@app.route('/api/sheets/<sheetId>')
def serve_sheets_api(sheetId):
    sheet = GSheets(sheetId)
    response = Response()
    response.headers['Content-Type'] = 'application/json'
    json_data = json.dumps(sheet.read(), ensure_ascii=False).encode('utf-8')
    response.data = json_data
    return response
@app.route('/')
@app.route('/dashboard/<path:file_path>')
def serve_dashboard(file_path='build/index.html'):
    return send_from_directory('dashboard', file_path)

