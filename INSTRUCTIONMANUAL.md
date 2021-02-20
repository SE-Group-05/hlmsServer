# Hotel-Location-Management-System

A simple online hotel location management system built with MongodDB, React, Express.js and Node.js.

## Table of Content

- [Hotel-Location-Management-System](#hotel-location-management-system)
  - [Table of Content](#table-of-content)
  - [Techonologies used in this application](#techonologies-used-in-this-application)
    - [Front-end](#front-end)
    - [Back-end](#back-end)
  - [Instruction manual for compiling/hosting the code and other program parts](#instruction-manual-for-compilinghosting-the-code-and-other-program-parts)
    - [Install dependencies](#install-dependencies)
      - [Install dev dependencies if needed](#install-dev-dependencies-if-needed)
  - [Instructions for executing the program](#instructions-for-executing-the-program)
    - [Run the application](#run-the-application)
      - [Running the application in development mode](#running-the-application-in-development-mode)
        - [Development Mode (Client only)](#development-mode-client-only)
        - [Development Mode (Server only)](#development-mode-server-only)
  
## Techonologies used in this application

### Front-end

1. React
2. Chakra UI

### Back-end

1. MongoDB
2. Express.js
3. Node.js
4. Passport.js

## Instruction manual for compiling/hosting the code and other program parts

- create a `.env` file in hlmsServer directory
- add followings into that file.
  
  ```js
    secretKey = <your session secret-key>
    mongoUrl  = <your mongodb url>
  ```

 Example `.env` file

  ```js
   secretKey= 12345-67890-09876-54321
   mongoUrl = mongodb://localhost:27017/hlms-db
  ```

### Install dependencies

Open git bash or command line tools at application file and run following npm command or if you know what to do, just look at `package.json` files in hlmsServer and hlmsWebApp.

```sh
> cd .\hlmsWebApp\ 
hlmsWebApp> npm install --save
hlmsWebApp> cd ..

> cd .\hlmsServer\
hlmsServer> npm install --save
```

#### Install dev dependencies if needed

```bash
hlmsServer> npm install nodemon --save-dev
```

## Instructions for executing the program

### Run the application

#### Running the application in development mode

##### Development Mode (Client only)

Open git bash or command line tools at hlmsWebApp directory and run following npm command

```sh
hlmsWebApp> npm start
```

App will open at [http://localhost:3000](http://localhost:3000)

##### Development Mode (Server only)

Open git bash or command line tools at hlmsServer directory and run following npm command

```sh
hlmsServer> npm start
```

App will open at [http://localhost:5000](http://localhost:5000)
