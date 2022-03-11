import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { API_BASE_URL } from '../config';
import Blockchain from './Blockchain';

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
      <br/>
      <div className="wallet-info">
        <div className="WalletInfo">Address: {walletInfo.address}</div>
        <div className="WalletInfo">Balance: {walletInfo.balance}</div>
      </div>
      <br/>
      <Blockchain />
    </div>
  );
}

export default App;
