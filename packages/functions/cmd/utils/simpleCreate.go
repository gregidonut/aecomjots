package utils

import (
	"encoding/json"
	"errors"

	"github.com/aws/aws-lambda-go/events"
	"github.com/gregidonut/aecomjots/packages/functions/cmd/appinterface"
	"github.com/gregidonut/aecomjots/packages/functions/cmd/models"
)

type SimpleRow interface {
	models.FrequentKb | models.Link | models.NoteTop | models.Template
}

func Create[T SimpleRow](app appinterface.App,
	row T,
) (events.APIGatewayProxyResponse, error) {
	switch r := any(row).(type) {
	case models.FrequentKb:
		stmt := `
INSERT INTO frequent_kbs (name, kb_num, url)
VALUES ($1, $2, $3);
`
		_, err := app.GetDB().Exec(stmt, r.Name, r.KBN, r.URL)
		if err != nil {
			return APIServerError(err)
		}
	default:
		return APIServerError(errors.New("unsupported type"))
	}

	jsonData, err := json.Marshal(map[string]string{"status": "ok"})
	if err != nil {
		return APIServerError(err)
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       string(jsonData),
		Headers:    map[string]string{"Content-Type": "application/json"},
	}, nil
}
