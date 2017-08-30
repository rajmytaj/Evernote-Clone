Getting started:

1. `npm install`
2. `cp server/.env.example .env` and update **.env** file
3. Create database and `npm run db:migrate`

During development:

1. `npm run nodemon` in one terminal
1. `npm run dev-server` in another terminal

npm install
psql drop database notetaker;
psql create database notetaker;
//create .env
//DB_NAME=notetaker
  DB_USER=vagrant
  DB_PASS=password
knex migrate:latest 
npm start
// in another terminal
npm run start:api
localhost:8080

