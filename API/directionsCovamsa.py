from flask_cors import CORS, cross_origin

import os
import sys
import backend.functionsCovamsa as callMethod
import openpyxl

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

@app.route('/cvm/bolsasDeAireID/<ID>', methods=['GET'])
def getBolsasDeAireID(ID):
    try:
        objResult = callMethod.fnGetBolsasDeAireID(ID)
        return jsonify(objResult)
    except Exception as e:
        print("Error Get Bolsas de Aire ID: ",e)

@app.route('/cvm/addProductBA', methods=['POST'])
def addProductBA():
    try:
        GABRIEL = request.json['GABRIEL'] if ('GABRIEL' in request.json) else None
        FIRESTONE = request.json['FIRESTONE'] if ('FIRESTONE' in request.json) else None
        GOODYEAR = request.json['GOODYEAR'] if ('GOODYEAR' in request.json) else None
        CONTITECH = request.json['CONTITECH'] if ('CONTITECH' in request.json) else None
        Aplicacion1 = request.json['Aplicacion1'] if ('Aplicacion1' in request.json) else None 
        Aplicacion2 = request.json['Aplicacion2'] if ('Aplicacion2' in request.json) else None
        Aplicacion3 = request.json['Aplicacion3'] if ('Aplicacion3' in request.json) else None
        OE1 = request.json['OE1'] if ('OE1' in request.json) else None
        OE2 = request.json['OE2'] if ('OE2' in request.json) else None
        OE3 = request.json['OE3'] if ('OE3' in request.json) else None
        Tapa = request.json['Tapa'] if ('Tapa' in request.json) else None
        Membrana = request.json['Membrana'] if ('Membrana' in request.json) else None
        Piston = request.json['Piston'] if ('Piston' in request.json) else None
        inf = request.json['info'] if ('info' in request.json) else None
        objResult = callMethod.fnAddProductBA(GABRIEL,FIRESTONE,GOODYEAR,CONTITECH,Aplicacion1,Aplicacion2,Aplicacion3,OE1,OE2,OE3,Tapa,Membrana,Piston,inf)
        return jsonify(objResult)
    except Exception as e:
        print("Error Add Product BA: ",e)

@app.route('/cvm/editProductBA', methods=['PUT'])
def editProductBA():
    try:
        GABRIEL = request.json['GABRIEL'] if ('GABRIEL' in request.json) else None
        FIRESTONE = request.json['FIRESTONE'] if ('FIRESTONE' in request.json) else None
        GOODYEAR = request.json['GOODYEAR'] if ('GOODYEAR' in request.json) else None
        CONTITECH = request.json['CONTITECH'] if ('CONTITECH' in request.json) else None
        Aplicacion1 = request.json['Aplicacion1'] if ('Aplicacion1' in request.json) else None 
        Aplicacion2 = request.json['Aplicacion2'] if ('Aplicacion2' in request.json) else None
        Aplicacion3 = request.json['Aplicacion3'] if ('Aplicacion3' in request.json) else None
        OE1 = request.json['OE1'] if ('OE1' in request.json) else None
        OE2 = request.json['OE2'] if ('OE2' in request.json) else None
        OE3 = request.json['OE3'] if ('OE3' in request.json) else None
        Tapa = request.json['Tapa'] if ('Tapa' in request.json) else None
        Membrana = request.json['Membrana'] if ('Membrana' in request.json) else None
        Piston = request.json['Piston'] if ('Piston' in request.json) else None
        inf = request.json['info'] if ('info' in request.json) else None
        objResult = callMethod.fnEditProductBA(GABRIEL,FIRESTONE,GOODYEAR,CONTITECH,Aplicacion1,Aplicacion2,Aplicacion3,OE1,OE2,OE3,Tapa,Membrana,Piston,inf)
        return jsonify(objResult)
    except Exception as e:
        print("Error Edit Product BA: ",e)

@app.route('/cvm/deleteProductBA', methods=['POST'])
def deleteProductBA():
    try:
        GABRIEL = request.json['GABRIEL'] if ('GABRIEL' in request.json) else None
        objResult = callMethod.fnDeleteProductBA(GABRIEL)
        return jsonify(objResult)
    except Exception as e:
        print("Error Delete Product BA: ",e)

@app.route('/cvm/servicioLigeroID/<ID>', methods=['GET'])
def getServicioLigeroID(ID):
    try:
        objResult = callMethod.fnGetServicioLigeroID(ID)
        return jsonify(objResult)
    except Exception as e:
        print("Error Get Servicio Ligero ID: ",e)

@app.route('/cvm/addProductSL', methods=['POST'])
def addProductSL():
    try:
        MarcaAuto = request.json['MarcaAuto'] if ('MarcaAuto' in request.json) else None
        Submarca = request.json['Submarca'] if ('Submarca' in request.json) else None
        Referencia = request.json['Referencia'] if ('Referencia' in request.json) else None
        Modelo = request.json['Modelo'] if ('Modelo' in request.json) else None
        AnoInicio = request.json['AnoInicio'] if ('AnoInicio' in request.json) else None
        AnoFinal = request.json['AnoFinal'] if ('AnoFinal' in request.json) else None
        Marca = request.json['Marca'] if ('Marca' in request.json) else None
        Posicion = request.json['Posicion'] if ('Posicion' in request.json) else None
        Tipo = request.json['Tipo'] if ('Tipo' in request.json) else None
        LongExp = request.json['LongExp'] if ('LongExp' in request.json) else None
        LongComp = request.json['LongComp'] if ('LongComp' in request.json) else None
        Carrera = request.json['Carrera'] if ('Carrera' in request.json) else None
        MontSup = request.json['MontSup'] if ('MontSup' in request.json) else None
        MontInf = request.json['MontInf'] if ('MontInf' in request.json) else None
        MONROE = request.json['MONROE'] if ('MONROE' in request.json) else None
        GRC = request.json['GRC'] if ('GRC' in request.json) else None
        KYB = request.json['KYB'] if ('KYB' in request.json) else None
        BOGE = request.json['BOGE'] if ('BOGE' in request.json) else None
        info = request.json['info'] if ('info' in request.json) else None
        objResult = callMethod.fnAddProductSL(MarcaAuto,Submarca,Referencia,Modelo,AnoInicio,AnoFinal,Marca,Posicion,Tipo,LongExp,LongComp,Carrera,MontSup,MontInf,MONROE,GRC,KYB,BOGE,info)
        return jsonify(objResult)
    except Exception as e:
        print("Error Add Product SL: ",e)

@app.route('/cvm/editProductSL', methods=['PUT'])
def editProductSL():
    try:
        MarcaAuto = request.json['MarcaAuto'] if ('MarcaAuto' in request.json) else None
        Submarca = request.json['Submarca'] if ('Submarca' in request.json) else None
        Referencia = request.json['Referencia'] if ('Referencia' in request.json) else None
        Modelo = request.json['Modelo'] if ('Modelo' in request.json) else None
        AnoInicio = request.json['AnoInicio'] if ('AnoInicio' in request.json) else None
        AnoFinal = request.json['AnoFinal'] if ('AnoFinal' in request.json) else None
        Marca = request.json['Marca'] if ('Marca' in request.json) else None
        Posicion = request.json['Posicion'] if ('Posicion' in request.json) else None
        Tipo = request.json['Tipo'] if ('Tipo' in request.json) else None
        LongExp = request.json['LongExp'] if ('LongExp' in request.json) else None
        LongComp = request.json['LongComp'] if ('LongComp' in request.json) else None
        Carrera = request.json['Carrera'] if ('Carrera' in request.json) else None
        MontSup = request.json['MontSup'] if ('MontSup' in request.json) else None
        MontInf = request.json['MontInf'] if ('MontInf' in request.json) else None
        MONROE = request.json['MONROE'] if ('MONROE' in request.json) else None
        GRC = request.json['GRC'] if ('GRC' in request.json) else None
        KYB = request.json['KYB'] if ('KYB' in request.json) else None
        BOGE = request.json['BOGE'] if ('BOGE' in request.json) else None
        info = request.json['info'] if ('info' in request.json) else None
        ID = request.json['ID'] if ('ID' in request.json) else None
        objResult = callMethod.fnEditProductSL(MarcaAuto,Submarca,Referencia,Modelo,AnoInicio,AnoFinal,Marca,Posicion,Tipo,LongExp,LongComp,Carrera,
                                                MontSup,MontInf,MONROE,GRC,KYB,BOGE,info,ID)
        return jsonify(objResult)
    except Exception as e:
        print("Error Edit Product SL: ",e)

@app.route('/cvm/deleteProductSL', methods=['POST'])
def deleteProductSL():
    try:
        MarcaAuto = request.json['MarcaAuto'] if ('MarcaAuto' in request.json) else None
        Submarca = request.json['Submarca'] if ('Submarca' in request.json) else None
        Modelo = request.json['Modelo'] if ('Modelo' in request.json) else None
        Referencia = request.json['Referencia'] if ('Referencia' in request.json) else None
        objResult = callMethod.fnDeleteProductSL(MarcaAuto,Submarca,Modelo,Referencia)
        return jsonify(objResult)
    except Exception as e:
        print("Error Delete Product SL: ",e)

@app.route('/cvm/muellesID/<ID>', methods=['GET'])
def getMuellesID(ID):
    try:
        objResult = callMethod.fnGetMuellesID(ID)
        return jsonify(objResult)
    except Exception as e:
        print("Error Get Muelles ID: ",e)

@app.route('/cvm/addProductMue', methods=['POST'])
def addProductMue():
    try:
        file = request.files['file']
        file.save(file.filename)
        filename = file.filename
        objResult = callMethod.fnAddProductMue(filename)
        return jsonify(objResult)
    except Exception as e:
        print("Error Add Product Muelles: ",e)

@app.route('/cvm/editProductMue', methods=['PUT'])
def editProductMue():
    try:
        RASSINI = request.json['RASSINI'] if ('RASSINI' in request.json) else None
        MAF = request.json['MAF'] if ('MAF' in request.json) else None
        SANDOVAL = request.json['SANDOVAL'] if ('SANDOVAL' in request.json) else None
        ORIGINAL = request.json['ORIGINAL'] if ('ORIGINAL' in request.json) else None
        No = request.json['No'] if ('No' in request.json) else None
        Ancho = request.json['Ancho'] if ('Ancho' in request.json) else None
        Espesor = request.json['Espesor'] if ('Espesor' in request.json) else None
        Lfrontal = request.json['Lfrontal'] if ('Lfrontal' in request.json) else None
        Ltrasero = request.json['Ltrasero'] if ('Ltrasero' in request.json) else None
        Posicion = request.json['Posicion'] if ('Posicion' in request.json) else None
        info = request.json['info'] if ('info' in request.json) else None
        marca = request.json['marca'] if ('marca' in request.json) else None
        objResult = callMethod.fnEditProductMue(RASSINI,MAF,SANDOVAL,ORIGINAL,No,Ancho,Espesor,Lfrontal,Ltrasero,Posicion,info,marca)
        return jsonify(objResult)
    except Exception as e:
        print("Error Edit Product Muelles: ",e)

@app.route('/cvm/deleteProductMue', methods=['POST'])
def deleteProductMue():
    try:
        RASSINI = request.json['RASSINI'] if ('RASSINI' in request.json) else None
        objResult = callMethod.fnDeleteProductMue(RASSINI)
        return jsonify(objResult)
    except Exception as e:
        print("Error Delete Product Muelles: ",e)

@app.route('/cvm/tiposRefa', methods=['GET'])
def getTiposRefa():
    try:
        objResult = callMethod.fnGetTiposRefa()
        return jsonify(objResult)
    except Exception as e:
        print("Error Get Tipos Refacciones: ",e)

@app.route('/cvm/refacciones', methods=['POST'])
def getRefacciones():
    try:
        tipo = request.json['tipo'] if ('tipo' in request.json) else None
        objResult = callMethod.fnGetRefacciones(tipo)
        return jsonify(objResult)
    except Exception as e:
        print("Error Get Refacciones: ",e)

@app.route('/cvm/refaccionesInfo', methods=['POST'])
def postRefacciones():
    try:
        ID = request.json['ID'] if ('ID' in request.json) else None
        info = request.json['info'] if ('info' in request.json) else None
        objResult = callMethod.fnPostRefacciones(ID,info)
        return jsonify(objResult)
    except Exception as e:
        print("Error Post Refacciones: ",e)

@app.route('/cvm/refaccionesID/<ID>', methods=['GET'])
def getRefaccionesID(ID):
    try:
        objResult = callMethod.fnGetRefaccionesID(ID)
        return jsonify(objResult)
    except Exception as e:
        print("Error Get Refacciones ID: ",e)

@app.route('/cvm/addProductRefa', methods=['POST'])
def addProductRefa():
    try:
        file = request.files['file']
        file.save(file.filename)
        filename = file.filename
        objResult = callMethod.fnAddProductRefa(filename)
        return jsonify(objResult)
    except Exception as e:
        print("Error Add Product Refacciones: ",e)

@app.route('/cvm/editProductRefa', methods=['PUT'])
def editProductRefa():
    try:
        ID = request.json['ID'] if ('ID' in request.json) else None
        idModelo = request.json['idModelo'] if ('idModelo' in request.json) else None
        Descripcion = request.json['Descripcion'] if ('Descripcion' in request.json) else None
        Tipo = request.json['Tipo'] if ('Tipo' in request.json) else None
        TipoForma = request.json['TipoForma'] if ('TipoForma' in request.json) else None
        Unidad = request.json['Unidad'] if ('Unidad' in request.json) else None
        Modelo = request.json['Modelo'] if ('Modelo' in request.json) else None
        Anio = request.json['Anio'] if ('Anio' in request.json) else None
        Posicion = request.json['Posicion'] if ('Posicion' in request.json) else None
        DiametroInt = request.json['DiametroInt'] if ('DiametroInt' in request.json) else None
        DiametroExt = request.json['DiametroExt'] if ('DiametroExt' in request.json) else None
        Largo = request.json['Largo'] if ('Largo' in request.json) else None
        LargoTot = request.json['LargoTot'] if ('LargoTot' in request.json) else None
        info = request.json['info'] if ('info' in request.json) else None
        objResult = callMethod.fnEditProductRefa(ID,idModelo,Descripcion,Tipo,TipoForma,Unidad,Modelo,Anio,Posicion,DiametroInt,DiametroExt,Largo,LargoTot,info)
        return jsonify(objResult)
    except Exception as e:
        print("Error Edit Product Refacciones: ",e)

@app.route('/cvm/deleteProductRefa', methods=['POST'])
def deleteProductRefa():
    try:
        ID = request.json['ID'] if ('ID' in request.json) else None
        objResult = callMethod.fnDeleteProductRefa(ID)
        return jsonify(objResult)
    except Exception as e:
        print("Error Delete Product Refacciones: ",e)

###################################################################

@app.route('/cvm/nuevoCatalogoPrecios/<table>', methods=['POST'])
def nuevoCatalogo(table):
    try:
        file = request.files['file']
        file.save(file.filename)
        filename = file.filename
        objResult = callMethod.fnPostNuevoCatalogo(filename,table)
        return jsonify(objResult)
    except Exception as e:
        print("Error Insertar Archivo: ",e)

###################################################################
        
@app.route('/cvm/getTornilleria/<idCovamsa>', methods=['GET'])
def getTornilleria(idCovamsa):
    try:
        objResult = callMethod.fnGetTornilleria(idCovamsa)
        return jsonify(objResult)
    except Exception as e:
        print("Error Get Tornilleria: ",e)

@app.route('/cvm/getProvedores/<tipoProv>', methods=['GET'])
def getProvedores(tipoProv):
    try:
        objResult = callMethod.fnGetProvedores(tipoProv)
        return jsonify(objResult)
    except Exception as e:
        print("Error Get Provedores Herramientas: ",e)

@app.route('/cvm/getProductoProv', methods=['POST'])
def getProductoProv():
    try:
        tabla = request.json['tabla'] if ('tabla' in request.json) else None
        clave = request.json['clave'] if ('clave' in request.json) else None
        objResult = callMethod.fnGetProductoProv(tabla,clave)
        return jsonify(objResult)
    except Exception as e:
        print("Error Get Producto Provedor: ",e)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=9005, debug=True, threaded=True)