package db

import (
	"database/sql"
	"fmt"

	"github.com/gregidonut/aecomjots/packages/functions/cmd/utils"
	_ "github.com/lib/pq"
)

func New() (*sql.DB, error) {
	var psqlconn string
	psqlconn = fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s", utils.POSTGRES_HOST, utils.POSTGRES_PORT, utils.POSTGRES_USERNAME, utils.POSTGRES_PASSWORD, utils.POSTGRES_DATABASE)
	if utils.SST_STAGE == "dev" {
		psqlconn = fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", utils.POSTGRES_HOST, utils.POSTGRES_PORT_DEV, utils.POSTGRES_USERNAME, utils.POSTGRES_PASSWORD, utils.POSTGRES_DATABASE)
	}

	// open database
	db, err := sql.Open("postgres", psqlconn)
	if err != nil {
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		return nil, err
	}
	return db, nil
}
