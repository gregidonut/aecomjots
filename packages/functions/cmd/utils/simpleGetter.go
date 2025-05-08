package utils

import (
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/gregidonut/aecomjots/packages/functions/cmd/appinterface"
)

func Get(app appinterface.App,
	stmt string,
) (events.APIGatewayProxyResponse, error) {
	var jsonData []byte

	if err := app.GetDB().QueryRow(stmt).Scan(&jsonData); err != nil {
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
