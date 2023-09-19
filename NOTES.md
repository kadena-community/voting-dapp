## Deploy to devnet

`docker run -it -p 8080:8080 kadena/devnet:latest`

Configure Devnet in chainweaver under Settings > Network, with node 01: localhost:8080
Select Devnet as network
Generate a key
Add k:account
Fund your account by coin transfer from sender00 account to make it exist on chain

Deploy gas station
Fund gas station account by coin transfer from sender00 account

Deploy election module

Add candidates
Vote for a candidate

https://github.com/kadena-io/chainweb-node/blob/master/pact/genesis/devnet/keys.yaml

## Deploy to testnet

Fund your account using the testnet faucet to make it exist on chain

Deploy gas station
Fund gas station account using the testnet faucet

Deploy election module

## Clean checkout

I git clone the repo `git clone git@github.com:kadena-community/voting-dapp.git` and `cd voting-dapp`

I want to see the dApp running, so I do:
- `npm install`
- `npm run start`

And I get a type error about the Pact contracts.

So I run:
- `npm run pactjs:generate:contracts`
- `npm run start`

And I get a `PactInternalError` with message "Account name does not conform to the min length requirement", triggered from `retrieveCandidateVotes`. Why do I need to pay for gas to retrieve candidate votes?

## Upgrade to Kadena Client 1.2.0

Allows easier interaction with the blockchain, e.g. for read operations. We should probably depend on the version `latest` of our own npm packages and run tests in the CI pipeline at regular intervals.

## Better frontend architecture

Move components to an `./src/components/` folder

## Tests

There is a setupTests.ts for the frontend, but no tests

## Clean up unused files

- `./frontend/src/utils.ts`

## Methods for signing transactions

### Devnet

- Keypair

### Testnet

- Chainweaver
- WallectConnect

### Mainnet

- Chainweaver
- WallectConnect
- EckoWallet

