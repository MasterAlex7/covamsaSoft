import pymysql
import openpyxl

# Configuración de la conexión a la base de datos MySQL
dbHost = 'localhost'
dbPort = 3306
dbUser = 'root'
dbPassword = 'cvm980423k63'
dbName = 'covamsa_prov'

# Ruta del archivo Excel
archivo_excel = "c:/Users/SISTEMAS/Downloads/Gabriel servicio pesado.xlsx"

# Cargar el libro de trabajo (workbook)
libro_trabajo = openpyxl.load_workbook(archivo_excel)

# Seleccionar la hoja de trabajo
hoja_trabajo = libro_trabajo.active

# Especificar las columnas que deseas extraer
columnas_deseadas = ['C','D','E','G','I','J','K','L','M','N','O','P','Q','R']

# Especificar la fila desde la cual deseas comenzar la extracción
fila_inicial = 6  # Cambia este valor al número de fila que desees
fila_final=120

# Obtener los datos de las columnas seleccionadas desde la fila inicial
datos_excel = []

for fila in hoja_trabajo.iter_rows(min_row=fila_inicial,max_row=fila_final, values_only=True):
    datos_fila = [fila[hoja_trabajo[f"{col}1"].column - 1] for col in columnas_deseadas]
    datos_excel.append(datos_fila)

contador=0
# Mostrar los datos
#for fila in datos_excel:
#    print(fila)
#    contador+=1

print(contador)

MysqlCnx = pymysql.connect(host=dbHost,port=dbPort,
                                user=dbUser,
                                password=dbPassword,
                                db=dbName,
                                charset='utf8mb4',
                                cursorclass=pymysql.cursors.DictCursor)
cursor = MysqlCnx.cursor()

for fila in datos_excel:
    # Crear la consulta SQL de inserción
    insertar_query = f"INSERT INTO serviciopesado (GABRIEL, MONROE, GRC, Armadora, PosicionDel, PosicionTra, PosicionCab, Tipo, LongitudExp, LongitudComp, Carrera, TipoMontajeSup, DiametroSup, LongitudSup, TipoMontajeInf, DiametroInf, LongitudInf) VALUES (%s, %s, %s, %s,'0','0','0', %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    #print(insertar_query)
    # Ejecutar la consulta SQL
    cursor.execute(insertar_query, fila)

# Confirmar y cerrar la conexión
MysqlCnx.commit()
MysqlCnx.close()

# Cerrar el libro de trabajo
libro_trabajo.close()

