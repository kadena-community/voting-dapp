const { PactCommand  } = require('@kadena/client');
const { createExp } = require('@kadena/pactjs');

const NETWORK_ID = 'testnet04';
const CHAIN_ID = '1';

listModules();

async function listModules() {
  const pactCommand = new PactCommand();
  const publicMeta = { chainId: CHAIN_ID, gasLimit: 6000, gasPrice: 0.001, ttl: 600 };
  pactCommand.code = createExp('list-modules')
  pactCommand.setMeta(publicMeta, NETWORK_ID)

  for (let index = 0; index < 20; index++) {
    const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${index}/pact`;
    const response = await pactCommand.local(API_HOST)
    console.log({index, numberOfModules: response.result.data.length});
  }
};