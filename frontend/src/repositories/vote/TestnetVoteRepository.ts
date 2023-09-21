import { Pact, createClient, isSignedTransaction, signWithChainweaver } from '@kadena/client';

const NETWORK_ID = 'testnet04';
const CHAIN_ID = '1';
const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;

const accountKey = (account: string): string => account.split(':')[1];

const client = createClient(API_HOST);

const hasAccountVoted = async (account: string): Promise<boolean> => {
  const transaction = Pact.builder
    .execution(Pact.modules['free.election']['user-voted'](account))
    .setMeta({ chainId: CHAIN_ID })
    .setNetworkId(NETWORK_ID)
    .createTransaction();
  const { result } = await client.dirtyRead(transaction)

  if (result.status === 'success') {
    return result.data.valueOf() as boolean;
  } else {
    console.log(result.error);
    return false;
  }
}

const vote = async (account: string, candidateKey: string): Promise<void> => {
  const transaction = Pact.builder
    .execution(
      // @ts-ignore
      Pact.modules['free.election'].vote(account, candidateKey),
    )
    .addKeyset('ks', 'keys-all')
    .addSigner(accountKey(account), (withCapability) => [
      // @ts-ignore
      withCapability('free.election-gas-station.GAS_PAYER', account, { int: 0 }, { decimal: "0.0" }),
      // @ts-ignore
      withCapability('coin.GAS'),
      // @ts-ignore
      withCapability('free.election.ACCOUNT-OWNER', account),
    ])
    .setMeta({
      chainId: CHAIN_ID,
      ttl: 28000,
      gasLimit: 100000,
      gasPrice: 0.000001,
      senderAccount: 'election-gas-station',
    })
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const signedTx = await signWithChainweaver(transaction);

  if (isSignedTransaction(signedTx)) {
    const transactionDescriptor = await client.submit(signedTx);
    const { result } = await client.listen(transactionDescriptor);
    if (result.status === 'failure') {
      throw result.error;
    } else {
      console.log(result);
    }
  }
};

export default {
    hasAccountVoted,
    vote,
}
