import React, { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";

interface AccountProps {
  account: string;
  voteAllowed: boolean;
  onSetAccount: (account: string) => void;
}

export const Account: React.FC<AccountProps> = ({
  account,
  voteAllowed,
  onSetAccount,
}): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputValue(event.target.value);
  };

  const handleOnSaveClick = (): void => {
    setShowModal(false);
    onSetAccount(inputValue);
  };

  const renderAccountDetails = () => (
    <div className="flex flex-col items-start mb-3">
      <span>{account}</span>
      {voteAllowed ? (
        <span>Please cast your vote below!</span>
      ) : (
        <span>You have already voted!</span>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-start">
      <h2>My Account</h2>
      {account && renderAccountDetails()}
      <Button onClick={() => setShowModal(true)}>
        {`${account ? "Update" : "Set"} Account`}
      </Button>
      {showModal && (
        <Modal
          title="Provide your k:account"
          onClose={() => setShowModal(false)}
        >
          <div className="flex w-[500px]">
            <input
              onChange={handleInputChange}
              value={inputValue}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <Button className="ml-4" onClick={handleOnSaveClick}>
              Save
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
