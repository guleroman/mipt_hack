import flask
from flask import render_template, request, send_file, jsonify, make_response, json,redirect
from data import getFromTable
from flask_cors import CORS, cross_origin

app = flask.Flask(__name__)
CORS(app)



@app.route("/api/v1/", methods=(['POST']))
@cross_origin(origins="*", methods=['POST','OPTIONS'], allow_headers="*")
def api():
    try:
        payload = json.loads(request.data.decode('utf-8'))
        table = payload['table']
    except:
        return jsonify({"status_code": 400,"error":"incorrect Request"})
    try:
        filters = payload['filters'] 
    except:
        filters = None
        
    answer = getFromTable(table,filters)
    if answer['status_code'] != 200:
        return jsonify({"status_code": 400,"error":answer['message']})
    else:
        data = answer['message']

    response = make_response(data)
    response.headers.set('Content-Type', 'application/json')
    return response
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80,debug=False)