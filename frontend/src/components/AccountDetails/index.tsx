import React from 'react';

interface AccountDetailsProps {
  account?: string;
  voteAllowed?: boolean;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ account, voteAllowed }) => {
  if (!account) return null;

  return (
    <div className="Account-details">
      <span>{account}</span>
      {voteAllowed ? <span>Please cast your vote below!</span> : <span>You have already voted!</span>}
    </div>
  );
};

export default AccountDetails;
