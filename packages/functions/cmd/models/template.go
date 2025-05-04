package models

type Template struct {
	Id    int    `json:"template_id"`
	Name  string `json:"name"`
	Value string `json:"value"`
	CC    int    `json:"cc"`
}
