import { DutchAuction } from '../../../typechain-types';
import { ethers } from 'ethers';

export type DeployedContracts = {
    AuctionBike: DutchAuction,
    AuctionCar: DutchAuction,
}

export function connectAll(provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider) : DeployedContracts
{
    let a: any = {};

    a['AuctionBike'] = new ethers.Contract(
        deployedContracts.AuctionBike.address,
        deployedContracts.AuctionBike.abi, provider
    ) as DutchAuction;

    a['AuctionCar'] = new ethers.Contract(
        deployedContracts.AuctionCar.address,
        deployedContracts.AuctionCar.abi, provider
    ) as DutchAuction;
    
    return a as DeployedContracts;
}


const deployedContracts =
{
    "AuctionBike": {
        "address": "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
        "contract": "DutchAuction",
        "abi": [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_startingPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_discountRate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "_item",
                        "type": "string"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "buyer",
                        "type": "address"
                    }
                ],
                "name": "Bought",
                "type": "event"
            },
            {
                "inputs": [],
                "name": "buy",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "discountRate",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "endsAt",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getPrice",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "item",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "nextBlock",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "seller",
                "outputs": [
                    {
                        "internalType": "address payable",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "startAt",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "startingPrice",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "stopped",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ]
    },
    "AuctionCar": {
        "address": "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e",
        "contract": "DutchAuction",
        "abi": [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_startingPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_discountRate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "_item",
                        "type": "string"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "buyer",
                        "type": "address"
                    }
                ],
                "name": "Bought",
                "type": "event"
            },
            {
                "inputs": [],
                "name": "buy",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "discountRate",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "endsAt",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getPrice",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "item",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "nextBlock",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "seller",
                "outputs": [
                    {
                        "internalType": "address payable",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "startAt",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "startingPrice",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "stopped",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ]
    }
}