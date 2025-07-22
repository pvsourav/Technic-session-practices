import java.sql.*;
import java.util.Scanner;

public class EmployeeManagement {

    private static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(
            "jdbc:mysql://localhost:3306/company",
            "root",
            "password@123"
        );
    }

    private static void createTable(Connection conn) throws SQLException {
        String sql = "CREATE TABLE IF NOT EXISTS employees (" +
                     "EmpID VARCHAR(10) PRIMARY KEY," +
                     "Name VARCHAR(50)," +
                     "Salary INT," +
                     "Designation VARCHAR(50))";
        Statement stmt = conn.createStatement();
        stmt.execute(sql);
    }

    private static void insertInitialData(Connection conn) throws SQLException {
        String sql = "INSERT IGNORE INTO employees (EmpID, Name, Salary, Designation) VALUES (?, ?, ?, ?)";
        PreparedStatement ps = conn.prepareStatement(sql);

        Object[][] employees = {
            {"E101", "Alice", 55000, "Developer"},
            {"E102", "Bob", 60000, "Manager"},
            {"E103", "Charlie", 48000, "Analyst"},
            {"E104", "David", 70000, "Team Lead"},
            {"E105", "Eva", 50000, "Tester"}
        };

        for (Object[] emp : employees) {
            ps.setString(1, (String) emp[0]);
            ps.setString(2, (String) emp[1]);
            ps.setInt(3, (int) emp[2]);
            ps.setString(4, (String) emp[3]);
            ps.executeUpdate();
        }
    }

    private static void getAllEmployees(Connection conn) throws SQLException {
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery("SELECT * FROM employees");

        System.out.printf("\n%-10s %-15s %-10s %-15s\n", "EmpID", "Name", "Salary", "Designation");
        System.out.println("------------------------------------------------------------");
        while (rs.next()) {
            System.out.printf("%-10s %-15s %-10d %-15s\n",
                rs.getString("EmpID"),
                rs.getString("Name"),
                rs.getInt("Salary"),
                rs.getString("Designation"));
        }
    }

    private static void addEmployee(Connection conn, Scanner scanner) throws SQLException {
        System.out.print("Enter EmpID: ");
        String empId = scanner.next();
        scanner.nextLine(); // consume newline
        System.out.print("Enter Name: ");
        String name = scanner.nextLine();
        System.out.print("Enter Salary: ");
        int salary = scanner.nextInt();
        scanner.nextLine(); // consume newline
        System.out.print("Enter Designation: ");
        String designation = scanner.nextLine();

        String sql = "INSERT INTO employees (EmpID, Name, Salary, Designation) VALUES (?, ?, ?, ?)";
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setString(1, empId);
        ps.setString(2, name);
        ps.setInt(3, salary);
        ps.setString(4, designation);
        ps.executeUpdate();
        System.out.println("Employee added.");
    }

    private static void updateEmployee(Connection conn, Scanner scanner) throws SQLException {
        System.out.print("Enter EmpID: ");
        String empId = scanner.next();

        System.out.print("Field to update (Name/Salary/Designation): ");
        String field = scanner.next();

        if (!field.equals("Name") && !field.equals("Salary") && !field.equals("Designation")) {
            System.out.println("Invalid field.");
            return;
        }

        System.out.print("Enter new value: ");
        scanner.nextLine();
        String newValue = scanner.nextLine();

        String sql = "UPDATE employees SET " + field + " = ? WHERE EmpID = ?";
        PreparedStatement ps = conn.prepareStatement(sql);
        if (field.equals("Salary")) {
            ps.setInt(1, Integer.parseInt(newValue));
        } else {
            ps.setString(1, newValue);
        }
        ps.setString(2, empId);
        int rows = ps.executeUpdate();
        if (rows > 0) {
            System.out.println("Employee updated.");
        } else {
            System.out.println("Employee not found.");
        }
    }

    private static void deleteEmployee(Connection conn, Scanner scanner) throws SQLException {
        System.out.print("Enter EmpID to delete: ");
        String empId = scanner.next();

        String sql = "DELETE FROM employees WHERE EmpID = ?";
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setString(1, empId);
        int rows = ps.executeUpdate();
        if (rows > 0) {
            System.out.println("Employee deleted.");
        } else {
            System.out.println("Employee not found.");
        }
    }

    public static void main(String[] args) {
        try (Connection conn = getConnection(); Scanner scanner = new Scanner(System.in)) {
            createTable(conn);
            insertInitialData(conn);

            while (true) {
                System.out.println("\n===== Employee Management Menu =====");
                System.out.println("1. View all employees");
                System.out.println("2. Add employee");
                System.out.println("3. Update employee");
                System.out.println("4. Delete employee");
                System.out.println("5. Exit");
                System.out.print("Enter your choice: ");
                String choice = scanner.next();

                switch (choice) {
                    case "1":
                        getAllEmployees(conn);
                        break;
                    case "2":
                        addEmployee(conn, scanner);
                        break;
                    case "3":
                        updateEmployee(conn, scanner);
                        break;
                    case "4":
                        deleteEmployee(conn, scanner);
                        break;
                    case "5":
                        System.out.println("Exiting...");
                        return;
                    default:
                        System.out.println("Invalid choice.");
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
