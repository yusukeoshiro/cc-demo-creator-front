# CC Demo Creator Front End Application

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Runnning Locally

Run `node server.js` to run server.

On a different terminal run `ng build --watch` to enable auto build on file edit.

While the server is running navigate to `http://localhost:8080/` to view the app locally.

## Environment Variables

When running the server on localhost, set the environment variable with `.env` located directly on the project root.

`SERVER_URL` should be set to wherever your backend server is.

```
$ cat .env

SERVER_URL=http://localhost:3000
```

## Back End

Back end server should be spun up seperately. Refer to this separate repository

https://github.com/yusukeoshiro/cc-demo-creator-back
