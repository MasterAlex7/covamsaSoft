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

@app.route('/cvm/servicioPesadoID/<ID>', methods=['GET'])
def getServicioPesadoID(ID):
    try:
        objResult = callMethod.fnGetServicioPesadoID(ID)
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

@app.route('/cvm/servicioLigero', methods=['GET'])
def getServicioLigero():
    try:
        objResult = callMethod.fnGetServicioLigero()
        return jsonify(objResult)
    except Exception as e:
        print("Error Get Servicio Ligero: ",e)

@app.route('/cvm/servicioLigeroInfo', methods=['POST'])
def postServicioLigero():
    try:
        ID = request.json['ID'] if ('ID' in request.json) else None
        info = request.json['info'] if ('info' in request.json) else None
        objResult = callMethod.fnPostServicioLigero(ID,info)
        return jsonify(objResult)
    except Exception as e:
        print("Error Post Servicio Ligero: ",e)

@app.route('/cvm/muelles', methods=['POST'])
def getMuelles():
    try:
        marca = request.json['marca'] if ('marca' in request.json) else None
        objResult = callMethod.fnGetMuelles(marca)
        return jsonify(objResult)
    except Exception as e:
        print("Error Get Muelles: ",e)

@app.route('/cvm/muellesInfo', methods=['POST'])
def postMuelles():
    try:
        ID = request.json['ID'] if ('ID' in request.json) else None
        info = request.json['info'] if ('info' in request.json) else None
        objResult = callMethod.fnPostMuelles(ID,info)
        return jsonify(objResult)
    except Exception as e:
        print("Error Post Servicio Ligero: ",e)

@app.route('/cvm/muellesMarcas', methods=['GET'])
def getMuellesMarcas():
    try:
        objResult = callMethod.fnGetMuellesMarcas()
        return jsonify(objResult)
    except Exception as e:
        print("Error Get Muelles Marcas: ",e)

@app.route('/cvm/columnasTabla/<tabla>', methods=['GET'])
def getColumns(tabla):
    try:
        objResult = callMethod.fnGetColumns(tabla)
        return jsonify(objResult)
    except Exception as e:
        print("Error Get Columns: ",e)

@app.route('/cvm/addProductSP', methods=['POST'])
def addProductSP():
    try:
        GABRIEL = request.json['GABRIEL'] if ('GABRIEL' in request.json) else None
        MONROE = request.json['MONROE'] if ('MONROE' in request.json) else None
        GRC = request.json['GRC'] if ('GRC' in request.json) else None
        Armadora = request.json['Armadora'] if ('Armadora' in request.json) else None
        Posicion = request.json['Posicion'] if ('Posicion' in request.json) else None
        Tipo = request.json['Tipo'] if ('Tipo' in request.json) else None
        LongitudExp = request.json['LongitudExp'] if ('LongitudExp' in request.json) else None
        LongitudComp = request.json['LongitudComp'] if ('LongitudComp' in request.json) else None
        Carrera = request.json['Carrera'] if ('Carrera' in request.json) else None
        TipoMontajeSup = request.json['TipoMontajeSup'] if ('TipoMontajeSup' in request.json) else None
        DiametroSup = request.json['DiametroSup'] if ('DiametroSup' in request.json) else None
        LongitudSup = request.json['LongitudSup'] if ('LongitudSup' in request.json) else None
        TipoMontajeInf = request.json['TipoMontajeInf'] if ('TipoMontajeInf' in request.json) else None
        DiametroInf = request.json['DiametroInf'] if ('DiametroInf' in request.json) else None
        LongitudInf = request.json['LongitudInf'] if ('LongitudInf' in request.json) else None
        info = request.json['info'] if ('info' in request.json) else None
        objResult = callMethod.fnAddProductSP(GABRIEL,MONROE,GRC,Armadora,Posicion,Tipo,
                                            LongitudExp,LongitudComp,Carrera,TipoMontajeSup,DiametroSup,LongitudSup,TipoMontajeInf,DiametroInf,LongitudInf,info)
        return jsonify(objResult)
    except Exception as e:
        print("Error Add Product SP: ",e)

@app.route('/cvm/editProductSP', methods=['PUT'])
def editProductSP():
    try:
        GABRIEL = request.json['GABRIEL'] if ('GABRIEL' in request.json) else None
        MONROE = request.json['MONROE'] if ('MONROE' in request.json) else None
        GRC = request.json['GRC'] if ('GRC' in request.json) else None
        Armadora = request.json['Armadora'] if ('Armadora' in request.json) else None
        Posicion = request.json['Posicion'] if ('Posicion' in request.json) else None
        Tipo = request.json['Tipo'] if ('Tipo' in request.json) else None
        LongitudExp = request.json['LongitudExp'] if ('LongitudExp' in request.json) else None
        LongitudComp = request.json['LongitudComp'] if ('LongitudComp' in request.json) else None
        Carrera = request.json['Carrera'] if ('Carrera' in request.json) else None
        TipoMontajeSup = request.json['TipoMontajeSup'] if ('TipoMontajeSup' in request.json) else None
        DiametroSup = request.json['DiametroSup'] if ('DiametroSup' in request.json) else None
        LongitudSup = request.json['LongitudSup'] if ('LongitudSup' in request.json) else None
        TipoMontajeInf = request.json['TipoMontajeInf'] if ('TipoMontajeInf' in request.json) else None
        DiametroInf = request.json['DiametroInf'] if ('DiametroInf' in request.json) else None
        LongitudInf = request.json['LongitudInf'] if ('LongitudInf' in request.json) else None
        info = request.json['info'] if ('info' in request.json) else None
        objResult = callMethod.fnEditProductSP(GABRIEL,MONROE,GRC,Armadora,Posicion,Tipo,
                                            LongitudExp,LongitudComp,Carrera,TipoMontajeSup,DiametroSup,LongitudSup,TipoMontajeInf,DiametroInf,LongitudInf,info)
        return jsonify(objResult)
    except Exception as e:
        print("Error Add Product SP: ",e)

@app.route('/cvm/deleteProductSP', methods=['POST'])
def deleteProductSP():
    try:
        GABRIEL = request.json['GABRIEL'] if ('GABRIEL' in request.json) else None
        objResult = callMethod.fnDeleteProductSP(GABRIEL)
        return jsonify(objResult)
    except Exception as e:
        print("Error Delete Product SP: ",e)

        
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=9005, debug=True, threaded=True)