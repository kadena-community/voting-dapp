import {useContext, useEffect, useState} from "react";
import {Candidates} from "./components/Candidates";
import {ChainWebApiContext} from "./api/api";
import {useLocalStorage} from "usehooks-ts";
import {InlineAccount} from "./components/InlineAccount.tsx";

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
    <>
      <header className="container mx-auto mt-6 p-2 flex items-center flex-wrap md:flex-nowrap md:p-0">
        <img src="/logo.svg" width={68} height={68} alt="Kadena logo" />
        <h1 className="ml-6 font-extrabold text-2xl flex-1 basis-1/2 text-right md:text-left">Guide: Building a voting dApp</h1>
        <InlineAccount onChange={setAccount} account={account} voted={voteAllowed} />
      </header>
      <section className="mt-8 mx-auto container">
        <Candidates
          voteAllowed={voteAllowed}
          voteInProgress={voteInProgress}
          onVote={onVote}
        />
      </section>
    </>
  );
}

export default App;
