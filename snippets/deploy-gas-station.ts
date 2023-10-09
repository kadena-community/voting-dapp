import { Pact, createClient, isSignedTransaction, signWithChainweaver } from '@kadena/client';
import { getApiHost, getChainId, getNetworkId } from './configuration';
import * as fs from 'node:fs';

const client = createClient(getApiHost());

if (!process.argv[2]) {
  console.error('Please specify a Kadena account.');
}

const upgrade = process.argv[3] === 'upgrade';
const init = process.argv[4] === 'init';

const accountKey = (account: string): string => account.split(':')[1];

main(process.argv[2], upgrade, init);

async function main(account: string, upgrade: boolean, init: boolean) {
  const transaction = Pact.builder
    .execution(fs.readFileSync('../pact/election-gas-station.pact', 'utf8'))
    .setMeta({
      ttl: 28800,
      gasLimit: 100000,
      gasPrice: 0.00000001,
      senderAccount: account,
      chainId: getChainId(),
    })
    .setNetworkId(getNetworkId())
    .addSigner(accountKey(account))
    .addData('admin-keyset', { keys: [accountKey(account)], pred: 'keys-all' })
    .addData('upgrade', upgrade)
    .addData('init', init)
    .createTransaction();

  const signedTx = await signWithChainweaver(transaction);

  const preflightResponse = await client.preflight(signedTx);
  console.log(preflightResponse);

  if (preflightResponse.result.status === 'success' && isSignedTransaction(signedTx)) {
    const transactionDescriptor = await client.submit(signedTx);
    const response = await client.listen(transactionDescriptor);
    if (response.result.status === 'failure') {
      throw response.result.error;
    } else {
      console.log(response.result);
    }
  }
}
