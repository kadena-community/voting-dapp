export type Backend = "in-memory" | "devnet" | "testnet";

const defaultBackend: Backend = "devnet";

export function getBackend(): Backend {
  return (process.env.REACT_APP_BACKEND as Backend) || defaultBackend;
}
