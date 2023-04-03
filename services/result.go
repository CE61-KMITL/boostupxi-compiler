package services

import (
	"boostupxi-compiler/models"

	"log"
	"os"
	"path/filepath"
)

func CheckResult(sourceCode string, testcases []models.TestCase) {
	// TODO: create temp directory
	if err := os.MkdirAll("./temp", 0755); err != nil {
		log.Fatalln("Failed to create temp directory")
	}

	// TODO: convert source code to file
	sourceFile := filepath.Join("./temp", "main.cpp")
	file, err := os.Create(sourceFile)

	if err != nil {
		log.Fatalln("Failed to create source file")
	}

	_, err = file.WriteString(sourceCode)

	if err != nil {
		log.Fatalln("Failed to write source code to file")
	}

	err = file.Close()

	if err != nil {
		log.Fatalln("Failed to close source file")
	}

	// TODO: compile file

	// TODO: run file with test cases

	// TODO: compare result with test cases

	// TODO: delete file

	// TODO: return result

}
