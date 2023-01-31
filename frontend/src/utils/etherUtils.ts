import { ethers } from "ethers";
import { setup } from "./setup";
import { Ethereumish } from "../types/Ethereumish";
import path from "path";


interface EtheriumUtils{
    rpcProvider: undefined | ethers.providers.JsonRpcProvider,
    metamaskProvider: undefined | Ethereumish,
    web3Provider: undefined | ethers.providers.Web3Provider,
    signer: ethers.Signer | undefined,
    signerAddress: string | undefined,

    instances:  {[key: string]: ethers.Contract},

    initRpcProvider(force: boolean): Promise<boolean>,
    initMetamaskWeb3Provider(force: boolean): Promise<boolean>,
    initInstances(provider: ethers.providers.Web3Provider): Promise<void>,
}

export const eu: EtheriumUtils = {
    
    rpcProvider: undefined,
    metamaskProvider: undefined,
    signer: undefined,
    signerAddress: undefined,
    web3Provider: undefined,

    instances: {},

    async initRpcProvider(force=false){
        if(!eu.rpcProvider || force){
            eu.rpcProvider = new ethers.providers.JsonRpcProvider(setup.rpcProviderUrl);
        }
        return !!eu.rpcProvider;
    },

    async initMetamaskWeb3Provider(force = false) {
        if (!('ethereum' in window)) {
            eu.metamaskProvider = undefined;
            return false;            
        }
        if (!eu.metamaskProvider || force) {
            eu.metamaskProvider = window.ethereum as Ethereumish;
            //let [selectedAddress] =await eu.metamaskProvider.request({ method: 'eth_requestAccounts' })
        }

        if (!eu.web3Provider || force) {
            eu.web3Provider = new ethers.providers.Web3Provider((window as any).ethereum);
            eu.signer = eu.web3Provider.getSigner();
            eu.signerAddress = await eu.signer?.getAddress();
        }

        return !!eu.metamaskProvider;
    },

    async initInstances(provider)
    {
        const fileName = path.join(setup.artifactsPath, "/deployedContracts.json"); 
        const deployedContracts = require(fileName) as { name: string, contract: string, address: string }[];
        
        deployedContracts.forEach((contract_item) => {
            const { name, contract, address } = contract_item;
            const contractJson = require(path.join(setup.artifactsPath,`/${contract}.json`))
            eu.instances[name] = new ethers.Contract(address, contractJson.abi, provider);
        })
    }

}

