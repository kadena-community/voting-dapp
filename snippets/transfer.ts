import { Pact, createClient, createSignWithKeypair, isSignedTransaction, signWithChainweaver } from '@kadena/client';
import { getApiHost, getChainId, getNetworkId } from './configuration';

const client = createClient(getApiHost());

if (!process.argv[2]) {
  console.error('Please specify a sender account.');
}

if (!process.argv[3]) {
  console.error('Please specify a receiver account.');
}

if (!process.argv[4]) {
  console.error('Please specify an amount.');
}

const accountKey = (account: string): string => account.split(':')[1];

main(process.argv[2], process.argv[3], process.argv[4]);

async function main(sender: string, receiver: string, amount: string) {
  const transaction = Pact.builder
    .execution(Pact.modules.coin.transfer(sender, receiver, { decimal: amount }))
    .addSigner(accountKey(sender), (withCapability) => [
      withCapability('coin.GAS'),
      withCapability('coin.TRANSFER', sender, receiver, { decimal: amount }),
    ])
    .setMeta({
      chainId: getChainId(),
      senderAccount: sender,
    })
    .setNetworkId(getNetworkId())
    .createTransaction();

  const signedTx = await signWithChainweaver(transaction);

  if (isSignedTransaction(signedTx)) {
    const transactionDescriptor = await client.submit(signedTx);
    const response = await client.listen(transactionDescriptor);
    if (response.result.status === 'failure') {
      throw response.result.error;
    } else {
      console.log(response.result);
    }
  }
}
