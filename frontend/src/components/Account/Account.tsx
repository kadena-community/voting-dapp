import { FC } from 'react';
import Modal from '../Modal';
import './Account.css';
import { SpinnerRoundFilled } from 'spinners-react';
import AccountDetails from '../AccountDetails';
import AccountActions from '../AccountActions';
import useAccount from './useAccount';

interface AccountProps {
  account: string;
  voteAllowed: boolean;
  onSetAccount: (account: string) => void;
  onAddCandidate: (candidate: string) => void;
  onRefreshCandidates: () => void;
  candidateAddingInProgress: boolean;
}

export const Account: FC<AccountProps> = ({
  account,
  voteAllowed,
  onSetAccount,
  onAddCandidate,
  onRefreshCandidates,
  candidateAddingInProgress,
}): JSX.Element => {
  const {
    showModal,
    setShowModal,
    showCandidateModal,
    setShowCandidateModal,
    onHandleSetAccount,
    onHandleInputChange,
    onHandleSave,
    onHandleCandidateChange,
    onHandleCandidateSave,
    candidateInputValue,
    inputValue,
  } = useAccount({
    onSetAccount,
    onAddCandidate,
  });

  return (
    <div className="Account">
      <h2>My Account</h2>
      <AccountDetails account={account} voteAllowed={voteAllowed} />
      <AccountActions
        account={account}
        candidateAddingInProgress={candidateAddingInProgress}
        onSetAccount={onHandleSetAccount}
        onClickCandidate={setShowCandidateModal}
        onRefreshCandidates={onRefreshCandidates}
      />

      {candidateAddingInProgress && (
        <div className="Candidates-progress">
          <span>Adding candidate...</span>
          <SpinnerRoundFilled size={30} color="#469279" />
        </div>
      )}
      <Modal title="Provide your account name (k:)" onClose={() => setShowModal(false)} open={showModal}>
        <div className="Account-input-wrapper">
          <input onChange={onHandleInputChange} value={inputValue} className="Account-input"></input>
          <button onClick={onHandleSave}>Set</button>
        </div>
      </Modal>
      <Modal title="Add a candidate" onClose={() => setShowCandidateModal(false)} open={showCandidateModal}>
        <div className="Account-input-wrapper">
          <input
            onChange={onHandleCandidateChange}
            value={candidateInputValue}
            className="Account-input"
            placeholder={'{ "key": "6", "name": "Kuromi" }'}
          />
          <button onClick={onHandleCandidateSave}>Add</button>
        </div>
      </Modal>
    </div>
  );
};
