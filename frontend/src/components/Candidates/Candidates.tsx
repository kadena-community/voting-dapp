import React from 'react'
import { Candidate } from '../Candidate/Candidate'
import { SpinnerRoundFilled } from 'spinners-react'
import './Candidates.css'
import { ICandidate } from '../../model/Candidate.interface'

interface IProps {
  voteAllowed: boolean
  voteInProgress: boolean
  onVote: (candidateId: string) => void
  candidates: ICandidate[];
}

export const Candidates: React.FC<IProps> = ({ voteAllowed, voteInProgress, onVote, candidates }): JSX.Element => {
  return (
    <div className="Candidates">
      <header className="Candidates-heading">
        <h2>Candidates</h2>
        {voteInProgress &&
          <div className="Candidates-progress">
            <span>Voting transaction in progress ...</span>
            <SpinnerRoundFilled size={30} color="#ed098f" />
          </div>
        }
      </header>
      <section className="Candidates-list">
        {candidates.map(candidate =>
          <Candidate
            key={candidate.key}
            voteAllowed={voteAllowed}
            voteInProgress={voteInProgress}
            candidate={candidate}
            onVote={onVote}
          />)}
      </section>
    </div>
  )
}
