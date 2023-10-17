import { FC } from 'react';

interface IAccountActionsListProps {
  candidateAddingInProgress: boolean;
  onClickCandidate: (showCandidateModal: boolean) => void;
}

const AccountActionsList: FC<IAccountActionsListProps> = ({
  candidateAddingInProgress,
  onClickCandidate,
}): JSX.Element => {
  return (
    <>
      <button className="Account-button" disabled={candidateAddingInProgress} onClick={() => onClickCandidate(true)}>
        Add Candidate
      </button>
    </>
  );
};

export default AccountActionsList;
