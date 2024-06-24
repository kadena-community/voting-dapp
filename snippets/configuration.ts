import { ChainId } from '@kadena/client';

type Network = 'devnet' | 'testnet' | 'mainnet';

const defaultNetwork: Network = 'devnet';
const network = process.env.KADENA_NETWORK || defaultNetwork;
const defaultChainId = '1';
const defaultNetworkId: string = 'development';

export const getApiHost = (): string => {
  return `http://localhost:8080/chainweb/0.0/${getNetworkId()}/chain/${getChainId()}/pact`;
};

export const getChainId = (): ChainId => {
  switch (network) {
    case 'devnet':
    default:
      return defaultChainId;
  }
};

export const getNetworkId = (): string => {
  switch (network) {
    case 'devnet':
    default:
      return defaultNetworkId;
  }
};
