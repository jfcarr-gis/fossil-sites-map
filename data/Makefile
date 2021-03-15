SQL_APP = sqlite3
DB_NAME = fossil.db

default:
	@echo 'Targets:'
	@echo '  create -- Create the tables.'
	@echo '  import -- Import table contents.'
	@echo '  export -- Export table contents.'

create:
	$(SQL_APP) $(DB_NAME) < create.sql

export:
	$(SQL_APP) $(DB_NAME) < export.sql

import:
	$(SQL_APP) $(DB_NAME) < import.sql
