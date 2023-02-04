import React from 'react'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useAppDispatch, useAppSelector } from '../common/context';
//import { useSelector,useDispatch } from 'react-redux';
//import {asyncConnectWallet, disconnectWallet} from '../store/blockchainSlice';
import { useSafe } from '../common/messageHook';
//import { sleep } from './functions';
import { eu } from './etherUtils';

function BcConnectIcon() {
  const { walletConnected, walletAddress } = useAppSelector(state => state.blockchain);
  const safe = useSafe();

  const dispatch=useAppDispatch();

  function handleConnect()
  {
      if(!walletConnected)
        safe(async () => {
          //await sleep(2000);
          if (await eu.initMetamaskWeb3Provider()) {
            //console.log("Connected");
            dispatch(['SET_CONNECTION', { isConnected: true, address: eu.signerAddress! }])            
          }
        })
      else
        safe(async () => {
          //await sleep(2000);
          console.log("Disnnected");
          dispatch(['SET_CONNECTION', { isConnected: false, address: "" }])
          throw new Error("Test Error");
        })

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