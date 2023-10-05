import { Pact, createClient, isSignedTransaction, signWithChainweaver } from '@kadena/client';
import { getApiHost, getChainId, getNetworkId } from './configuration';

const client = createClient(getApiHost());

if (!process.argv[2]) {
  console.error('Please specify a Kadena account.');
}

const accountKey = (account: string): string => account.split(':')[1];

main(process.argv[2]);

async function main(account: string) {
  const pactCommand = `
    (let ((ns-name (ns.create-principal-namespace (read-keyset 'admin-keyset))))
      (namespace ns-name)
      (define-keyset (format "{}.{}" [ns-name 'admin-keyset]) (read-keyset 'admin-keyset ))
    )
  `;
  const transaction = Pact.builder
    .execution(pactCommand)
    .addData('admin-keyset', {
      keys: [accountKey(account)],
      pred: 'keys-all',
    })
    .addSigner(accountKey(account))
    .setMeta({ chainId: getChainId(), senderAccount: account })
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
