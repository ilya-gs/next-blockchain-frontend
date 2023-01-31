import React, { Component } from 'react'
import { Contract, ethers } from 'ethers'

import auctionAddress from '../contracts/DutchAuction-contract-address.json'
import auctionArtifact from '../contracts/DutchAuction.json'
import { SubresourceIntegrityPlugin } from 'next/dist/build/webpack/plugins/subresource-integrity-plugin'
import { network } from 'hardhat';
import { DutchAuction } from '../../typechain-types/DutchAuction';
import ConnectWallet from '../components/ConnectWallet';

const HARDHAT_NETWORK_ID = 1337;
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

//====================================================//

type Props = {}

//====================================================//

type State = {
  selectedAccount: string | null,
  txBeingSent: null,
  networkError: string | null,
  transactionError: null,
  balance: string | null,
}

//====================================================//
//====================================================//

export default class index extends Component<Props, State> {
  initialState = {
    selectedAccount: null,
    txBeingSent: null,
    networkError: null,
    transactionError: null,
    balance: null,
  }

  state = this.initialState;

  _auction: DutchAuction | null = null;
    
  ethProvider: ethers.providers.Web3Provider | null = null;
  
  //====================================================//
  //====================================================//

  constructor(props: Props)
  {
    super(props);

  }

  //====================================================//

  error(str: string | null) {
    this.ethProvider?.network
    this.setState({
      networkError: str
    })
  }

  //====================================================//

  _connectWallet = async () => {
    let winProvider, winProviderW3, winProviderEx;
    if (!('ethereum' in window)) {
      this.error("Please install MetaMask");
      return;
    }
    else {
      winProviderW3 = window.ethereum as ethers.providers.Web3Provider;
      winProviderEx = window.ethereum as ethers.providers.ExternalProvider;
      //this.ethProvider = window.ethereum as ethers.providers.Web3Provider;
      this.ethProvider = new ethers.providers.Web3Provider(winProviderEx);
    }
    
    if (!this.ethProvider)
      return;

    let [selectedAddress] = await this.ethProvider.send('eth_requestAccounts', []);

    if (!this._checkNetwork()) { return }

    this._initialize(selectedAddress)

    winProviderW3.on('accountsChanged', ([newAddress]) => {
      if (newAddress === undefined) {
        return this._resetState()
      }

      this._initialize(newAddress)
    })

    winProviderW3.on('chainChanged', ([networkId]) => {
      this._resetState()
    })

  }

  //====================================================//
  
  _resetState() {
    this.setState(this.initialState)
  }

  //====================================================//

  async _initialize(selectedAddress: string) {
    if (!this.ethProvider)
      return;
    
    this._auction = new ethers.Contract(
      auctionAddress.DutchAuction,
      auctionArtifact.abi,
      this.ethProvider.getSigner(0)
    ) as DutchAuction;

    this.setState({
      selectedAccount: selectedAddress
    }, async () => {
      await this.updateBalance()
    })
  }

  //====================================================//

  _checkNetwork(): boolean {
    if (this.ethProvider == null)
      return false;

    if (this.ethProvider.network?.chainId === HARDHAT_NETWORK_ID)
      return true;
    
    this.error('Please connect to localhost:8545')

    return false;
  }

  //====================================================//

  async updateBalance() {
    if (this.ethProvider === null || this.state.selectedAccount === null)
      return false;
    const newBalance = (await this.ethProvider.getBalance(
      this.state.selectedAccount
    )).toString()

    this.setState({
      balance: newBalance
    })
  }

  //====================================================//

  _dismissNetworkError = () => {
    this.error(null)
  }

  //====================================================//
  //====================================================//

  render() {
    if (!this.state.selectedAccount) {
      return <ConnectWallet
        connectWallet={this._connectWallet}
        networkError={this.state.networkError ? this.state.networkError : ''}
        dismiss={this._dismissNetworkError}
      />
    }

    return (
      <>
        {this.state.balance &&
          <p>Your balance: {ethers.utils.formatEther(this.state.balance)} ETH</p>}
      </>
    )
  }
}

