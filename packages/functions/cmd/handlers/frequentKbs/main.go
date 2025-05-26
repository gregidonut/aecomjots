package main

import (
	"context"

	"github.com/gregidonut/aecomjots/packages/functions/cmd/application"
	"github.com/gregidonut/aecomjots/packages/functions/cmd/utils"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	app, err := application.New()
	if err != nil {
		return utils.APIServerError(err)
	}
	defer app.DB.Close()

	stmt := `
SELECT JSON_AGG(ROW_TO_JSON(t))
FROM (
  SELECT fkb_id, name, kb_num, url, cc FROM frequent_kbs
) t;
`

	return utils.Get(app, stmt)
}

func main() {
	lambda.Start(handler)
}
