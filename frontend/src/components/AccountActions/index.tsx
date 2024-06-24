import { FC } from 'react';

import AccountActionsList from '../AccountActionsList';

interface IAccountActionsProps {
  account?: string;
  candidateAddingInProgress: boolean;
  onClickCandidate: (showCandidateModal: boolean) => void;
  onSetAccount: () => void;
}

const AccountActions: FC<IAccountActionsProps> = ({
  account,
  onClickCandidate,
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
        />
      )}
    </div>
  );
};

export default AccountActions;
