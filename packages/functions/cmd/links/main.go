package main

import (
	"context"
	"database/sql"
	"fmt"
	"os"

	"github.com/gregidonut/aecomjots/packages/functions/cmd/utils"

	_ "github.com/lib/pq"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
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

func handler(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	// connection string
	var psqlconn string
	psqlconn = fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s", POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_DATABASE)
	if SST_STAGE == "dev" {
		psqlconn = fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", POSTGRES_HOST, POSTGRES_PORT_DEV, POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_DATABASE)
	}

	// open database
	db, err := sql.Open("postgres", psqlconn)
	if err != nil {
		return utils.APIServerError(err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		return utils.APIServerError(err)
	}
	var jsonData []byte

	stmt := `
SELECT json_agg(row_to_json(t))
FROM (
  SELECT name, url, cc FROM links
) t;
`

	if err := db.QueryRow(stmt).Scan(&jsonData); err != nil {
		return utils.APIServerError(err)
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       string(jsonData),
		Headers:    map[string]string{"Content-Type": "application/json"},
	}, nil
}

func main() {
	lambda.Start(handler)
}
