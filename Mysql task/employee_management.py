import mysql.connector
from tabulate import tabulate

def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="password@123",
        database="company"
    )

def create_table(cursor):
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS employees (
            EmpID VARCHAR(10) PRIMARY KEY,
            Name VARCHAR(50),
            Salary INT,
            Designation VARCHAR(50)
        )
    """)

def insert_initial_data(cursor, conn):
    employees = {
        "E101": {"Name": "Alice", "Salary": 55000, "Designation": "Developer"},
        "E102": {"Name": "Bob", "Salary": 60000, "Designation": "Manager"},
        "E103": {"Name": "Charlie", "Salary": 48000, "Designation": "Analyst"},
        "E104": {"Name": "David", "Salary": 70000, "Designation": "Team Lead"},
        "E105": {"Name": "Eva", "Salary": 50000, "Designation": "Tester"}
    }
    for emp_id, info in employees.items():
        cursor.execute(
            "INSERT IGNORE INTO employees (EmpID, Name, Salary, Designation) VALUES (%s, %s, %s, %s)",
            (emp_id, info["Name"], info["Salary"], info["Designation"])
        )
    conn.commit()

def add_employee(cursor, conn, emp_id, name, salary, designation):
    cursor.execute("INSERT INTO employees (EmpID, Name, Salary, Designation) VALUES (%s, %s, %s, %s)",
                   (emp_id, name, salary, designation))
    conn.commit()
    print("Employee added.")

def get_all_employees(cursor):
    cursor.execute("SELECT * FROM employees")
    rows = cursor.fetchall()
    headers = ["EmpID", "Name", "Salary", "Designation"]
    print("\nAll Employees:")
    print(tabulate(rows, headers=headers, tablefmt="pretty"))

def update_employee(cursor, conn, emp_id, field, new_value):
    if field not in ["Name", "Salary", "Designation"]:
        print("Invalid field.")
        return
    query = f"UPDATE employees SET {field} = %s WHERE EmpID = %s"
    cursor.execute(query, (new_value, emp_id))
    conn.commit()
    print("Employee updated.")

def delete_employee(cursor, conn, emp_id):
    cursor.execute("DELETE FROM employees WHERE EmpID = %s", (emp_id,))
    conn.commit()
    print("Employee deleted.")

def main():
    conn = get_connection()
    cursor = conn.cursor()

    create_table(cursor)
    insert_initial_data(cursor, conn)

    while True:
        print("\n===== Employee Management Menu =====")
        print("1. View all employees")
        print("2. Add employee")
        print("3. Update employee")
        print("4. Delete employee")
        print("5. Exit")
        choice = input("Enter your choice: ")

        try:
            if choice == '1':
                get_all_employees(cursor)
            elif choice == '2':
                eid = input("Enter EmpID: ")
                name = input("Enter Name: ")
                salary = int(input("Enter Salary: "))
                designation = input("Enter Designation: ")
                add_employee(cursor, conn, eid, name, salary, designation)
            elif choice == '3':
                eid = input("Enter EmpID: ")
                field = input("Field to update (Name/Salary/Designation): ")
                new_value = input("Enter new value: ")
                if field == "Salary":
                    new_value = int(new_value)
                update_employee(cursor, conn, eid, field, new_value)
            elif choice == '4':
                eid = input("Enter EmpID to delete: ")
                delete_employee(cursor, conn, eid)
            elif choice == '5':
                print("Exiting...")
                break
            else:
                print("Invalid choice.")
        except Exception as e:
            print("Error:", e)

    cursor.close()
    conn.close()

if __name__ == "__main__":
    main()
