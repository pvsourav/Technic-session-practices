import java.io.*;
import java.util.*;

public class HospitalInfo {
    public static void main(String[] args) {
        String hospitalFileName = "hospital.txt";
        String contactFileName = "contact.txt";

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(hospitalFileName))) {
            writer.write("K1 | KIMS | Trivandrum | 99567888\n");
            writer.write("M1 | Medical College | Alapuzha | 9897663344\n");
        } catch (IOException e) {
            System.out.println("Error writing to file: " + e.getMessage());
            return;
        }

        System.out.println("Hospital Names:");

        try (BufferedReader reader = new BufferedReader(new FileReader(hospitalFileName))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split("\\|");
                if (parts.length == 4) {
                    String hospitalName = parts[1].trim();
                    System.out.println(hospitalName);

                    if (hospitalName.equalsIgnoreCase("Medical College")) {
                        String contactNumber = parts[3].trim();

                        try (BufferedWriter contactWriter = new BufferedWriter(new FileWriter(contactFileName))) {
                            contactWriter.write(contactNumber);
                        }
                    }
                }
            }
        } catch (IOException e) {
            System.out.println("Error reading from file: " + e.getMessage());
            return;
        }

        System.out.println("\nContact Number of Medical College:");
        try (BufferedReader contactReader = new BufferedReader(new FileReader(contactFileName))) {
            String contact = contactReader.readLine();
            System.out.println(contact);
        } catch (IOException e) {
            System.out.println("Error reading contact file: " + e.getMessage());
        }
    }
}
