import { Pact, createClient, isSignedTransaction, signWithChainweaver } from '@kadena/client';

const NETWORK_ID = 'testnet04';
const CHAIN_ID = '1';
const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;

const accountKey = (account: string): string => account.split(':')[1];

const client = createClient(API_HOST);

/**
 * Call the account-voted function on the election contract to check if the user has voted before
 *
 * @param account - The user's account
 * @return boolean indiciation the vote status
 */
export const hasUserVoted = async (account: string): Promise<boolean> => {
  const transaction = Pact.builder
    // @ts-ignore account-voted
    .execution(Pact.modules['free.election']['account-voted'](account))
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

/**
 * Return the amount of votes a candidate has received
 *
 * @param candidateId - The candidate's id
 * @return the number of votes
 */
export const getVotes = async (candidateId: string): Promise<number> => {
  const transaction = Pact.builder
    // @ts-ignore getVotes/get-votes
    .execution(Pact.modules['free.election'].getVotes(candidateId))
    .setMeta({ chainId: CHAIN_ID })
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const { result } = await client.dirtyRead(transaction);

  if (result.status === 'success') {
    return result.data.valueOf() as number;
  } else {
    console.log(result.error);
    return 0;
  }
};

/**
 * Vote for a candidate and poll the transaction status afterwards
 *
 * @param account - The account that is voting
 * @param candidateId - The candidateId that is being voted for
 * @return
 */
export const vote = async (account: string, candidateId: string): Promise<void> => {
  const transaction = Pact.builder
    .execution(
      // @ts-ignore
      Pact.modules['free.election'].vote(account, candidateId),
    )
    .addKeyset('ks', 'keys-all')
    .addSigner(accountKey(account), (withCapability) => [
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
      senderAccount: account,
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
