package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/gregidonut/aecomjots/packages/functions/cmd/application"
	"github.com/gregidonut/aecomjots/packages/functions/cmd/models"
	"github.com/gregidonut/aecomjots/packages/functions/cmd/utils"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	if event.HTTPMethod != "POST" {
		return utils.APIClientError(http.StatusMethodNotAllowed, errors.New("method not allowed"))
	}
	var kb models.FrequentKb
	err := json.Unmarshal([]byte(event.Body), &kb)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusBadRequest,
			Body:       fmt.Sprintf("Invalid JSON: %v", err),
		}, nil
	}

	app, err := application.New()
	if err != nil {
		return utils.APIServerError(err)
	}
	defer app.DB.Close()

	return utils.Create(app, kb)
}

func main() {
	lambda.Start(handler)
}
