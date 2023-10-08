import { useState } from 'react';


interface IUseAccountProps {
  onSetAccount: (account: string) => void;
  onAddCandidate: (candidate: string) => void;
}

interface IUseAccountHookReturn {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showCandidateModal: boolean;
  setShowCandidateModal: React.Dispatch<React.SetStateAction<boolean>>;
  onHandleSetAccount: () => void;
  onHandleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleSave: () => void;
  onHandleCandidateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleCandidateSave: () => void;
  candidateInputValue: string;
  inputValue: string;
}

export default function useAccount({
  onSetAccount,
  onAddCandidate,
}: IUseAccountProps): IUseAccountHookReturn {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showCandidateModal, setShowCandidateModal] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [candidateInputValue, setCandidateInputValueInputValue] = useState<string>('');

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

  const onHandleSetAccount = (): void => {
    setShowModal(true);
  };

  return {
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
  };
}
