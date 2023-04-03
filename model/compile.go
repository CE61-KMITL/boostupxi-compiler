package model

type CompileRequest struct {
	SourceCode string `json:"source_code" validate:"required"`
	QuestionID string `json:"question_id" validate:"required"`
}
