const fs = require("fs");
const {
  Pact,
  getClient,
  signWithChainweaver,
  isSignedCommand,
} = require("@kadena/client");

const NETWORK_ID = "testnet04";
const CHAIN_ID = "1";
const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
const CONTRACT_PATH = "../pact/election.pact";
const ACCOUNT_NAME =
  "k:41642d4b7f3134f780a7133b319c37775ba2506bd71dc1457b483dd392fcd0bf";
const PUBLIC_KEY =
  "41642d4b7f3134f780a7133b319c37775ba2506bd71dc1457b483dd392fcd0bf";

const pactCode = fs.readFileSync(CONTRACT_PATH, "utf8");

async function deployContract(pactCode) {
  const transaction = Pact.builder
    .execution(pactCode)
    .addData("election-admin-keyset", [PUBLIC_KEY])
    .addData("upgrade", false)
    .setMeta({
      chainId: CHAIN_ID,
      gasLimit: 100000,
      gasPrice: 0.000001,
      ttl: 28000,
      sender: ACCOUNT_NAME, // the account paying for gas
    })
    .addSigner(PUBLIC_KEY, (withCapability) => [withCapability("coin.GAS")])
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const signedTransaction = await signWithChainweaver(transaction);

  if (!isSignedCommand(signedTransaction)) {
    throw Error("Failed to sign");
  }

  const client = getClient(API_HOST);

  const [requestKey] = await client.submit(signedTransaction);
  console.log(`Sumibtted: ${requestKey}, polling for result...`);

  const status = await client.pollStatus(requestKey);
  console.log(`status for ${requestKey}:`, status[requestKey]);
}

deployContract(pactCode);
