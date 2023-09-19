import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import './Account.css';
import { SpinnerRoundFilled } from 'spinners-react';

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
  candidateAddingInProgress
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

  const renderAddCandidateButton = () => (
    <button className="Account-button" disabled={candidateAddingInProgress} onClick={() => setShowCandidateModal(true)}>
      Add Candidate
    </button>
  );

  const renderAddCandidatesButton = () => (
    <button className="Account-button" disabled={candidateAddingInProgress} onClick={() => setShowCandidatesModal(true)}>
      Add Candidates
    </button>
  );

  const renderRefreshCandidatesButton = () => (
    <button className="Account-button" disabled={candidateAddingInProgress} onClick={() => onRefreshCandidates()}>
      Refresh Candidates
    </button>
  );

  return (
    <div className="Account">
      <h2>My Account</h2>
      {account && renderAccountDetails()}
      <div className="Account-buttons">
        <button className="Account-button" onClick={() => setShowModal(true)}>
          {account ? 'Update' : 'Set'} Account
        </button>
        {account && renderAddCandidateButton()}
        {account && renderAddCandidatesButton()}
        {account && renderRefreshCandidatesButton()}
      </div>
      {candidateAddingInProgress &&
        <div className="Candidates-progress">
          <span>Adding candidate...</span>
          <SpinnerRoundFilled size={30} color="#ed098f" />
        </div>
      }
      {showModal && (
        <Modal title="Provide your k:account" onClose={() => setShowModal(false)}>
          <div className="Account-input-wrapper">
            <input onChange={handleInputChange} value={inputValue} className="Account-input"></input>
            <button onClick={handleOnSaveClick}>Save</button>
          </div>
        </Modal>
      )}
      {showCandidateModal && (
        <Modal title="Add a candidate" onClose={() => setShowCandidateModal(false)}>
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
      )}
      {showCandidatesModal && (
        <Modal title="Add candidates" onClose={() => setShowCandidatesModal(false)}>
          <div className="Account-input-wrapper">
            <input
              onChange={handleCandidatesChange}
              value={candidatesInputValue}
              className="Account-input"
            />
            <button onClick={handleOnCandidatesSaveClick}>Save</button>
          </div>
        </Modal>
      )}
    </div>
  );
};
