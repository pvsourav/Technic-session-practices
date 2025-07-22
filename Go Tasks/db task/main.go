package main

import (
    "database/sql"
    "fmt"
    "log"
    "net/http"

    _ "github.com/go-sql-driver/mysql"
)



func main() {
    db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/feedback_db")
    if err != nil {
        log.Fatal("Failed to connect to database:", err)
    }
    defer db.Close()

    http.HandleFunc("/submit", func(w http.ResponseWriter, r *http.Request) {
        if r.Method != http.MethodPost {
            http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
            return
        }

        name := r.FormValue("name")
        email := r.FormValue("email")
        message := r.FormValue("message")

        insertStmt := `INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)`
        _, err := db.Exec(insertStmt, name, email, message)
        if err != nil {
            http.Error(w, "Database error: "+err.Error(), http.StatusInternalServerError)
            return
        }

        fmt.Fprintf(w, "Feedback submitted successfully!")
    })

    fmt.Println("Server started at http://localhost:8080")
    http.ListenAndServe(":8080", nil)
}
