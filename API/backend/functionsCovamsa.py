from flask import Flask, jsonify, request, Response

import os
from os import path
import base64
import pymysql.cursors

import base64

import json
import sys
import copy

import time
import datetime

strMysqluUser = "root"
strMysqlHost="localhost"
strMysqlPort=3306
strMysqlPassword="cvm980423k63"
strMysqlDB="covamsa_prov"

def fnGetServicioPesado():
	try:
		MysqlCnx = pymysql.connect(host=strMysqlHost,
						port=strMysqlPort,
						user=strMysqluUser,
						password=strMysqlPassword,
						db=strMysqlDB,
						charset='utf8mb4',
						cursorclass=pymysql.cursors.DictCursor)
		cursor = MysqlCnx.cursor()
		cursor.callproc('getServicioPesado')
		response = cursor.fetchall()
		result=[]
		for row in response:
			aux=""
			if row['PosicionDel'] == 1 and row['PosicionTra'] == 1 and row['PosicionCab'] == 1:
				aux="Del Tra Cab"
			elif row['PosicionDel'] == 1 and row['PosicionTra'] == 1 and row['PosicionCab'] == 0:
				aux="Del Tra"
			elif row['PosicionDel'] == 1 and row['PosicionTra'] == 0 and row['PosicionCab'] == 1:
				aux="Del Cab"
			elif row['PosicionDel'] == 1 and row['PosicionTra'] == 0 and row['PosicionCab'] == 0:
				aux="Del"
			elif row['PosicionDel'] == 0 and row['PosicionTra'] == 1 and row['PosicionCab'] == 1:
				aux="Tra Cab"
			elif row['PosicionDel'] == 0 and row['PosicionTra'] == 1 and row['PosicionCab'] == 0:
				aux="Tra"
			elif row['PosicionDel'] == 0 and row['PosicionTra'] == 0 and row['PosicionCab'] == 1:
				aux="Cab"
			elif row['PosicionDel'] == 0 and row['PosicionTra'] == 0 and row['PosicionCab'] == 0:
				aux="Ninguna"

			if(row['TipoMontajeInf'] == "A"):
				auxInf="Anillo"
			elif(row['TipoMontajeInf'] == "AB"):
				auxInf="Anillo - Buje"
			elif(row['TipoMontajeInf'] == "ABC"):
				auxInf="Anillo - Buje - Camisa"
			elif(row['TipoMontajeInf'] == "P"):
				auxInf="Perno"
			elif(row['TipoMontajeInf'] == "ATB"):
				auxInf="Anillo - Buje Trapezoidal"
			
			if(row['TipoMontajeSup'] == "A"):
				auxSup="Anillo"
			elif(row['TipoMontajeSup'] == "AB"):
				auxSup="Anillo - Buje"
			elif(row['TipoMontajeSup'] == "ABC"):
				auxSup="Anillo - Buje - Camisa"
			elif(row['TipoMontajeSup'] == "P"):
				auxSup="Perno"
			elif(row['TipoMontajeSup'] == "ATB"):
				auxSup="Anillo - Buje Trapezoidal"
			obj={
				'ID': row['ID'],
				'GABRIEL': row['GABRIEL'],
				'MONROE': row['MONROE'], 
				'GRC': row['GRC'], 
				'Armadora': row['Armadora'], 
				'Posicion': aux, 
				'Tipo': row['Tipo'], 
				'LongitudExp': row['LongitudExp'], 
				'LongitudComp': row['LongitudComp'], 
				'Carrera': row['Carrera'], 
				'TipoMontajeSup': auxSup, 
				'DiametroSup': row['DiametroSup'], 
				'LongitudSup': row['LongitudSup'], 
				'TipoMontajeInf': auxInf, 
				'DiametroInf': row['DiametroInf'], 
				'LongitudInf': row['LongitudInf'],
				"info": row['info']
			}
			result.append(obj)

		if result:
			#print(result)
			return {'intStatus':200, 'strAnswer': result}
		else:
			return {'intStatus':200, 'strAnswer': 'No hay nada'}
	except Exception as e:
		return {'intStatus':500, 'strAnswer': str(e)}
	finally:
		MysqlCnx.close()

def fnPostServicioPesado(idGabriel,info):
	try:
		MysqlCnx = pymysql.connect(host=strMysqlHost,
						port=strMysqlPort,
						user=strMysqluUser,
						password=strMysqlPassword,
						db=strMysqlDB,
						charset='utf8mb4',
						cursorclass=pymysql.cursors.DictCursor)
		cursor = MysqlCnx.cursor()
		params = (
			idGabriel,
			info
		)
		cursor.callproc('postServicioPesadoInfo',params)
		MysqlCnx.commit()

		return {'intStatus':200, 'strAnswer': "Se ha guardado la informacion correctamente."}
	except Exception as e:
		return {'intStatus':500, 'strAnswer': str(e)}
	finally:
		MysqlCnx.close()

def fnPostLogin(usuario,password):
	try:
		MysqlCnx = pymysql.connect(host=strMysqlHost,
						port=strMysqlPort,
						user=strMysqluUser,
						password=strMysqlPassword,
						db=strMysqlDB,
						charset='utf8mb4',
						cursorclass=pymysql.cursors.DictCursor)
		cursor = MysqlCnx.cursor()
		params = (
			usuario,
			password
		)
		cursor.callproc('getLogin',params)
		response = cursor.fetchall()
		print(response)
		if response:
			#print(result)
			return {'intStatus':200, 'strAnswer': usuario}
		else:
			return {'intStatus':202, 'strAnswer': 'Credenciales incorrectas.'}
	except Exception as e:
		return {'intStatus':500, 'strAnswer': str(e)}
	finally:
		MysqlCnx.close()
		
if __name__ == '__main__':
    fnGetServicioPesado()