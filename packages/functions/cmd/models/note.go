package models

type NoteTop struct {
	Name              string `json:"name"`
	CallBackN         string `json:"callback_n"`
	BestContactTime   string `json:"best_contact_time"`
	Location          string `json:"location"`
	AffectedUserCount int    `json:"affected_user_count"`
	Issue             string `json:"issue"`
}
