import React from 'react'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useAppDispatch, useAppSelector, useAskDialog } from '../common/contextHooks';
//import { useSelector,useDispatch } from 'react-redux';
//import {asyncConnectWallet, disconnectWallet} from '../store/blockchainSlice';
import { useSafe, useMessage } from '../common/messageHook';
//import { sleep } from './functions';
import { eu } from './etherUtils';
import { useSetup } from '../common/setup';
import { ProviderRpcError } from 'hardhat/types';

function BcConnectIcon() {
  const { walletConnected, walletAddress } = useAppSelector(state => state.blockchain);
  const safe = useSafe();
  const setup = useSetup();
  const askDialog = useAskDialog();
  const message = useMessage();

  const dispatch=useAppDispatch();

  //====================================================//



  //====================================================//

  async function changeChain(): Promise<boolean> {
    try {
      //switch chain
      await eu.metamaskProvider?.request({ method: "wallet_switchEthereumChain", params: [{ chainId: setup.chainIdHex }] });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        let response = await askDialog("New chahin", ["Ok", "Cancel"], "It seems Metamask don't know chain. Do You want to add chain and switch to it?")
        if (response !== 0) {
          dispatch(['SET_CONNECTION', { isConnected: false, address: "" }])
          return false;
        }
        //add chain
        try {
          await eu.metamaskProvider?.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: setup.chainIdHex,
              chainName: 'HardHat Local Network',
              nativeCurrency: {
                decimals: 18,
                name: "ETH Fake",
                symbol: 'ETH_FK',
              },
              rpcUrls: [setup.rpcProviderUrl]
            }]
          })          
        } catch (error: any) {
          dispatch(['SET_CONNECTION', { isConnected: false, address: "" }])
          eu.disconnectMetamask();
          throw new Error(error);          
        }

        //switch chain
        try {
          await eu.metamaskProvider?.request({ method: "wallet_switchEthereumChain", params: [{ chainId: setup.chainIdHex }] });          
        } catch (error: any) {
          dispatch(['SET_CONNECTION', { isConnected: false, address: "" }])
          throw new Error(error);
        }
        return true;
      }
    }              
    return true;
  }
  
  //====================================================//
  
  function handleConnect() {
    if (!walletConnected) {
      safe(async () => {
        //await sleep(2000);
        if (await eu.initMetamaskWeb3Provider()) {
          if (!eu.metamaskProvider) {
            dispatch(['SET_CONNECTION', { isConnected: false, address: "" }])
            eu.disconnectMetamask();
            message("Can't connect Metamask provider. Metamask is not installed?")
            return;
          }
            
          if (!(await eu.isCorrectChain())) {
            let response = await askDialog("Wrong chahin", ["Ok", "Cancel"], "Do You want to swithch wallet to correct chain in order the site works properly?")
            if (response !== 0) {
              dispatch(['SET_CONNECTION', { isConnected: false, address: "" }])
              eu.disconnectMetamask();
              return;
            }

            await changeChain();
          }

          //====================================================//

          eu.metamaskProvider.on("disconnect", async (err: ProviderRpcError) => {
            console.log(err);
            dispatch(['SET_CONNECTION', { isConnected: false, address: "" }])
            await eu.disconnectMetamask();
            eu.metamaskProvider?.removeAllListeners();
          });

          //====================================================//

          eu.metamaskProvider.on("accountsChanged", async (accounts: Array<string>) => {
            dispatch(['SET_CONNECTION', { isConnected: false, address: "" }])
            await eu.metamaskProvider?.removeAllListeners();
            eu.disconnectMetamask();
            handleConnect();
            if (await eu.initMetamaskWeb3Provider()) {
              if (!eu.metamaskProvider) {
                return;
              }
            }
          });

          eu.metamaskProvider.on("chainChanged", async (chainId: string) => {
            if (await eu.isCorrectChain())
              return;
            dispatch(['SET_CONNECTION', { isConnected: false, address: "" }])
            await eu.metamaskProvider?.removeAllListeners();
            eu.disconnectMetamask();
            handleConnect();
            if (await eu.initMetamaskWeb3Provider()) {
              if (!eu.metamaskProvider) {
                return;
              }
            }
          });
          
          //====================================================//


          dispatch(['SET_CONNECTION', { isConnected: true, address: eu.signerAddress! }])
        }
      })
    }
    else {
      message("Disconnected");
      dispatch(['SET_CONNECTION', { isConnected: false, address: "" }])
    }
  }    

  return (
    <Tooltip title={ walletConnected ?  'Wallet connected: '+walletAddress : 'Click to connect Wallet'} >
                  <IconButton color="inherit" onClick={handleConnect}>
                      { walletConnected ? <AccountBalanceWalletIcon /> : <AccountBalanceWalletOutlinedIcon/>} 
                  </IconButton>
    </Tooltip>
  )
}

export default BcConnectIcon