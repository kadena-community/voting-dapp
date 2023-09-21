# Election dApp tutorial

This repository contains the code files used in the
[Election dApp tutorial](https://docs.kadena.io/build/guides/building-a-voting-dapp).

## Starting the app

Recomended first option is to `npm run start-in-memory` so you can start checking out the app without getting in depth with interacting with the blockchain and just visualizing the options the FE app has, once its clear we can start the real fun with `npm run start`.

For this, you need to follow the initial setup of https://github.com/kadena-community/getting-started where you will find how to setup the docker image where you will run the blockchain and the chainweaver app for signing the transactions.

After understanding this step, you could connect to testnet where you can track the transactions within the explorer also for all the users interacting with it, and you will be understanding as well the "order" of the blocks, the more gas you pay, the more priority it gets.

## Repository structure

The repository is broken down into the following directories:

- `pact`, which holds the smart contracts which are also deployed on testnet chain 0
- `frontend`, which holds a basic react application which forms the frontend part of our application
- `snippets`, which holds code snippets to facilitate deployment of our smart contracts to testnet and mainnet

See the tutorial for a detailed description on the contents of each of these folders.
