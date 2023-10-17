# Election dApp tutorial

This repository contains the code files used in the
[Election dApp tutorial](https://docs.kadena.io/build/guides/election-dapp-tutorial).

## Starting the app

After cloning the repository, install and run the front-end of the application by
runnning the following from the root of the project

```
cd frontend
npm install
npm run start
```

This will run the front-end of the election dApp with an in-memory data provider. When
you have completed the tutorial and deployed the election smart contract to Devnet,
you can run the front-end using Devnet as its back-end with the following command.

```
npm run start-devnet
```

With this setup, nominated candidates and votes will be stored in the database table
of the election smart contract.

## Repository structure

The repository is broken down into the following directories:

- `pact`, which holds the smart contract and corresponding test files
- `frontend`, which holds a basic react application which forms the frontend part of the application
- `snippets`, which holds code snippets to interact with the blockchain using the `@kadena/client` library

See the tutorial for a detailed description on the contents of each of these folders.
