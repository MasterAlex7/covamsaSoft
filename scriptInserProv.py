import pymysql
import openpyxl

# Configuración de la conexión a la base de datos MySQL
dbHost = 'localhost'
dbPort = 3306
dbUser = 'root'
dbPassword = 'cvm980423k63'
dbName = 'covamsa_prov'

archivo_excel = "c:/Users/SISTEMAS/Downloads/Cotizadores Estandarizados/CHAMPION.xlsx"

libro_trabajo = openpyxl.load_workbook(archivo_excel)

nombre_hoja = "Hoja1"
hoja_trabajo = libro_trabajo[nombre_hoja]

columnas_deseadas = ['C', 'D', 'E', 'F', 'G', 'H']

fila_inicial = 3
fila_final = 6212

datos_excel = []
contador=1

for fila in hoja_trabajo.iter_rows(min_row=fila_inicial,max_row=fila_final, values_only=True):
    datos_fila = [fila[hoja_trabajo[f"{col}1"].column - 1] for col in columnas_deseadas]
    #print(datos_fila)
    #datos_fila[2] = datos_fila[2][1:]
    #print(datos_fila)
    datos_excel.append(datos_fila)

MysqlCnx = pymysql.connect(host=dbHost,port=dbPort,
                                user=dbUser,
                                password=dbPassword,
                                db=dbName,
                                charset='utf8mb4',
                                cursorclass=pymysql.cursors.DictCursor)
cursor = MysqlCnx.cursor()

for fila in datos_excel:
    insertar_query = f"INSERT INTO championprov (CLAVE, Descripcion, PzaCaja, Descuento, Costo, PrecioLista) VALUES (%s, %s, %s, %s, %s, %s)"
    #print(insertar_query)
    print(insertar_query, fila)
    contador+=1
    print(contador)
    cursor.execute(insertar_query, fila)

MysqlCnx.commit()
MysqlCnx.close()

libro_trabajo.close()