import React from "react";
import { Candidate, CandidateProps } from "./Candidate";
import { SpinnerRoundFilled } from "spinners-react";

const candidates: Array<CandidateProps["candidate"]> = [
  { key: "1", name: "Jamesgatia Wardanic" },
  { key: "2", name: "Shazora Bradleflame" },
  { key: "3", name: "Isobel O'Quinn" },
  { key: "4", name: "Washingtonganta" },
  { key: "5", name: "Campbelliri Kumariverse" },
];

interface IProps {
  voteAllowed: boolean;
  voteInProgress: boolean;
  onVote: (candidateId: string) => void;
}

export const Candidates: React.FC<IProps> = ({
  voteAllowed,
  voteInProgress,
  onVote,
}): JSX.Element => (
  <div className="Candidates">
    <header className="Candidates-heading">
      <h2>Candidates</h2>
      {voteInProgress && (
        <div className="Candidates-progress">
          <span>Voting transaction in progress ...</span>
          <SpinnerRoundFilled size={30} color="#ed098f" />
        </div>
      )}
    </header>
    <section className="Candidates-list">
      {candidates.map((candidate) => (
        <Candidate
          key={candidate.key}
          candidate={candidate}
          voteAllowed={voteAllowed}
          voteInProgress={voteInProgress}
          onVote={onVote}
        />
      ))}
    </section>
  </div>
);
