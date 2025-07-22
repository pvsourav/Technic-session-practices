import java.io.*;
import java.net.*;

public class WebServer {
    public static void main(String[] args) throws IOException {
        int port = 8080;

        ServerSocket serverSocket = new ServerSocket(port);
        System.out.println("Server started at http://localhost:" + port);

        while (true) {
            Socket clientSocket = serverSocket.accept();
            handleClient(clientSocket);
        }
    }

    private static void handleClient(Socket clientSocket) {
        try (
            BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            OutputStream out = clientSocket.getOutputStream()
        ) {
            String line = in.readLine();
            if (line == null || !line.startsWith("GET")) return;

            while (!(line = in.readLine()).isEmpty());

            String html = """
                <html>
                    <head><title>Simple Java Server</title></head>
                    <body>
                        <h1>Hello from Java Web Server!</h1>
                        <p>This page is served using pure Java.</p>
                    </body>
                </html>
                """;

            String response = "HTTP/1.1 200 OK\r\n" +
                              "Content-Type: text/html\r\n" +
                              "Content-Length: " + html.getBytes().length + "\r\n" +
                              "Connection: close\r\n\r\n" +
                              html;

            out.write(response.getBytes());
            out.flush();
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        } finally {
            try {
                clientSocket.close();
            } catch (IOException e) { }
        }
    }
}
