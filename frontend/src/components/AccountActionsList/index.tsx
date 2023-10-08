import React from 'react';

interface IAccountActionsListProps {
  candidateAddingInProgress: boolean;
  onClickCandidate: (showCandidateModal: boolean) => void;
  onRefreshCandidates: () => void;
}

const AccountActionsList: React.FC<IAccountActionsListProps> = ({
  candidateAddingInProgress,
  onClickCandidate,
  onRefreshCandidates,
}): JSX.Element => {
  return (
    <>
      <button className="Account-button" disabled={candidateAddingInProgress} onClick={() => onClickCandidate(true)}>
        Add Candidate
      </button>
      <button className="Account-button" disabled={candidateAddingInProgress} onClick={() => onRefreshCandidates()}>
        Refresh Candidates
      </button>
    </>
  );
};

export default AccountActionsList;
