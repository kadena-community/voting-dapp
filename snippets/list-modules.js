const { Pact, createClient } = require('@kadena/client');

const NETWORK_ID = 'fast-development';
const CHAIN_ID = '1';
const API_HOST = `http://localhost:8080/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;

const client = createClient(API_HOST);

listModules();

async function listModules() {
  const transaction = Pact.builder
    .execution('(list-modules)')
    .setMeta({ chainId: CHAIN_ID })
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const response = await client.local(transaction, {
    preflight: false,
    signatureVerification: false,
  });

  const { result } = response;
  console.log(result.data);
}
