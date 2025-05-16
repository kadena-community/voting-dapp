import { Pact, createClient, isSignedTransaction, signTransactions } from '@kadena/client';

const NETWORK_ID = 'development';
const CHAIN_ID = '3';
const API_HOST = `http://localhost:8080/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
const NAMESPACE = 'n_d5ff15d933b83c1ef691dce3dabacfdfeaeade80';

const kadenaClient = createClient(API_HOST);
const accountKey = (account: string) => account.split(':')[1];

const hasAccountVoted = async (account: string): Promise<boolean> => {
  const readTransaction = Pact.builder
    .execution(Pact.modules[`${NAMESPACE}.election`]['account-voted'](account))
    .setMeta({ chainId: CHAIN_ID })
    .setNetworkId(NETWORK_ID)
    .createTransaction();
  const { result } = await kadenaClient.dirtyRead(readTransaction);

  if (result.status === 'success') {
    return result.data.valueOf() as boolean;
  } else {
    console.log(result.error);
    return false;
  }
};

const vote = async (account: string, candidateKey: string): Promise<void> => {
  const unsignedTransaction = Pact.builder
    .execution(
      Pact.modules[`${NAMESPACE}.election`].vote(account, candidateKey),
    )
    .addData('voter-keyset', {
      keys: [accountKey(account)],
      pred: 'keys-all',
    })
    .addSigner(accountKey(account))
    .setMeta({
      chainId: CHAIN_ID,
      ttl: 28000,
      gasLimit: 100000,
      gasPrice: 0.000001,
      senderAccount: account,
    })
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const signedTx = await signTransactions("https://chainweaver.kadena.network:9467/");

  if (isSignedTransaction(signedTx)) {
    const transactionDescriptor = await kadenaClient.submit(signedTx);
    const { result } = await kadenaClient.listen(transactionDescriptor);
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
