# ANNIDEV

ANNIDEV is a web application built with the MEAN stack (MongoDB, Express.js, Angular, and Node.js). The project is divided into two main directories: the client and the server.

## Structure
```
/annidev
|---/server
| |---/config
| |---/controllers
| |---/middlewares
| |---/models
| |---/node_modules
| |---/routes
| |---.env
| |---package-lock.json
| |---package.json
| |---server.js
|---/client
| |---/.angular
| |---/.vscode
| |---/dist
| |---/node_modules
| |---/src
| | |---/app
| | | |---/core
| | | |---/modules
| | | | |---/manga
| | | |---/shared
| | |---/assets
| | |---/environments
| | |---index.html
| | |---main.ts
| | |---styles.scss
| |---.editorconfig
| |---.gitignore
| |---angular.json
| |---package.json
| |---tsconfig.json
|---.gitignore
|---README.md
|---Procfile
```
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install:

* Node.js - Download and Install [Node.js](https://nodejs.org/en/download/).
* MongoDB - Download and Install [MongoDB](https://www.mongodb.com/try/download/community).
* Angular CLI: `npm i -g @angular/cli`

### Installing

1. Clone the repo: `git clone https://github.com/LITTL3BEAR/ANNIDEV.git`
2. Switch to the repo folder: `cd ANNIDEV`
3. Install Node.js dependencies: `cd server && npm install`
4. Start the server: `npm start`
5. In another terminal window, switch to the `client` folder: `cd ../client`
6. Install Angular dependencies: `npm install`
7. Start the Angular development server: `npm start`

Now, the MEAN stack application should be running locally. The client runs on `http://localhost:4200`, and you'll find the server running on `http://localhost:3000`.

Happy Coding!

## Deployment

The `Procfile` is already set up for deployment on Heroku.

## Built With

* [MongoDB](https://www.mongodb.com/) - Database
* [Express.js](https://expressjs.com/) - Node.js framework
* [Angular](https://angular.io/) - Web framework
* [Node.js](https://nodejs.org/) - JavaScript runtime
* [Angular Material](https://material.angular.io/) - UI Component Library

## Authors

* Annis - Web Developer - [LITTL3BEAR](https://github.com/LITTL3BEAR)
