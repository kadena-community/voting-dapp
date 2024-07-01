import { Pact, createClient, isSignedTransaction, signWithChainweaver } from '@kadena/client';

const NETWORK_ID = 'development';
const CHAIN_ID = '1';
const API_HOST = `http://localhost:8080/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
const NAMESPACE = 'n_fd020525c953aa002f20fb81a920982b175cdf1a';

const client = createClient(API_HOST);
const accountKey = (account: string) => account.split(':')[1];

const hasAccountVoted = async (account: string): Promise<boolean> => {
  const transaction = Pact.builder
    .execution(Pact.modules[`${NAMESPACE}.election`]['account-voted'](account))
    .setMeta({ chainId: CHAIN_ID })
    .setNetworkId(NETWORK_ID)
    .createTransaction();
  const { result } = await client.dirtyRead(transaction);

  if (result.status === 'success') {
    return result.data.valueOf() as boolean;
  } else {
    console.log(result.error);
    return false;
  }
};

const vote = async (account: string, candidateKey: string): Promise<void> => {
  const transaction = Pact.builder
    .execution(
      Pact.modules[`${NAMESPACE}.election`].vote(account, candidateKey),
    )
    .addData('voter-keyset', {
      keys: [accountKey(account)],
      pred: 'keys-all',
    })
    .addSigner(accountKey(account), (withCapability: any) => [
      withCapability(`${NAMESPACE}.election-gas-station.GAS_PAYER`, account, { int: 0 }, { decimal: '0.0' }),
      withCapability(`${NAMESPACE}.election.ACCOUNT-OWNER`, account),
    ])
    .setMeta({
      chainId: CHAIN_ID,
      ttl: 28000,
      gasLimit: 100000,
      gasPrice: 0.000001,
      senderAccount: 'c:Jjn2uym_xGD32ojhWdPjB5mgIbDwgXRRvkWmFl5n4gg',
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
};
