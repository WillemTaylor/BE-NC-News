# NC-Knews

A fully functioning API to use in the Northcoders News Sprint, including various end-points and error handling methods to capture any user errors. The databases are in PSQL and Knex will be used to interact with these databases.


## Getting Started

The initial sprint will be forked into your own repository on Github, and then cloned onto your local machine:
Once done, in terminal;

```
git clone 'github repo url'
```

```cd``` into the repository


### Installing

First of all, you'll need to install these packages to your local machine:
Run npm i mocha chai -D
Run npm i express supertest 
Run npm i knex pg
Run npm i body-parser


### Scripts

You should see the following scripts in your package.json file:

```
"createdb": "psql -f db/data/setup.sql"
```

This will setup the database table using psql

```
"migrate-make": "knex migrate:make"
```

This will create a migrations folder and javascript file to allow us to write the function to add columns to our newly created table.

```
"migrate-latest": "knex migrate:latest"
```

you can update the database matching your NODE_ENV by running this command.

```
"migrate-rollback": "knex migrate:rollback"
```

This command will rollback the last batch of migrations.

```
"seed": "knex seed:run"
```

This will use the functions created to seed the files and add the data to your tables.

```
"test": "mocha spec"
```

This will be used when testing your end-points.


## Seeding

Once you have the development env running, you'll need to write seed functions to seed the databases with the provided data. Test and development data are both provided, therefore a configuration object will need to be written first to distinguish which database was seeded from which data file. 

```
const ENV = process.env.NODE_ENV || 'development';
const dbConfig = {
  development: {
    ...
  },
  test: {
    ...
  },
};
```

Once this has been done, you can begin writing seed functions to seed the databases, and create 4 separate tables for topics, articles, users and comments. Knex (https://knexjs.org) will be used to write these seed functions and seed each table.

- Each topic should have:

  - `slug` field
  - `description` field

- Each user should have:

  - `username` which is the primary key & unique
  - `avatar_url`
  - `name`

- Each article should have:
  - `article_id` which is the primary key
  - `title`
  - `body`
  - `votes` defaults to 0
  - `topic` field which references the slug in the topics table
  - `author` field that references a user's primary key (username)
  - `created_at` defaults to the current date

* Each comment should have:
  - `comment_id` which is the primary key
  - `author` field that references a user's primary key (username)
  - `article_id` field that references an article's primary key
  - `votes` defaults to 0
  - `created_at` defaults to the current date
  - `body`


### Building and Testing

Once the tables have been successfully seeded, you can do the following:
1.  Build your Express app
2.  Mount an API Router onto your app
3.  Define the routes described below
4.  Define controller functions for each of your routes.

You should also make use of testing as you go, checking both successful requests and the variety of errors you can expect to encounter.


### Routes

To create the end-points, you will first need to create an app and apiRouter file, which will both make use of Express and handle any requests made.

```
const app = require('express')();
```

```
const apiRouter = require('express').Router();
```

You will create the following end-points:

```http
GET /api/topics
POST /api/topics

GET /api/articles
POST /api/articles

GET /api/articles/:article_id
PATCH /api/articles/:article_id
DELETE /api/articles/:article_id

GET /api/articles/:article_id/comments
POST /api/articles/:article_id/comments

PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id

GET /api/users
POST /api/users

GET /api/users/:username

GET /api
```

---

You will define the routes within a models folder, using Knex.

These models will then be used withing a controller folder, where you will build the functionality for handling these requests and serving up to the user.

## Deployment

Once the application has been built, you will deploy this and your database to heroku.


### Author

Willem Taylor


### License

This project is licensed under the MIT license