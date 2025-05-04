package main

import (
	"context"
	"github.com/gregidonut/aecomjots/packages/functions/cmd/utils"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(context.Context, events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	stmt := `
SELECT JSON_AGG(TO_JSON(
        t))
FROM (SELECT t.template_id,
             t.name,
             (t1.value || t.value) AS VALUE,
             t.cc
      FROM templates t
               JOIN (SELECT value
                     FROM templates
                     WHERE template_id = 1) t1 ON TRUE
      WHERE t.template_id != 1) AS t;
`

	return utils.Get(stmt)
}

func main() {
	lambda.Start(handler)
}
