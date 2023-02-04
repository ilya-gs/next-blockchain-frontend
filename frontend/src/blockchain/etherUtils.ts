import { ethers } from "ethers";
import { setup } from "../common/setup";
import { Ethereumish } from "../types/Ethereumish";
import { useRef } from 'react';
//import { initialState } from './reducer';
import { DeployedContracts, connectAll } from '../contracts/deployedContracts';
import { MyMetaMaskEthereumProvider } from "../types/MyMetamaskProvider";


interface EtheriumUtils{
    rpcProvider: undefined | ethers.providers.JsonRpcProvider,
    metamaskProvider: undefined | MyMetaMaskEthereumProvider,
    web3Provider: undefined | ethers.providers.Web3Provider,
    signer: ethers.Signer | undefined,
    signerAddress: string | undefined,
    isReadable: boolean,
    isWriteable: boolean,

    contracts: DeployedContracts; //{ [key: string]: ethers.Contract },
    contractsConnected: boolean;

    initRpcProvider(force?: boolean): Promise<boolean>,
    initMetamaskWeb3Provider(force?: boolean): Promise<boolean>,
    initInstances(provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider | ethers.Signer): Promise<boolean>,
    isCorrectCain(): Promise<boolean>,
    changeCain(): Promise<boolean>,
    // init(force?: boolean): Promise<boolean>,
}

export const eu: EtheriumUtils = {
    rpcProvider: undefined,
    metamaskProvider: undefined,
    signer: undefined,
    signerAddress: undefined,
    web3Provider: undefined,
    contracts: {} as DeployedContracts,
    contractsConnected: false,
    isReadable: false,
    isWriteable: false,
    //====================================================//

    async initRpcProvider(force=false){
        if(!eu.rpcProvider || force){
            eu.rpcProvider = new ethers.providers.JsonRpcProvider(setup.rpcProviderUrl);
        }
        eu.isReadable = !!eu.rpcProvider;
        return !!eu.rpcProvider;
    },

    //====================================================//

    async initMetamaskWeb3Provider(force = false) {
        try {
            if (!('ethereum' in window)) {
                eu.metamaskProvider = undefined;
                return false;
            }
            if (!eu.metamaskProvider || force) {
                eu.metamaskProvider = window.ethereum as MyMetaMaskEthereumProvider;
                await eu.metamaskProvider.request({ method: 'eth_requestAccounts' })
                eu.web3Provider = new ethers.providers.Web3Provider((window as any).ethereum);
                eu.signer = eu.web3Provider.getSigner();
                eu.signerAddress = await eu.signer?.getAddress();
                eu.contractsConnected=false;
                if (!eu.isCorrectCain()){
                    eu.changeCain();
                }
                eu.initInstances(eu.signer);
            }
        } catch (error) {
            eu.metamaskProvider = undefined;
            eu.web3Provider = undefined;
            eu.signer = undefined;
            eu.signerAddress = undefined;
            throw (error);
        }
        return !!eu.metamaskProvider;            
    },

    //====================================================//

    async initInstances(provider) {
        if (eu.contractsConnected === true)
            return true;
        try {

            this.contracts = connectAll(provider);

            //let aa = new ethers.Contract(deployedContracts[0].address, deployedContracts[0].abi, provider) as DutchAuction;
            //aa.item();

                eu.contractsConnected = true;
        } catch (error) {
            eu.contracts = {} as DeployedContracts;
            eu.contractsConnected = false;
            throw (error);
       }
        return true;
    },

    //====================================================//
    
    // async init(force = false)
    // {
    //     await eu.initRpcProvider();
    //     return true;
    // }
}


export function useEthereum(): EtheriumUtils {
    const ethRef = useRef<EtheriumUtils>();

    if (ethRef.current !== eu) {
        ethRef.current = eu;
    }

    return ethRef.current;
}


