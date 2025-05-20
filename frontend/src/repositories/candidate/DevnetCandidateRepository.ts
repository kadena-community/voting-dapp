import { Pact, createClient, isSignedTransaction, createSignWithKeypair } from '@kadena/client';
import { IKeyPair } from '@kadena/client';
import { ICandidate } from '../../types.js';

const NETWORK_ID = 'development';
const CHAIN_ID = '4'; // Replace with the appropriate chain identifier
const API_HOST = `http://localhost:8080/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
const NAMESPACE = 'n_90785a0e8c65525ef342c84991842f851868f7cb'; // Replace with the principal namespace for your administrative account

const kadenaClient = createClient(API_HOST);
const accountKey = (account: string) => account.split(':')[1];

// list-candidates reads from the blockchain and doesn't need to sign or send
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

// add-candidate requires the election-admin account and signature
const addCandidate = async (candidate: ICandidate, sender: string = ''): Promise<void> => {
  const unsignedTransaction = Pact.builder
    .execution(
      Pact.modules[`${NAMESPACE}.election`]['add-candidate'](candidate),
    )
    .addData('election-admin', {
      keys: [accountKey(sender)],
      pred: 'keys-all',
    })
    .addSigner(accountKey(sender))
    .setMeta({
      chainId: CHAIN_ID,
      senderAccount: sender
    })
    .setNetworkId(NETWORK_ID)
    .createTransaction();

    console.log('tx', unsignedTransaction);

    const electionKeyPair:IKeyPair = {
      publicKey:
        //sender.publicKey,
        //accountKey(sender)
        "02b055c8be0eeaa659d0927f3e2399080c91f3fdf94d079498b04d6987acbd46",
      secretKey:
        '5a02489796c9ec2ec74edf15b63140224d0516ce6cd8f62303ac63b56a45c336',
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

// votes are incremented internally in the Pact module
const incrementVotesByCandidateKey = (): Promise<void> => {
  return Promise.resolve();
};

export default {
  listCandidates,
  addCandidate,
  incrementVotesByCandidateKey,
};
