FROM --platform=amd64 node:18 as frontend


WORKDIR /frontend

COPY ./frontend/package.json .

RUN npm install

COPY ./frontend .

RUN npm run build

# ------ python ------
FROM --platform=amd64 python:3.9

WORKDIR /var/www

RUN pip install psycopg2[binary]

# ---- env
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

ARG SECRET_KEY
ENV SECRET_KEY=${SECRET_KEY}

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ARG SCHEMA
ENV SCHEMA=${SCHEMA}

# copy our requirements.txt file into our project/backend folder
COPY ./backend/requirements.txt ./backend/

# install all the deps for python
RUN pip install -r ./backend/requirements.txt

COPY ./backend ./backend
COPY --from=frontend /frontend/dist ./frontend/dist
COPY ./bin ./bin


EXPOSE 8000

CMD ["bash", "./bin/start.sh"]