import {
  Pact,
  getClient,
  isSignedCommand,
  signWithChainweaver,
} from "@kadena/client";
import { ChainWebApi } from "./api";

const NETWORK_ID = "testnet04";
const CHAIN_ID = "1";
const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;

const accountKey = (account: string): string => account.split(":")[1];

export class ChainWebApiImpl implements ChainWebApi {
  /**
   * Call the user-voted function on the election contract to check if the user has voted before
   *
   * @param account - The user's account
   * @return boolean indiciation the vote status
   */
  async hasUserVoted(account: string): Promise<boolean> {
    const transaction = Pact.builder
      .execution(Pact.modules["free.election"]["user-voted"](account))
      .setMeta({
        chainId: CHAIN_ID,
        sender: account,
      })
      .setNetworkId(NETWORK_ID)
      .createTransaction();

    const client = getClient(API_HOST);
    const { result } = await client.local(transaction, { preflight: false });

    if (result.status === "success") {
      return result.data.valueOf() as boolean;
    } else {
      console.log(result.error);
      return false;
    }
  }

  /**
   * Return the amount of votes a candidate has received
   *
   * @param candidateId - The candidate's id
   * @return the number of votes
   */
  async getVotes(candidateId: string): Promise<number> {
    const transaction = Pact.builder
      // ['get-votes'] on chain 0, getVotes on chain 1
      .execution(Pact.modules["free.election"]["getVotes"](candidateId))
      .setMeta({ chainId: CHAIN_ID })
      .setNetworkId(NETWORK_ID)
      .createTransaction();

    const client = getClient(API_HOST);
    const { result } = await client.local(transaction, { preflight: false });

    if (result.status === "success") {
      return result.data.valueOf() as number;
    } else {
      console.log(result.error);
      return 0;
    }
  }

  /**
   * Vote for a candidate and poll the transaction status afterwards
   *
   * @param account - The account that is voting
   * @param candidateId - The candidateId that is being voted for
   * @return
   */
  async vote(account: string, candidateId: string): Promise<void> {
    const transaction = Pact.builder
      // ['get-votes'] on chain 0, getVotes on chain 1
      .execution(Pact.modules["free.election"].vote(account, candidateId))
      .addSigner(accountKey(account), (withCapability) => [
        withCapability("coin.GAS"),
        withCapability("free.election.ACCOUNT-OWNER", account),
      ])
      .setMeta({
        ttl: 28000,
        gasLimit: 100000,
        chainId: CHAIN_ID,
        gasPrice: 0.000001,
        sender: account,
      })
      .setNetworkId(NETWORK_ID)
      .createTransaction();

    const signed = await signWithChainweaver(transaction);

    if (!isSignedCommand(signed)) {
      return console.log("Failed to sign transaction");
    }

    console.log(`Sending transaction: ${signed.cmd}`);
    const client = getClient(API_HOST);
    const response = await client.submit(signed);

    console.log("Send response: ", response);
    const requestKey = response[0];

    console.log("Polling status...");
    const status = await client.pollStatus(requestKey);
    console.log(`Polled ${requestKey}.\nStatus: ${JSON.stringify(status)}`);
  }

  async insert(
    account: string,
    candidate: { key: string; name: string }
  ): Promise<void> {
    if (CHAIN_ID === "1") {
      throw new Error("insert-candidate not available on chain 1");
    }

    const transaction = Pact.builder
      .execution("(free.election.insert-candidate (read-msg 'candidate))")
      .addData("candidate", candidate)
      .addSigner(accountKey(account))
      .setMeta({
        ttl: 28000,
        gasLimit: 100000,
        chainId: CHAIN_ID,
        gasPrice: 0.000001,
        sender: account,
      })
      .setNetworkId(NETWORK_ID)
      .createTransaction();
    await signWithChainweaver(transaction);
    if (!isSignedCommand(transaction)) {
      return console.log("Failed to sign transaction");
    }
    const client = getClient(API_HOST);
    const response = await client.submit(transaction);
    console.log("Send response: ", response);
    const requestKey = response[0];
    console.log("Polling status...");
    const status = await client.pollStatus(requestKey);
    console.log(`Polled ${requestKey}.\nStatus: ${JSON.stringify(status)}`);
  }
}
