package utils

import "regexp"

func CommentStripped(sourceCode string) string {
	re := regexp.MustCompile("(?s)//.*?\n|/\\*.*?\\*/")
	sourceCode = re.ReplaceAllString(sourceCode, "")
	return sourceCode
}
