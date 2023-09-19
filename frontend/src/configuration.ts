export type Backend = 'in-memory' | 'devnet' | 'testnet';

const backend: Backend = 'devnet';
// const backend: Backend = 'testnet';
// const backend: Backend = 'in-memory';

export function getBackend(): Backend {
    return backend;
}