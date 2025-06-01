package main

import (
	"context"
	"encoding/json"

	"github.com/gregidonut/aecomjots/packages/functions/cmd/application"
	"github.com/gregidonut/aecomjots/packages/functions/cmd/models"
	"github.com/gregidonut/aecomjots/packages/functions/cmd/utils"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var kb models.FrequentKb
	if err := json.Unmarshal([]byte(event.Body), &kb); err != nil {
		return utils.APIServerError(err)
	}

	app, err := application.New()
	if err != nil {
		return utils.APIServerError(err)
	}
	defer app.DB.Close()

	return utils.Post(app, kb)
}

func main() {
	lambda.Start(handler)
}
