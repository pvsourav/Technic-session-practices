import mysql.connector

def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",         
        password="password@123", 
        database="company"
    )