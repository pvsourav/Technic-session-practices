<%@ page import="java.sql.*" %>
<html>
<head><title>All Feedbacks</title></head>
<body>
<h2>Feedback List</h2>
<table border="1">
  <tr><th>ID</th><th>Name</th><th>Email</th><th>Message</th></tr>
<%
  try {
    Class.forName("com.mysql.cj.jdbc.Driver");
    Connection conn = DriverManager.getConnection(
      "jdbc:mysql://localhost:3306/feedback_system", "root", "your_password");

    Statement stmt = conn.createStatement();
    ResultSet rs = stmt.executeQuery("SELECT * FROM feedbacks");

    while (rs.next()) {
%>
  <tr>
    <td><%= rs.getInt("id") %></td>
    <td><%= rs.getString("name") %></td>
    <td><%= rs.getString("email") %></td>
    <td><%= rs.getString("message") %></td>
  </tr>
<%
    }
    conn.close();
  } catch(Exception e) {
    out.println("Error: " + e.getMessage());
  }
%>
</table>
<a href="index.html">Go Back</a>
</body>
</html>
