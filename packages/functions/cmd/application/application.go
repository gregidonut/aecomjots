package application

import (
	"database/sql"

	"github.com/gregidonut/aecomjots/packages/functions/cmd/db"
)

type Application struct {
	DB *sql.DB
}

func New() (*Application, error) {
	var payload Application
	d, err := db.New()
	if err != nil {
		return nil, err
	}

	payload.DB = d

	return &payload, nil
}

func (a *Application) GetDB() *sql.DB {
	return a.DB
}
