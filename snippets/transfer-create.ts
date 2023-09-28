import { Pact, createClient, createSignWithKeypair, isSignedTransaction } from '@kadena/client';
import { PactNumber } from '@kadena/pactjs';
import { getApiHost, getChainId, getNetworkId } from './configuration';

const client = createClient(getApiHost());

if (! process.argv[2]) {
  console.error('Please specify a Kadena account.');
}

const FUNDING_ACCOUNT = 'sender00';
const FUNDING_ACCOUNT_PUBLIC_KEY = '368820f80c324bbc7c2b0610688a7da43e39f91d118732671cd9c7500ff43cca';
const FUNDING_ACCOUNT_PRIVATE_KEY = '251a920c403ae8c8f65f59142316af3c82b631fba46ddea92ee8c95035bd2898';

const accountKey = (account: string): string => account.split(':')[1];

main(
  FUNDING_ACCOUNT,
  FUNDING_ACCOUNT_PUBLIC_KEY,
  FUNDING_ACCOUNT_PRIVATE_KEY,
  process.argv[2],
  20,
);

async function main(
  sender: string,
  senderPublicKey: string,
  senderPrivateKey: string,
  receiver: string,
  amount: number,
) {
  const pactAmount = new PactNumber(amount).toPactDecimal();

  const transaction = Pact.builder
    .execution(
      Pact.modules.coin['transfer-create'](sender, receiver, () => '(read-keyset "ks")', pactAmount),
    )
    .addData('ks', {
      keys: [accountKey(receiver)],
      pred: 'keys-all',
    })
    .addSigner(senderPublicKey, (withCapability) => [
      withCapability('coin.GAS'),
      withCapability('coin.TRANSFER', sender, receiver, pactAmount),
    ])
    .setMeta({ chainId: getChainId(), senderAccount: sender })
    .setNetworkId(getNetworkId())
    .createTransaction();

  const signWithKeypair = createSignWithKeypair({
    publicKey: senderPublicKey,
    secretKey: senderPrivateKey,
  });
  const signedTx = await signWithKeypair(transaction);

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
