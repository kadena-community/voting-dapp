import { Pact, createClient } from '@kadena/client';
import { getApiHost, getChainId, getNetworkId } from './configuration';

if (!process.argv[2]) {
  console.error('Please specify a Kadena account.');
}

const client = createClient(getApiHost());

main(process.argv[2]);

async function main(account: string) {
  const transaction = Pact.builder
    .execution(`(coin.details "${account}")`)
    .setMeta({ chainId: getChainId() })
    .setNetworkId(getNetworkId())
    .createTransaction();

  try {
    const response = await client.dirtyRead(transaction);

    const { result } = response;

    if (result.status === 'success') {
      console.log(result.data);
    } else {
      console.error(result.error);
    }
  } catch (e: unknown) {
    console.error((e as Error).message);
  }
}
