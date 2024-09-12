import os
import mysql.connector
from flask import Flask


app = Flask(__name__)

app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST', 'localhost')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER', 'root')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD', 'h74185296300.')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB', 'webDatabase')

@app.route('/')
def index():
    db = mysql.connector.connect(
        host=app.config['MYSQL_HOST'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        database=app.config['MYSQL_DB']
    )
    cursor = db.cursor()
    cursor.execute('SELECT VERSION()')
    version = cursor.fetchone()
    return f'MySQL versionz: {version[0]}'

if __name__ == '__main__':
    app.run(host='0.0.0.0')
