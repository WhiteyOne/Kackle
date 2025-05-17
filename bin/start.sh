#! bin/bash

cd ./backend 

# remove all the seeds - if we seeded before
flask seed undo
# remove the database
flask db downgrade

# update migrations
flask db migrate

#upgrade to a new head
flask db upgrade head
#seed again
flask seed all

gunicorn --bind 0.0.0.0:8000 app:app
