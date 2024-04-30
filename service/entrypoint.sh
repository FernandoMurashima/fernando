#!/bin/sh


echo "Executing the container"

python manage.py migrate

#python populate.py

gunicorn --bind :80 --workers 3 service.wsgi:application


exec "$@"



