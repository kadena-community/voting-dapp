const Kadena = require("@kadena/client");
const { createExp } = require("@kadena/pactjs");

const { Pact, getClient } = Kadena;

const NETWORK_ID = "testnet04";
const CHAIN_ID = "1";
const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;

async function listModules() {
  const transaction = Pact.builder
    .execution(createExp("list-modules"))
    .setMeta({
      chainId: CHAIN_ID,
      gasLimit: 6000,
      gasPrice: 0.001,
      ttl: 600,
    })
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const client = getClient(API_HOST);
  const response = await client.local(transaction, { preflight: false });
  console.log(response.result.data);
}

listModules();
