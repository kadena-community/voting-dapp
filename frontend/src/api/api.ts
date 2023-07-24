import { createContext } from "react";
import { MockApi } from "./chainweb.mock";

export interface ChainWebApi {
  hasUserVoted: (account: string) => Promise<boolean>;
  getVotes: (candidateId: string) => Promise<number | null>;
  vote: (account: string, candidateId: string) => Promise<void>;
  insert: (
    account: string,
    candidate: { key: string; name: string }
  ) => Promise<void>;
}

/**
 * By default provide a mock API
 * Provide `ChainWebApiImpl` around the app to use the real API.
 */
export const ChainWebApiContext = createContext<ChainWebApi>(new MockApi());
