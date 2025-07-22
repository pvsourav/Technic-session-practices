package main

import (
    "fmt"
    "strings"
)

func stringOperations() {
    str := "  Welcome to the world of programming!  "
    trimmed := strings.TrimSpace(str)
    fmt.Println("Trimmed:", trimmed)

    lower := strings.ToLower(trimmed)
    fmt.Println("Lowercase:", lower)

    upper := strings.ToUpper(trimmed)
    fmt.Println("Uppercase:", upper)

    words := strings.Fields(trimmed)
    fmt.Println("Words:", words)

    replaced := strings.Replace(trimmed, "programming", "coding", 1)
    fmt.Println("Replaced:", replaced)

    contains := strings.Contains(trimmed, "world")
    fmt.Println("Contains 'world'?:", contains)

    substring := trimmed[11:22]
    fmt.Println("Substring (11:22):", substring)

    length := len(trimmed)
    fmt.Println("Length:", length)
}

func main() {
    stringOperations()
}
