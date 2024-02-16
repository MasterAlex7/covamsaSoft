import pymysql
import openpyxl

# Configuración de la conexión a la base de datos MySQL
dbHost = 'localhost'
dbPort = 3306
dbUser = 'root'
dbPassword = 'cvm980423k63'
dbName = 'covamsa_prov'

MysqlCnx = pymysql.connect(host=dbHost,port=dbPort,
                                user=dbUser,
                                password=dbPassword,
                                db=dbName,
                                charset='utf8mb4',
                                cursorclass=pymysql.cursors.DictCursor)
cursor = MysqlCnx.cursor()

# Ruta del archivo Excel
archivo_excel = "c:/Users/SISTEMAS/Downloads/ProveTornilleria/tornimaster.xlsx"

# Cargar el libro de trabajo (workbook)
libro_trabajo = openpyxl.load_workbook(archivo_excel)

# Seleccionar la hoja de trabajo
nombre_hoja = "Sheet"
hoja_trabajo = libro_trabajo[nombre_hoja]

# Especificar las columnas que deseas extraer
columnas_deseadas = ['J']

# Especificar la fila desde la cual deseas comenzar la extracción
fila_inicial = 2  # Cambia este valor al número de fila que desees
fila_final = 3378

# Obtener los datos de las columnas seleccionadas desde la fila inicial
datos_excel = []
cont=1

def comprobar(idCovamsa,cont):
    if(idCovamsa == None):
        return True
    else:
        insertar_query = f"select idCovamsa from tornilleriaysoporteria where idCovamsa = '{idCovamsa}'"
        cursor.execute(insertar_query)
        resultado = cursor.fetchall()
        if len(resultado) == 0:
            print("No existe el idCovamsa: "+idCovamsa + " en la fila: "+str(cont))
        else:
            return True

for fila in hoja_trabajo.iter_rows(min_row=fila_inicial,max_row=fila_final, values_only=True):
    datos_fila = [fila[hoja_trabajo[f"{col}1"].column - 1] for col in columnas_deseadas]
    cont=cont+1
    comprobar(datos_fila[0],cont)

MysqlCnx.close()

# Cerrar el libro de trabajo
libro_trabajo.close()