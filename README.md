# project-boiler

## Set up
1. Install dependencies by running:
```
npm install
```
2. Create a .env.local file with appropriate environment variables
3. Configure your hosts file to work with the subdomains. I added the following line to my file:
```
127.0.0.1    api.boiler.local    boiler.local
```

## Running locally
Run the server using:
```
npm run server
```
This script restarts the server when a change is made to a relevant file.
*Please note that running the server before building the project in a development environment will allow the api to function, but the Vue app will not be served (as these files need to be built for the server to run).*

For an optimal development environment (which mitigates build time), building the project is not necessary, as the Vue app can be accessed independently of the server (on a different port), by running:
```
npm run client
```
This script means that front-end changes are automatically reloaded in the browser.
*Please note that the server must be running for the API to be accessed by the front-end.*

## Tests
Test using:
```
npm run test
```
This typechecks, then runs unit tests (Mocha + Chai), then runs end-to-end tests (Cypress).

## Cleaning up code
Lint using:
```
npm run lint
```
Format code using:
```
npm run prettier
```

## Running in production
Before running, a production server must build the project:
```
npm run build
```
This first typechecks the project, then builds the front-end, which creates files to be served in the /server/public directory. The build then uses Babel to transpile the server code from ES6 Typescript to something that the server can run, outputting to the /server-prod directory.

The production server can then start by running 
```
npm start
```
