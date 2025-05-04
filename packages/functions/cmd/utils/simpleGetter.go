package utils

import (
	"database/sql"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"os"

	_ "github.com/lib/pq"
)

const (
	POSTGRES_PORT     = 5432
	POSTGRES_PORT_DEV = 5433
)

var (
	POSTGRES_USERNAME = os.Getenv("POSTGRES_USERNAME")
	POSTGRES_PASSWORD = os.Getenv("POSTGRES_PASSWORD")
	POSTGRES_DATABASE = os.Getenv("POSTGRES_DATABASE")
	POSTGRES_HOST     = os.Getenv("POSTGRES_HOST")
	SST_STAGE         = os.Getenv("SST_STAGE")
)

func Get(stmt string) (events.APIGatewayProxyResponse, error) {
	// connection string
	var psqlconn string
	psqlconn = fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s", POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_DATABASE)
	if SST_STAGE == "dev" {
		psqlconn = fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", POSTGRES_HOST, POSTGRES_PORT_DEV, POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_DATABASE)
	}

	// open database
	db, err := sql.Open("postgres", psqlconn)
	if err != nil {
		return APIServerError(err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		return APIServerError(err)
	}
	var jsonData []byte

	if err := db.QueryRow(stmt).Scan(&jsonData); err != nil {
		if err.Error() == "pq: relation \"links\" does not exist" {
			return APIServerError(fmt.Errorf("%w  database: %s", err, POSTGRES_DATABASE))
		}
		return APIServerError(err)
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       string(jsonData),
		Headers:    map[string]string{"Content-Type": "application/json"},
	}, nil
}
