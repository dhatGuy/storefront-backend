# Storefront Backend Project

An API for a storefront application. This project is a part of the [Udacity Full Stack Nanodegree](https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd0044).

## Requirements

[REQUIREMENTS.md](REQUIREMENTS.md)

## Tech Stack

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Environment Variables

To run this project, rename the `.env.example` file to `.env` and
edit accordingly.

```
PG_HOST=127.0.0.1 # Postgres host
PG_DB=store_front # Postgres database
PG_DB_TEST=store_front_test # Postgres test database
PG_USER=store_front_user # Postgres user
PG_PASSWORD=password123 # Postgres database password
PG_PORT=5432 # Postgres port

BCRYPT_PASSWORD=snap-twice-and-call-me-in-the-morning
SALT_ROUNDS=10
TOKEN_SECRET=keep-it-secret-keep-it-safe # JWT

PORT=4040 # app running port
```

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd storefront-backend
```

Install dependencies

```bash
  yarn install
```

Setup database

```
  CREATE USER store_front_user WITH PASSWORD 'password';

  CREATE DATABASE store_front

  CREATE DATABASE store_front_test

  GRANT ALL ON SCHEMA public TO store_front_user;

  \c store_front

  GRANT ALL PRIVILEGES ON DATABASE store_front TO store_front_user;

  GRANT ALL ON SCHEMA public TO store_front_user; <-- just in case

  \c store_front_test

  GRANT ALL PRIVILEGES ON DATABASE store_front_test TO store_front_user;

  GRANT ALL ON SCHEMA public TO store_front_user; <-- just in case
```

Run migrations

```bash
  yarn migrate:up
```

Start the server

```bash
  yarn watch
```

## Running Tests

To run tests, run the following command

```bash
  yarn test
```
