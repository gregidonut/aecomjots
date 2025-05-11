// utils/response.go
package utils

import (
	"encoding/json"

	"github.com/aws/aws-lambda-go/events"
)

type errorResponse struct {
	Error string `json:"error"`
}

func APIServerError(err error) (events.APIGatewayProxyResponse, error) {
	body, _ := json.Marshal(errorResponse{Error: err.Error()})
	return events.APIGatewayProxyResponse{
		StatusCode: 500,
		Body:       string(body),
	}, err
}

func APIClientError(status int, err error) (events.APIGatewayProxyResponse, error) {
	body, _ := json.Marshal(errorResponse{Error: err.Error()})
	return events.APIGatewayProxyResponse{
		StatusCode: status,
		Body:       string(body),
	}, nil
}
