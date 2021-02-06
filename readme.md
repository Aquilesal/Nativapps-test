## Setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/Aquilesal/Nativapps-test.git
cd NativApps
```

```bash
npm install
```

## Steps for read-only access

To start the express server, run the following

```bash
npm run dev
```

## To get all movies use the following:

GET http://localhost:3000/api/movies

## To use the documentation by swagger:

GET http://localhost:3000/api-docs

## Heroku

The project has been deployed in heroku, you can get all the movies in the following:

GET https://nativapps-test.herokuapp.com/api/movies

To use the documentation by swagger:

https://nativapps-test.herokuapp.com/api-docs
