import React, { useEffect, useState } from "react";
import "./App.css";
import Helpers from "./web3Helpers";

function App() {
  const [message, setMessage] = useState("");
  const [etherToEnter, setEtherToEnter] = useState("0.001");
  const [owner, setOwner] = useState(null);
  const [players, setPlayers] = useState(null);
  const [userAccount, setUserAccount] = useState(null);
  const [etherPrize, setEtherPrize] = useState(null);
  const [theWinner, setTheWinner] = useState(null);

  useEffect(() => {
    (async () => {
      const _owner = await Helpers.getOwner();
      setOwner(_owner);

      const _accounts = await Helpers.getDefaultAccount();
      setUserAccount(_accounts);

      const totalPlayers = await Helpers.getPlayers();
      setPlayers(totalPlayers.length);

      const totalEther = await Helpers.getTotalEther();
      setEtherPrize(totalEther);
    })();
  }, []);

  const onSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const account = await Helpers.getDefaultAccount();

      setMessage("Waiting on transactions success...");
      const result = await Helpers.Lottery.Enter(account, etherToEnter);
      console.log(result);
      setMessage(
        "transactions done; You have been Entered to the pool of luck"
      );
    } catch (error) {
      setMessage("Error happened");
      console.error(error);
    }
  };

  const pickWinnerClick = async () => {
    const account = await Helpers.getDefaultAccount();
    console.log(account);

    setMessage("Waiting on transactions success...");
    await Helpers.Lottery.PickWinner();
    setMessage("transactions done;");

    const winner = await Helpers.getOwner();
    setTheWinner(winner);
  };

  function OwnerSection(props: any) {
    // if (owner !== userAccount)
    return (
      <div>
        <h4>Ready to pick a winner?</h4>

        <button onClick={props.onClick}>Pick a winner!</button>

        <hr />
        <h4>{theWinner}</h4>
      </div>
    );
    // else return <div></div>;
  }

  return (
    <div className="App">
      <h2>Lottery Contract [{userAccount}]</h2>
      <p>This contract is managed by {owner}</p>
      <p>
        Currently {players} people entered, competing for {etherPrize} ether!
      </p>
      <hr />
      <form onSubmit={onSubmit}>
        <h4> want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input
            value={etherToEnter}
            onChange={(e) => setEtherToEnter(e.target.value)}
          />
        </div>
        <button>Enter</button>
      </form>
      <hr />

      <OwnerSection onClick={pickWinnerClick} />

      <h1>{message}</h1>
    </div>
  );
}

export default App;
