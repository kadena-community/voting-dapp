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
  onHandleSetAccount: () => void;
  onHandleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleSave: () => void;
  onHandleCandidateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleCandidateSave: () => void;
  onHandleCandidatesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleCandidatesSave: () => void;
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

  const onHandleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const onHandleSave = (): void => {
    setShowModal(false);
    onSetAccount(inputValue);
  };

  const onHandleCandidateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCandidateInputValueInputValue(event.target.value);
  };

  const onHandleCandidateSave = (): void => {
    setShowCandidateModal(false);
    onAddCandidate(candidateInputValue);
  };

  const onHandleCandidatesChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCandidatesInputValueInputValue(event.target.value);
  };

  const onHandleCandidatesSave = (): void => {
    setShowCandidatesModal(false);
    onAddCandidates(candidatesInputValue);
  };

  const onHandleSetAccount = (): void => {
    setShowModal(true);
  };

  return {
    showModal,
    setShowModal,
    showCandidateModal,
    setShowCandidateModal,
    showCandidatesModal,
    setShowCandidatesModal,
    onHandleSetAccount,
    onHandleInputChange,
    onHandleSave,
    onHandleCandidateChange,
    onHandleCandidateSave,
    onHandleCandidatesChange,
    onHandleCandidatesSave,
    candidateInputValue,
    candidatesInputValue,
    inputValue,
  };
}
