employees = {
    "E101": {"Name": "Alice", "Salary": 55000, "Designation": "Developer"},
    "E102": {"Name": "Bob", "Salary": 60000, "Designation": "Manager"},
    "E103": {"Name": "Charlie", "Salary": 48000, "Designation": "Analyst"},
    "E104": {"Name": "David", "Salary": 70000, "Designation": "Team Lead"},
    "E105": {"Name": "Eva", "Salary": 50000, "Designation": "Tester"}
}

sorted_employees = dict(sorted(employees.items(), key=lambda item: item[1]['Salary'], reverse=True))

last_key = list(sorted_employees.keys())[-1]

sorted_employees.pop(last_key)

print("Remaining Employees after removing the one with lowest salary:\n")

for emp_id, details in sorted_employees.items():
    print(f"Employee ID: {emp_id}")
    print(f"Name : {details['Name']}")
    print(f"Salary : {details['Salary']}")
    print(f"Designation: {details['Designation']}")
    print("-" * 30)

print(sorted_employees)
