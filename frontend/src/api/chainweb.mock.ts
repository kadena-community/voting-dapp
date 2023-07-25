/* eslint-disable @typescript-eslint/require-await */
import { ChainWebApi } from "./api";

const storageVoted = {} as Record<string, boolean>;
const storageVotes = {} as Record<string, { name: string; votes: number }>;

export class MockApi implements ChainWebApi {
  async hasUserVoted(account: string): Promise<boolean> {
    return storageVoted[account] ?? false;
  }

  async getVotes(candidateId: string): Promise<number> {
    return storageVotes[candidateId]?.votes ?? null;
  }

  async vote(account: string, candidateId: string): Promise<void> {
    storageVoted[account] = true;
    if (storageVotes[candidateId]) {
      storageVotes[candidateId].votes += 1;
    }
  }

  async insert(
    account: string,
    candidate: { key: string; name: string }
  ): Promise<void> {
    storageVotes[candidate.key] = { name: candidate.name, votes: 0 };
  }
}
