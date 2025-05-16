import { Pact, createClient, isSignedTransaction, createSignWithKeypair } from '@kadena/client';
import { IKeyPair } from '@kadena/client';
import { ICandidate } from '../../types.js';

const NETWORK_ID = 'development';
const CHAIN_ID = '3';
const API_HOST = `http://localhost:8080/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
const NAMESPACE = 'n_d5ff15d933b83c1ef691dce3dabacfdfeaeade80';

const kadenaClient = createClient(API_HOST);
const accountKey = (account: string) => account.split(':')[1];

interface IAccount {
  accountName: string;
  publicKey: string;
}

const listCandidates = async (): Promise<ICandidate[]> => {
  const readTransaction = Pact.builder
    .execution(Pact.modules[`${NAMESPACE}.election`]['list-candidates']())
    .setMeta({
      chainId: CHAIN_ID,
      gasLimit: 100000,
    })
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const { result } = await kadenaClient.dirtyRead(readTransaction);

  return result.status === 'success' ? (result.data.valueOf() as ICandidate[]) : [];
};

const addCandidate = async (candidate: ICandidate, sender: IAccount): Promise<void> => {
  const unsignedTransaction = Pact.builder
    .execution(
      Pact.modules[`${NAMESPACE}.election`]['add-candidate'](candidate),
    )
    .addData('election-admin', {
      keys: [sender.publicKey],
      pred: 'keys-all',
    })
    .addSigner(sender.publicKey)
    .setMeta({
      chainId: CHAIN_ID,
      senderAccount: sender.accountName,
    })
    .setNetworkId(NETWORK_ID)
    .createTransaction();

    const electionKeyPair:IKeyPair = {
      publicKey:
        'd0aa32802596b8e31f7e35d1f4995524f11ed9c7683450b561e01fb3a36c18ae',
      secretKey:
        '35003210deab99bc9652d1f254b0489a318ed996544d6db1160c7e1b320e0c72',
    };

    const signWithKeypair = createSignWithKeypair([electionKeyPair]);
    const signedTx = await signWithKeypair(unsignedTransaction);

    const preflightResponse = await kadenaClient.preflight(signedTx);

  if (preflightResponse.result.status === 'failure') {
    throw preflightResponse.result.error;
  }

  if (isSignedTransaction(signedTx)) {
    const transactionDescriptor = await kadenaClient.submit(signedTx);
    const response = await kadenaClient.listen(transactionDescriptor);
    if (response.result.status === 'failure') {
      throw response.result.error;
    } else {
      console.log(response.result);
    }
  }
};

const incrementVotesByCandidateKey = (): Promise<void> => {
  // happens internally in the Pact module
  return Promise.resolve();
};

export default {
  listCandidates,
  addCandidate,
  incrementVotesByCandidateKey,
};
