#! bin/bash

cd ./backend

# remove all the seeds - if we seeded before
# remove the database
flask db downgrade
flask db downgrade

# update migrations
flask db migrate

#upgrade to a new head
flask db upgrade head
#seed again
flask seed all

gunicorn --bind 0.0.0.0:5000 app:app

# CMD gunicorn --worker-class eventlet -w 1 app:app
