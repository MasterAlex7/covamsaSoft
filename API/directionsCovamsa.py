from flask_cors import CORS, cross_origin

import os
import sys
import backend.functionsCovamsa as callMethod

from flask import Flask, jsonify, request, url_for, Response

import json

app = Flask(__name__)
CORS(app)

###################################################################
# USUARIOS
###################################################################

@app.route('/cvm/servicioPesado', methods=['GET'])
def getServicioPesado():
    try:
        objResult = callMethod.fnGetServicioPesado()
        return jsonify(objResult)
    except Exception as e:
        print("Error Get Servicio Pesado: ",e)
        
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=9005, debug=True, threaded=True)