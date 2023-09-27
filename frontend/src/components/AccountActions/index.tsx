import React from 'react';

import AccountActionsList from '../AccountActionsList';

interface IAccountActionsProps {
  account?: string;
  candidateAddingInProgress: boolean;
  onClickCandidate: (showCandidateModal: boolean) => void;
  onClickCandidates: (showCandidatesModal: boolean) => void;
  onRefreshCandidates: () => void;
  onSetAccount: () => void;
}

const AccountActions: React.FC<IAccountActionsProps> = ({
  account,
  onClickCandidate,
  onClickCandidates,
  onRefreshCandidates,
  onSetAccount,
  candidateAddingInProgress = false,
}) => {
  return (
    <div className="Account-buttons">
      <button className="Account-button" onClick={onSetAccount}>
        {account ? 'Update' : 'Set'} Account
      </button>
      {account && (
        <AccountActionsList
          candidateAddingInProgress={candidateAddingInProgress}
          onClickCandidate={onClickCandidate}
          onClickCandidates={onClickCandidates}
          onRefreshCandidates={onRefreshCandidates}
        />
      )}
    </div>
  );
};

export default AccountActions;
