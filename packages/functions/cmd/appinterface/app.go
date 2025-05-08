package appinterface

import "database/sql"

type App interface {
	GetDB() *sql.DB
}
