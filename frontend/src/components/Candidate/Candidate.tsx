import React, { useState, useEffect } from 'react';
import './Candidate.css';
import { candidateService } from '../../services/CandidateService';
import { ICandidate } from '../../types';

interface ICandidateProps {
  candidate: ICandidate;
  voteAllowed: boolean;
  voteInProgress: boolean;
  onVote: (candidateId: string) => void;
}

export const Candidate: React.FC<ICandidateProps> = ({
  candidate: { key, name },
  voteAllowed,
  voteInProgress,
  onVote,
}): JSX.Element => {
  const [voteCount, setVoteCount] = useState<number>(0);

  const retrieveCandidateVotes = async (key: string) => {
    const votes = await candidateService.getNumberOfVotesByCandidateKey(key);
    setVoteCount(votes);
  };

  useEffect(() => {
    if (!voteInProgress) {
      retrieveCandidateVotes(key);
    }
  }, [key, voteInProgress, voteAllowed]);

  return (
    <section className="Candidate-row">
      <div>
        <span className="Candidate-row-header">Name</span>
        <p className="Candidate-row-content">{name}</p>
      </div>
      <div>
        <span className="Candidate-row-header">Votes</span>
        <p className="Candidate-row-content">{voteCount}</p>
      </div>
      <div className="Candidate-vote-container">
        <button disabled={!voteAllowed || voteInProgress} onClick={() => onVote(key)}>
          Vote Now
        </button>
      </div>
    </section>
  );
};
