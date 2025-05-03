package models

type Link struct {
	Id   int    `json:"link_id"`
	Name string `json:"name"`
	URL  string `json:"url"`
	CC   int    `json:"cc"`
}
