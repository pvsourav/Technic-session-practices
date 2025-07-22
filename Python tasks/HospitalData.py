with open("hospital.txt", "w") as hospital_file:
    hospital_file.write("K1 | KIMS | Trivandrum | 99567888\n")
    hospital_file.write("M1 | Medical College | Alapuzha | 9897663344\n")

with open("hospital.txt", "r") as hospital_file:
    lines = hospital_file.readlines()

print("Hospital Names:")

for line in lines:
    parts = line.strip().split('|')

    if len(parts) == 4:
        hospital_name = parts[1].strip()
        print(hospital_name)
        
        if hospital_name.lower() == "medical college":
            contact_number = parts[3].strip()
            
            with open("contact.txt", "w") as contact_file:
                contact_file.write(contact_number)

print("\nContact Number of Medical College :")

with open("contact.txt", "r") as contact_file:
    contact = contact_file.read()
    print(contact)
