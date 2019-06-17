# Operating manual

## Get started
### Preconditions
* [Nodejs](https://nodejs.org/en/) is installed

### Install dependencies
1. Go to the project root: `cd <Project root>`
1. Install dependencies: `npm install`
1. Navigate to the frontend: `cd frontend`
1. Install dependencies: `npm install`

### Deploy application
The following three steps describe, how to deploy the application in 
development mode. (In development mode the application automatically reloads 
your changes. You must not redeploy the application manually.)
1. Deploy backend: `startBackend.sh` (windows) and `sh startBackend.sh` (macOS) 
start the backend in development mode. 
1. Deploy frontend: `startFrontend.sh` (windows) and `sh startFrontend.sh` (macOS)
start the frontend in development mode.
1. After that the server is available at port 3000. The frontend is available 
at port 3001. (To change the default port see: How to set another port?)

## Important information concerning environment variables
In production, both the frontend and the backend are deployed on the same 
machine. Due to this fact the environment variables defined in the frontend and 
in the backend have to be unique!

## FAQ's
### How to set other ports?
#### How to change the port of the backend?
1. Go to the project root: `cd <Project root>`
1. Navigate to the backend: `cd backend`
1. Open/create a file named `.env.local`.
1. Add/edit the line `PORT=<PORT>`

#### How to change the port of the frontend?
1. Go to the project root: `cd <Project root>`
1. Navigate to the frontend: `cd frontend`
1. Open/create a file named `.env.local`.
1. Add/edit the line `PORT=<PORT>`

### Where to put the frontend code?
To deploy the built frontend, place the artifacts in the folder specified by 
the environment variable `DIST_FOLDER`.

### How to build the frontend?
1. Go to the project root: `cd <Project root>`
1. Navigate to the frontend: `cd frontend`
1. Execute build script: `npm run-script build`

### How to build the server?
1. Go to the project root: `cd <Project root>`
1. Navigate to the backend: `cd server`
1. Execute build script: `npm run-script tsc`


### How to deploy the build application?
1. Point the environment variable `DIST_FOLDER` to the folder of the frontend 
code.
1. Navigate to the parent folder of the server.
1. Run the server: `node server.js`

### Where is the database hosted?
https://www.elephantsql.com/ 

If you need access please contact [Rudi](mailto:rudi.loderer@hs-augsburg.de).

### How to use swagger?
The script `<Project root>/server/resources/tsoa.sh` generates the api-documentation and the routes-module. (documentation see https://github.com/lukeautry/tsoa)

### Where to find swagger-ui?
[click to open swagger-ui](http://localhost:3000/api-docs/) 

### How to implement push-notifications?
[see here](https://medium.com/izettle-engineering/beginners-guide-to-web-push-notifications-using-service-workers-cb3474a17679)

### Vapid-Keys
Public Key:

BDLpp91SDx9YfVpkbSCVIi4H-uXBcoggk1x0Whaw_kHQRU_9yxYQWQN4Uob0x06iu26nH7AdzNdq9vBc6Fk80OU

Private Key:

PWzMXos8riKO6GAgV7q9z10_GunQPqu8pWVmCZuzFX0