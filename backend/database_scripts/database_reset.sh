#!bin/bash

printf "Enter your database to reset:       "
read database_name

printf "Enter your database username:        "
read database_username


psql -c "DROP DATABASE IF EXISTS $database_name;"
psql -c "CREATE DATABASE $database_name WITH OWNER $database_username;"

echo "done"
