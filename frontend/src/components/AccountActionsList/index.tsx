import React from 'react';

interface IAccountActionsListProps {
  candidateAddingInProgress: boolean;
  onClickCandidate: (showCandidateModal: boolean) => void;
  onClickCandidates: (showCandidatesModal: boolean) => void;
  onRefreshCandidates: () => void;
}

const AccountActionsList: React.FC<IAccountActionsListProps> = ({
  candidateAddingInProgress,
  onClickCandidate,
  onClickCandidates,
  onRefreshCandidates,
}): JSX.Element => {
  return (
    <>
      <button className="Account-button" disabled={candidateAddingInProgress} onClick={() => onClickCandidate(true)}>
        Add Candidate
      </button>
      <button className="Account-button" disabled={candidateAddingInProgress} onClick={() => onClickCandidates(true)}>
        Add Candidates
      </button>
      <button className="Account-button" disabled={candidateAddingInProgress} onClick={() => onRefreshCandidates()}>
        Refresh Candidates
      </button>
    </>
  );
};

export default AccountActionsList;