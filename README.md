# Description

A [Nest](https://github.com/nestjs/nest), [Fastify](https://fastify.dev/), [DrizzleORM](https://orm.drizzle.team/), [Postgres](https://www.postgresql.org/), [REST](https://www.w3.org/2001/sw/wiki/REST) and [GraphQL](https://graphql.org/) based backend that handles a simple checkout process to book a travel.

## Installation Steps

```bash
# install necessary node modules (use Node v20 or higher)
$ npm install

# create the necessary .env files for running the app locally or in production
$ touch .env.development .env.production

# follow the example below to fill out the necessary environment variables or the .env.example file
------
PROD_PORT=3333
DEV_PORT=3000
DOMAIN=wetravel.com
IP_ADDRESS=127.0.0.1
HTTPS=false

DB_USER=traveluser
DB_PASSWORD=travelpass
DB_HOST=localhost
DB_PORT=5555
DB_NAME=traveldb
DB_AUTH=true
------

# make sure you have docker installed locally
$ docker --version

# spin up docker container
$ npm run start:postgres:dev

# generate new migrations (when db schema changes)
$ npm run migrations:generate:dev

# run migrations and update the db (1st time or when schema changes)
$ npm run migrations:push:dev
```

## Running the app

```bash
# development (database is seeded with travel/destination information from the seed folder)
$ npm run dev

# test the REST api with a REST client (e.g. postman) or by using Swagger (development only)
http://localhost:3000/swagger

# test the GraphQL api with a GraphQL client (e.g. postman) or GraphiQL (development only)
http://localhost:3000/graphiql

# production mode
$ npm run build && npm run prod
```
