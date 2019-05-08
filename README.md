# Operating manual

## Get started
### Preconditions
* [Nodejs](https://nodejs.org/en/) is installed
* [Vue CLI](https://cli.vuejs.org/guide/installation.html) is installed

### Install dependencies
1. Go to the project root: `cd <Project root>`
1. Install dependencies: `npm install`
1. Navigate to the frontend: `cd frontend`
1. Install dependencies: `npm install`

### Deploy application
1. The script `debug.sh` (windows) and `sh debug.sh` (macOS) starts the application in development mode. In 
development mode the application automatically reloads your changes. (You must 
not redeploy the application manually.)

1. After that the server is available at port 3000. The frontend is available 
at port 3001. (To change the default port see: How to set another port?)

## FAQ's
### How to set other ports?
1. Open/create a file named `.env.local` in the projects root directory.
1. Add/edit the lines beginning with: `PORT_SERVER` or `DEV_PORT_FE`

### Where to put the frontend code?
To deploy the built frontend, place the artifacts in the folder specified by 
the environment variable `DIST_FOLDER`.

### How to build the frontend?
1. Go to the project root: `cd <Project root>`
1. Navigate to the frontend: `cd frontend`
1. Execute build script: `npm run-script build`

### How to build the server?
1. Go to the project root: `cd <Project root>`
1. Execute build script: `npm run-script tsc`


### How to deploy the build application?
1. Point the environment variable `DIST_FOLDER` to the folder of the frontend 
code.
1. Navigate to the parent folder of the server.
1. Run the server: `node server.js`

### Where is the database hosted?
https://www.elephantsql.com/ 

If you need access please contact [Rudi](mailto:rudi.loderer@hs-augsburg.de).
