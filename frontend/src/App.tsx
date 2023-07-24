import { useContext, useEffect, useState } from "react";
import { Account } from "./components/Account";
import { Candidates } from "./components/Candidates";
import { ChainWebApiContext } from "./api/api";
import { useLocalStorage } from "usehooks-ts";

function App() {
  const [account, setAccount] = useLocalStorage<string>(
    "voting-dapp-account",
    ""
  );
  const [voteAllowed, setVoteAllowed] = useState<boolean>(false);
  const [voteInProgress, setVoteInProgress] = useState<boolean>(false);
  const api = useContext(ChainWebApiContext);

  useEffect(() => {
    if (!account) {
      return setVoteAllowed(false);
    }

    api
      .hasUserVoted(account)
      .then((voted) => {
        setVoteAllowed(!voted);
      })
      .catch(console.error);
  }, [account, api]);

  const onVote = (candidateKey: string) => {
    setVoteInProgress(true);
    api
      .vote(account, candidateKey)
      .catch((error) => console.log(error))
      .finally(() => setVoteInProgress(false));
  };

  return (
    <div>
      <header className="text-center bg-[#ed098f] min-h-[20vh] flex flex-col items-center justify-center font-bold text-white text-2xl">
        <p>Guide: Building a voting dApp</p>
      </header>
      <section className="mt-8 mx-auto max-w-[80%]">
        <Account
          onSetAccount={setAccount}
          account={account}
          voteAllowed={voteAllowed}
        />
        <Candidates
          voteAllowed={voteAllowed}
          voteInProgress={voteInProgress}
          onVote={onVote}
        />
      </section>
    </div>
  );
}

export default App;
