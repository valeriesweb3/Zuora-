import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const ConnectWalletButton = () => {
  //const [wallet, setWallet] = useState(null);
  const [connectedAddress, setConnectedAddress] = useState('');

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        setConnectedAddress(accounts[0]);
      }
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        checkIfWalletIsConnected();
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      console.log('No ethereum object');
    }
  };

  return (
    <div>
      {connectedAddress ? (
        <p>Connected Address: {connectedAddress}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
