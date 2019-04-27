# Operating manual

## Preconditions to deploy the application
* [Nodejs](https://nodejs.org/en/) is installed

## How to start the server?
1. Go to the project root: `cd <Project root>`
1. Install dependencies: `npm install`

1. Now you can start the server either in production- or in development-mode. 
In production-mode, the application is deployed as is. In development-mode, each
change is applied immediately.

    * Start server in production-mode: `npm run prod`
    * Start server in development-mode: `npm run dev`

1. After that the server is available at port 3000 per default. (To change the 
default port see: [How to set another port?]())

## How to set another port?
1. Open/create the file named `.env` in the projects root directory.
1. Add/edit the following line: `PORT=<Enter the desired port here>`

## Where to put the frontend code?
The server deploys the dist folder located at `<Project root>\server\dist`
