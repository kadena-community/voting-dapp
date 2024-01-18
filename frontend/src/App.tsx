import React, { useState, useEffect, useCallback } from 'react';
import { Account } from './components/Account/Account';
import { Candidates } from './components/Candidates/Candidates';
import './App.css';
import { voteService } from './services/VoteService';
import { candidateService } from './services/CandidateService';
import { ICandidate } from './types';

const App: React.FC = (): JSX.Element => {
  const [account, setAccount] = useState<string>('');
  const [voteAllowed, setVoteAllowed] = useState<boolean>(false);
  const [voteInProgress, setVoteInProgress] = useState<boolean>(false);
  const [candidateAddingInProgress, setCandidateAddingInProgress] = useState<boolean>(false);
  const [candidates, setCandidates] = useState<ICandidate[]>([]);

  const loadCandidates = async () => {
    const candidates = await candidateService.listCandidates();
    setCandidates(candidates);
  };

  const getVoteStatus = useCallback(async () => {
    if (account) {
      const voted = await voteService.hasAccountVoted(account);
      setVoteAllowed(!voted);
    } else {
      setVoteAllowed(false);
    }
    if (candidateAddingInProgress === false) {
      loadCandidates();
    }
  }, [account, candidateAddingInProgress]);

  useEffect(() => {
    getVoteStatus();
  }, [account, getVoteStatus]);

  const onVote = async (candidateId: string): Promise<void> => {
    setVoteInProgress(true);
    await voteService.vote(account, candidateId);
    await getVoteStatus();
    setVoteInProgress(false);
  };

  const addCandidate = async (candidate: string): Promise<void> => {
    setCandidateAddingInProgress(true);
    await candidateService.addCandidate(JSON.parse(candidate) as ICandidate, account);
    setCandidateAddingInProgress(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Workshop: Election application</p>
      </header>
      <section className="Voting-section">
        <Account
          onSetAccount={setAccount}
          onAddCandidate={addCandidate}
          account={account}
          voteAllowed={voteAllowed}
          candidateAddingInProgress={candidateAddingInProgress}
        />
        <Candidates voteAllowed={voteAllowed} voteInProgress={voteInProgress} onVote={onVote} candidates={candidates} />
      </section>
    </div>
  );
};

export default App;
