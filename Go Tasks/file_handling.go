package main

import (
	"fmt"
	"io"
	"os"
)

func handleFileOperations() {

	os.WriteFile("original.txt", []byte("Hello, this is the original file.\n"), 0644)

	file, _ := os.OpenFile("original.txt", os.O_APPEND|os.O_WRONLY, 0644)
	file.WriteString("Appended line here.\n")
	file.Close()

	data, _ := os.ReadFile("original.txt")
	fmt.Println("Content of original.txt:\n" + string(data))

	src, _ := os.Open("original.txt")
	defer src.Close()

	dst, _ := os.Create("copy.txt")
	defer dst.Close()

	io.Copy(dst, src)
	fmt.Println("File copied to copy.txt")
}

func main() {
	handleFileOperations()
}
