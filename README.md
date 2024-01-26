## NodeJS Backend Layer

This is a Node.js API that leverages Docker for containerization, utilizing a Dockerfile for the application and a docker-compose configuration for orchestrating two containers - one for the Node.js app and the other for a PostgreSQL database. This setup ensures a seamless and scalable deployment environment. The app and database are both integrated into the same isolated network, providing improved security and communication between the components. While the majority of the API endpoints are functional, I encountered a time constraint that prevented the completion of the user update endpoint. Despite this, the architecture is designed for extensibility, and the groundwork laid sets the stage for future development and enhancement.

### Design Doc
Find more information about my thought process on this [google drive doc](https://docs.google.com/document/d/1YkqLdlGLfzoudAGeIr3I1ZMsqfmybt4tsw-r_TmezKg/edit?usp=sharing)

### Run the app

Go to the root folder of the backend app and run:
```
npm install
```

Then:
```
docker-compose up
```

List the running  containers
```
docker ps
```

Get the container id for the app then SSH into the app container and run the database migrations
```
npx knex migrate:latest
```

Still from the app container, populate the dev database:
```
npx knex seed:run
```