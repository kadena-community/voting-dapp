import { FC } from 'react';

import './Candidate.css';
import { ICandidate } from '../../types';

interface ICandidateProps {
  candidate: ICandidate;
  voteAllowed: boolean;
  voteInProgress: boolean;
  onVote: (candidateId: string) => void;
}

export const Candidate: FC<ICandidateProps> = ({
  candidate: { key, name, votes },
  voteAllowed,
  voteInProgress,
  onVote,
}): JSX.Element => {
  return (
    <section className="Candidate-row">
      <div>
        <span className="Candidate-row-header">Key</span>
        <p className="Candidate-row-content">{key}</p>
      </div>
      <div>
        <span className="Candidate-row-header">Name</span>
        <p className="Candidate-row-content">{name}</p>
      </div>
      <div>
        <span className="Candidate-row-header">Votes</span>
        <p className="Candidate-row-content">{votes.int}</p>
      </div>
      <div className="Candidate-vote-container">
        <button disabled={!voteAllowed || voteInProgress} onClick={() => onVote(key)}>
          Vote Now
        </button>
      </div>
    </section>
  );
};
