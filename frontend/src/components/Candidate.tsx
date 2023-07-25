import { useContext, useEffect, useState, useCallback } from "react";
import { Button } from "./Button";
import { ChainWebApiContext } from "../api/api";

export type CandidateProps = {
  candidate: { key: string; name: string };
  voteAllowed: boolean;
  voteInProgress: boolean;
  onVote: (key: string) => void;
};

export const Candidate = ({
  candidate,
  onVote,
  voteAllowed,
  voteInProgress,
}: CandidateProps) => {
  const [voteCount, setVoteCount] = useState<number>(0);
  const api = useContext(ChainWebApiContext);

  const retrieveCandidateVotes = useCallback(
    async (id: string) => {
      const votes = await api.getVotes(id);
      setVoteCount(votes);
    },
    [api]
  );

  useEffect(() => {
    if (!voteInProgress) {
      retrieveCandidateVotes(candidate.key).catch(console.error);
    }
  }, [candidate.key, retrieveCandidateVotes, voteInProgress]);

  return (
    <section className="flex rounded px-4 py-6 mb-2 bg-gray-300">
      <table className="w-full table-fixed">
        <tbody className="text-center">
          <tr>
            <th>Candidate Id</th>
            <th>Name</th>
            <th>Total votes</th>
            <td rowSpan={2}>
              <Button
                disabled={!voteAllowed || voteInProgress}
                onClick={() => onVote(candidate.key)}
              >
                Vote now
              </Button>
            </td>
          </tr>

          <tr>
            <td>{candidate.key}</td>
            <td>{candidate.name}</td>
            <td>{voteCount}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
