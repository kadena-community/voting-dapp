# Election workshop tutorials

This repository contains the code files used in the
[Election application workshop](https://docs.kadena.io/resources/election-workshop) set of tutorials.

## Starting the app

After cloning the repository, install and run the frontend of the application by running the following commands from the root directory of the project:

```
cd frontend
npm install
npm run start
```

These commands will install dependencies and start a browser-based frontend for the election application that uses an in-memory data provider. 
As you complete the workshop tutorials, you'll replace the in-memory data provider with an election smart contract deployed on a development network running locally.
After you deploy the election smart contract on the development network, you can relaunch the application to use the smart contract as its backend by running the following command:

```
npm run start-devnet
```

After you run this command, the candidates you nominate and votes are be stored in the database table defined in the election smart contract.

## Repository structure

The repository is organized into the following directories:

- `pact` contains smart contract modules and corresponding test files.
- `frontend` provides the files for a basic React application for the frontend of the election application.
- `snippets` holds scripts that enable you to interact with the blockchain using the `@kadena/client` TypeScript library.

See the [Election workshop](https://docs.kadena.io/resources/election-workshop) for more information about these folders and how to build the election application.
