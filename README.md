# Employee Directory Backend

This will serve as the backend to the employee directory code challenge. It is developed using NodeJs and Typescript, the database used is MongoDB.

---

## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.
Also you need to set up a `.env` file in the root directory of the project that fits the below

```
LOGGING_LEVEL='info'
PORT=5000
MONGODB_HOST='localhost:27017'
MONGODB_DATABASE='somename'
MONGODB_USER='root'
MONGODB_PWD='root'

# Additional Mongo configuration if needed
# MONGODB_CONFIG='?ssl=true&replicaSet=atlas-9f1w5z-shard-0&authSource=admin&retryWrites=true&w=majority'

```

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###

### Yarn installation

After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/alirahal22/employee-backend.git
    $ cd employee-backend
    $ yarn install

## Running the project

    $ yarn start

## Running the project in development

For development and live reload on file change use the following command.
$ yarn dev

## Deployment

The backend is deployed on [Heroku](https://heroku.com/) and the database is hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
