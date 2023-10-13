import { FC } from 'react';

import AccountActionsList from '../AccountActionsList';

interface IAccountActionsProps {
  account?: string;
  candidateAddingInProgress: boolean;
  onClickCandidate: (showCandidateModal: boolean) => void;
  onRefreshCandidates: () => void;
  onSetAccount: () => void;
}

const AccountActions: FC<IAccountActionsProps> = ({
  account,
  onClickCandidate,
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
          onRefreshCandidates={onRefreshCandidates}
        />
      )}
    </div>
  );
};

export default AccountActions;
