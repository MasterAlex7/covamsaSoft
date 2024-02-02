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

@app.route('/cvm/servicioPesadoInfo', methods=['POST'])
def postServicioPesado():
    try:
        idGabriel = request.json['idGabriel'] if ('idGabriel' in request.json) else None
        info = request.json['info'] if ('info' in request.json) else None
        objResult = callMethod.fnPostServicioPesado(idGabriel,info)
        return jsonify(objResult)
    except Exception as e:
        print("Error Post Servicio Pesado: ",e)

@app.route('/cvm/login', methods=['POST'])
def postLogin():
    try:
        usuario = request.json['usuario'] if ('usuario' in request.json) else None
        password = request.json['password'] if ('password' in request.json) else None
        objResult = callMethod.fnPostLogin(usuario,password)
        return jsonify(objResult)
    except Exception as e:
        print("Error Post Servicio Pesado: ",e)

@app.route('/cvm/bolsasDeAire', methods=['GET'])
def getBolsasDeAire():
    try:
        objResult = callMethod.fnGetBolsasDeAire()
        return jsonify(objResult)
    except Exception as e:
        print("Error Get Bolsas de Aire: ",e)

@app.route('/cvm/bolsasDeAireInfo', methods=['POST'])
def postBolsasDeAire():
    try:
        idGabriel = request.json['idGabriel'] if ('idGabriel' in request.json) else None
        info = request.json['info'] if ('info' in request.json) else None
        objResult = callMethod.fnPostBolsasDeAire(idGabriel,info)
        return jsonify(objResult)
    except Exception as e:
        print("Error Post Bolsas de Aire: ",e)
        
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=9005, debug=True, threaded=True)