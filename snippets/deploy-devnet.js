
const { Pact, createClient, createSignWithKeypair, isSignedTransaction, signWithChainweaver } = require('@kadena/client');
const fs = require('fs');

// Before running this script, make sure your devnet is running:
// docker run -it -p 8080:8080 kadena/devnet:latest
// Configure the devnet network in the Chainweaver desktop application under Settings > Network.
// Name it Devnet and fill in localhost:8080 for node 01

// The Devnet comes pre-installed with test accounts with a high balance. The keys of these accounts
// can be found here: https://github.com/kadena-io/chainweb-node/blob/master/pact/genesis/devnet/keys.yaml.
// In this tutorial the test account 'sender00' will be used
const FUNDING_ACCOUNT = 'sender00';
const FUNDING_ACCOUNT_PUBLIC_KEY = '368820f80c324bbc7c2b0610688a7da43e39f91d118732671cd9c7500ff43cca';
const FUNDING_ACCOUNT_PRIVATE_KEY = '251a920c403ae8c8f65f59142316af3c82b631fba46ddea92ee8c95035bd2898';

// Open the Chainweaver desktop application, select the Devnet network, and open the Keys view.
// Generate two new keys: one for the admin account and one for the voter account.
// Also create a k:account for each key. Replace the k:accounts below with the ones you created.
const GAS_STATION_ACCOUNT = 'election-gas-station'
const ADMIN_ACCOUNT = 'k:25103731bc291481f54a33ac5e8abbb67ac1199679530da38f5c4e2ba7c17864'
const VOTER_ACCOUNT = 'k:9f633d53f19ff3137d0b606f01342be4e952f72a3d6c2b97bbb30170fcff1721'

// Switch to the Accounts view of Chainweaver. You will notice that no balance exists for these accounts
// on any chain. There is no record of the accounts on the blockchain at all until these accounts have
// received some funds. The admin account needs KDA to pay gas for deploying Pact modules. The voting
// account needs KDA just to exist and be able to vote (will it?).

const NETWORK_ID = 'fast-development';
const CHAIN_ID = '1';
const API_HOST = `http://localhost:8080/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;

const client = createClient(API_HOST);
const accountKey = (account) => account.split(':')[1];

async function transfer(
  sender,
  senderPublicKey,
  senderPrivateKey,
  receiver,
  amount,
) {
  const transaction = Pact.builder
    .execution(
      // pact expression
      Pact.modules.coin['transfer'](sender, receiver, amount),
    )
    .addData('ks', {
      keys: [accountKey(receiver)],
      pred: 'keys-all',
    })
    .addSigner(senderPublicKey, (withCapability) => [
      withCapability('coin.GAS'),
      withCapability('coin.TRANSFER', sender, receiver, amount),
    ])
    .setMeta({ chainId: CHAIN_ID, senderAccount: sender })
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const signWithKeypair = createSignWithKeypair({
    publicKey: senderPublicKey,
    secretKey: senderPrivateKey
  })
  const signedTx = await signWithKeypair(transaction);

  if (isSignedTransaction(signedTx)) {
    const transactionDescriptor = await client.submit(signedTx);
    const response = await client.listen(transactionDescriptor, {});
    if (response.result.status === 'failure') {
      throw response.result.error;
    } else {
      console.log(response.result);
    }
  }
}

async function transferCreate(
  sender,
  senderPublicKey,
  senderPrivateKey,
  receiver,
  amount,
) {
  const transaction = Pact.builder
    .execution(
      // pact expression
      Pact.modules.coin['transfer-create'](sender, receiver, () => '(read-keyset "ks")', amount),
    )
    .addData('ks', {
      keys: [accountKey(receiver)],
      pred: 'keys-all',
    })
    .addSigner(senderPublicKey, (withCapability) => [
      withCapability('coin.GAS'),
      withCapability('coin.TRANSFER', sender, receiver, amount),
    ])
    .setMeta({ chainId: CHAIN_ID, senderAccount: sender })
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const signWithKeypair = createSignWithKeypair({
    publicKey: senderPublicKey,
    secretKey: senderPrivateKey
  })
  const signedTx = await signWithKeypair(transaction);

  if (isSignedTransaction(signedTx)) {
    const transactionDescriptor = await client.submit(signedTx);
    const response = await client.listen(transactionDescriptor, {});
    if (response.result.status === 'failure') {
      throw response.result.error;
    } else {
      console.log(response.result);
    }
  }
}

async function createAccount(
  sender,
  senderPublicKey,
  senderPrivateKey,
  receiver,
) {
  const transaction = Pact.builder
    .execution(
      Pact.modules.coin['create-account'](receiver, () => '(read-keyset "ks")'),
    )
    .addData('ks', {
      keys: [accountKey(receiver)],
      pred: 'keys-all',
    })
    .addSigner(senderPublicKey, (withCap) => [withCap('coin.GAS')])
    .setMeta({ chainId: CHAIN_ID, senderAccount: sender })
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const signWithKeypair = createSignWithKeypair({
    publicKey: senderPublicKey,
    secretKey: senderPrivateKey
  });

  const signedTx = await signWithKeypair(transaction);
  if (isSignedTransaction(signedTx)) {
    const transactionDescriptor = await client.submit(signedTx);
    const response = await client.listen(transactionDescriptor, {});
    if (response.result.status === 'failure') {
      throw response.result.error;
    } else {
      console.log(response.result);
    }
  }
}

async function deployContract(sender, pactCode) {
  const transaction = Pact.builder
    .execution(pactCode)
    .setMeta({
      ttl: 28800,
      gasLimit: 100000,
      gasPrice: 0.00000001,
      senderAccount: sender,
      chainId: CHAIN_ID,
    })
    .setNetworkId(NETWORK_ID)
    .addSigner(accountKey(sender))
    .addData('election-admin-keyset', { keys: [accountKey(sender)], pred: 'keys-all' })
    .addData('upgrade', false)
    .createTransaction()
  ;

  const signedTx = await signWithChainweaver(transaction);
  // do a preflight/dirtyRead first to check if the request is successful. it provides fast feedback and prevents loss of gas in case of a failing transaction
  // const preflightResponse = await client.preflight(signedTx);
  // console.log(preflightResponse)

  if (isSignedTransaction(signedTx)) {
    const transactionDescriptor = await client.submit(signedTx);
    const response = await client.listen(transactionDescriptor, {});
    if (response.result.status === 'failure') {
      throw response.result.error;
    } else {
      console.log(response.result);
    }
  }
}

async function insertCandidates(
  sender,
  senderPublicKey,
  candidates,
) {
  const transaction = Pact.builder
    .execution(
      // pact expression
      Pact.modules['free.election']['insert-candidates'](candidates),
    )
    .addData('election-admin-keyset', { keys: [accountKey(sender)], pred: 'keys-all' })
    .addSigner(senderPublicKey)
    .setMeta({ chainId: CHAIN_ID, senderAccount: sender })
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const signedTx = await signWithChainweaver(transaction);

  if (isSignedTransaction(signedTx)) {
    const transactionDescriptor = await client.submit(signedTx);
    const response = await client.listen(transactionDescriptor, {});
    if (response.result.status === 'failure') {
      throw response.result.error;
    } else {
      console.log(response.result);
    }
  }
}

const main = async () => {
  // Create the admin account with some KDA to pay for gas
  await transferCreate(FUNDING_ACCOUNT, FUNDING_ACCOUNT_PUBLIC_KEY, FUNDING_ACCOUNT_PRIVATE_KEY, ADMIN_ACCOUNT, { decimal: '20.00' });
  // Create a voter account with a zero KDA balance
  await createAccount(FUNDING_ACCOUNT, FUNDING_ACCOUNT_PUBLIC_KEY, FUNDING_ACCOUNT_PRIVATE_KEY, VOTER_ACCOUNT);
  // Deploy the election model first, because it defines the keyset
  await deployContract(ADMIN_ACCOUNT, fs.readFileSync('../pact/election.pact', 'utf8'));
  // Deploy the election gas station
  await deployContract(ADMIN_ACCOUNT, fs.readFileSync('../pact/election-gas-station.pact', 'utf8'));
  // Fund the gas station account
  await transfer(FUNDING_ACCOUNT, FUNDING_ACCOUNT_PUBLIC_KEY, FUNDING_ACCOUNT_PRIVATE_KEY, GAS_STATION_ACCOUNT, { decimal: '20.00' });
  // Add candidates
  await insertCandidates(ADMIN_ACCOUNT, accountKey(ADMIN_ACCOUNT), [
    { "key": "1", "name": "Hatsune Miku" },
    { "key": "2", "name": "Pompompurin" },
    { "key": "3", "name": "Isabelle" },
    { "key": "4", "name": "Amy" },
    { "key": "5", "name": "Peppa" },
  ]);
}

main();