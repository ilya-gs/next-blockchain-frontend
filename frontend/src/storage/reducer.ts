import { MessageType } from '../common/messageHook';
import { ethers } from 'ethers';

export type ContractFiledValue = string | ethers.BigNumber | number | boolean | undefined;

type BlockchainSlice = {
    contracts: { [key: string]: { [key: string]: ContractFiledValue, } },
    walletConnected: boolean,
    walletAddress: string
}

export type State = {
    counter: number;
//    isLoading: boolean;
    message: { text: string, type: MessageType },
    blockchain: BlockchainSlice
}

export const initialState: State = {
    counter: 0,
    message: {text: '', type: 'Notice'},
    blockchain: {
        contracts: {
            auctionBike: { name: 'bk' },
            auctionCar: { name: 'cc' },
        },
        walletConnected: false,
        walletAddress: '',
    }
}

//====================================================//
//====================================================//

export type Actions =
    | ['INCREASE'] 
    | ['DECREASE']
    | ['SET', number ]
    | ['SEND_MESSAGE', { text: string, type: MessageType }]
    | ['SET_CONTRACT_FIELD', { contract: string, field: string, value: ContractFiledValue }]
    | ['SET_CONNECTION', { isConnected: boolean, address: string}]

//====================================================//
//====================================================//

export function reducer(state: State, action: Actions): State {
    let payload;
    var newState = { ...state };
    switch (action[0]) {
        case 'INCREASE':
            return { ...state, counter: state.counter + 1 };
        case "DECREASE":
            return { ...state, counter: state.counter - 1 };
        case "SET":
            payload = action[1];
            return { ...state, counter: payload};
        case "SEND_MESSAGE":
            payload = action[1];
            return { ...state, message: payload };
        case "SET_CONTRACT_FIELD":
            payload = action[1];
            newState.blockchain.contracts[payload.contract][payload.field] = payload.value;
            return newState;
        case "SET_CONNECTION":
            const {isConnected,address} = action[1];
            newState.blockchain.walletConnected = isConnected;
            newState.blockchain.walletAddress = address;
            return newState;
        default:
            return state;
    }
}
