package main

import (
	"context"

	"github.com/gregidonut/aecomjots/packages/functions/cmd/utils"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	stmt := `
SELECT JSON_AGG(ROW_TO_JSON(t))
FROM (
  SELECT fkb_id, name, kb_num, cc FROM frequent_kbs
) t;
`

	return utils.Get(stmt)
}

func main() {
	lambda.Start(handler)
}
