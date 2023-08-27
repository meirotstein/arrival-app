from flask import Flask, Response, send_from_directory
app = Flask(__name__)

@app.route('/api')
def serve_api():
    response = Response()
    response.headers['Content-Type'] = 'application/json'
    response.data = '{"message": "Hello, World!"}'
    return response
@app.route('/')
@app.route('/dashboard/<path:file_path>')
def serve_dashboard(file_path='build/index.html'):
    return send_from_directory('dashboard', file_path)

