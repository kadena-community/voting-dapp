import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import './Account.css';
import { SpinnerRoundFilled } from 'spinners-react';
import AccountActions from '../AccountActions';

interface AccountProps {
  account: string;
  voteAllowed: boolean;
  onSetAccount: (account: string) => void;
  onAddCandidate: (candidate: string) => void;
  onAddCandidates: (candidates: string) => void;
  onRefreshCandidates: () => void;
  candidateAddingInProgress: boolean;
}

export const Account: React.FC<AccountProps> = ({
  account,
  voteAllowed,
  onSetAccount,
  onAddCandidate,
  onAddCandidates,
  onRefreshCandidates,
  candidateAddingInProgress,
}): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showCandidateModal, setShowCandidateModal] = useState<boolean>(false);
  const [showCandidatesModal, setShowCandidatesModal] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [candidateInputValue, setCandidateInputValueInputValue] = useState<string>('');
  const [candidatesInputValue, setCandidatesInputValueInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleOnSaveClick = (): void => {
    setShowModal(false);
    onSetAccount(inputValue);
  };

  const handleCandidateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCandidateInputValueInputValue(event.target.value);
  };

  const handleOnCandidateSaveClick = (): void => {
    setShowCandidateModal(false);
    onAddCandidate(candidateInputValue);
  };

  const handleCandidatesChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCandidatesInputValueInputValue(event.target.value);
  };

  const handleOnCandidatesSaveClick = (): void => {
    setShowCandidatesModal(false);
    onAddCandidates(candidatesInputValue);
  };

  const renderAccountDetails = () => (
    <div className="Account-details">
      <span>{account}</span>
      {voteAllowed ? <span>Please cast your vote below!</span> : <span>You have already voted!</span>}
    </div>
  );

  return (
    <div className="Account">
      <h2>My Account</h2>
      <AccountDetails account={account} voteAllowed={voteAllowed} />
      <AccountActions
        account={account}
        candidateAddingInProgress={candidateAddingInProgress}
        onSetAccount={handleSetAccount}
        onClickCandidate={setShowCandidateModal}
        onClickCandidates={setShowCandidatesModal}
        onRefreshCandidates={onRefreshCandidates}
      />

      {candidateAddingInProgress && (
        <div className="Candidates-progress">
          <span>Adding candidate...</span>
          <SpinnerRoundFilled size={30} color="#ed098f" />
        </div>
      )}
      <Modal title="Provide your k:account" onClose={() => setShowModal(false)} open={showModal}>
        <div className="Account-input-wrapper">
          <input onChange={handleInputChange} value={inputValue} className="Account-input"></input>
          <button onClick={handleOnSaveClick}>Save</button>
        </div>
      </Modal>
      <Modal title="Add a candidate" onClose={() => setShowCandidateModal(false)} open={showCandidateModal}>
        <div className="Account-input-wrapper">
          <input
            onChange={handleCandidateChange}
            value={candidateInputValue}
            className="Account-input"
            placeholder={'{ "key": "6", "name": "Kuromi" }'}
          />
          <button onClick={handleOnCandidateSaveClick}>Save</button>
        </div>
      </Modal>
      <Modal title="Add candidates" onClose={() => setShowCandidatesModal(false)} open={showCandidatesModal}>
        <div className="Account-input-wrapper">
          <input onChange={handleCandidatesChange} value={candidatesInputValue} className="Account-input" />
          <button onClick={handleOnCandidatesSaveClick}>Save</button>
        </div>
      </Modal>
    </div>
  );
};
