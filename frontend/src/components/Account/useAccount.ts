import { useState } from 'react';

interface IUseAccountProps {
  onSetAccount: (account: string) => void;
  onAddCandidate: (candidate: string) => void;
  onAddCandidates: (candidates: string) => void;
}

interface IUseAccountHookReturn {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showCandidateModal: boolean;
  setShowCandidateModal: React.Dispatch<React.SetStateAction<boolean>>;
  showCandidatesModal: boolean;
  setShowCandidatesModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSetAccount: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSaveClick: () => void;
  handleCandidateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnCandidateSaveClick: () => void;
  handleCandidatesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnCandidatesSaveClick: () => void;
  candidateInputValue: string;
  candidatesInputValue: string;
  inputValue: string;
}

export default function useAccount({
  onSetAccount,
  onAddCandidate,
  onAddCandidates,
}: IUseAccountProps): IUseAccountHookReturn {
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

  const handleSetAccount = (): void => {
    setShowModal(true);
  };

  return {
    showModal,
    setShowModal,
    showCandidateModal,
    setShowCandidateModal,
    showCandidatesModal,
    setShowCandidatesModal,
    handleSetAccount,
    handleInputChange,
    handleOnSaveClick,
    handleCandidateChange,
    handleOnCandidateSaveClick,
    handleCandidatesChange,
    handleOnCandidatesSaveClick,
    candidateInputValue,
    candidatesInputValue,
    inputValue,
  };
}
