package models

type FrequentKb struct {
	ID   int    `json:"fkb_id"`
	Name string `json:"name"`
	KBN  string `json:"kb_num"`
	URL  string `json:"url"`
	CC   int    `json:"cc"`
}
