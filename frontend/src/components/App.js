import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { API_BASE_URL } from '../config';
function App() {
  const [walletInfo, setWalletInfo] = useState({});

  useEffect(() => {
    fetch(`${API_BASE_URL}/wallet/info`)
      .then(res => res.json())
      .then(json => setWalletInfo(json));
  }, []);

  const { address, balance } = walletInfo;

  return (
    <div className="App">
      <img className="logo" src={logo} alt="application-logo" />
      <h3>Welcom To Climb Developer Chain</h3>
      <br />
      <Link to="/blockchain">Blockchain</Link>
      <Link to="/conduct-transaction">ConductTransaction</Link>
      <Link to="/transaction-pool">TransactionPool</Link>
      <br/>
      <div className="wallet-info">
        <div className="WalletInfo">Address: {walletInfo.address}</div>
        <div className="WalletInfo">Balance: {walletInfo.balance}</div>
      </div>
    </div>
  );
}

export default App;
