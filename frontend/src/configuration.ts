export type Backend = "in-memory" | "devnet" | "testnet";

const defaultBackend: Backend = "devnet";

export function getBackend(): Backend {
  return (import.meta.env.VITE_APP_BACKEND as Backend) || defaultBackend;
}
