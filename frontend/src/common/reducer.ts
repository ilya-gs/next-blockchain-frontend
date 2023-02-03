import { MessageType } from './messageHook';
import { ethers } from 'ethers';


type BlockchainSlice = {
    contracts: { [key: string]: { [key: string]: string | ethers.BigNumber | boolean, } },
    walletConnected: boolean
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
    }
}

//====================================================//
//====================================================//

export type Actions =
    | ['INCREASE'] 
    | ['DECREASE']
    | ['SET', number ]
    | ['SEND_MESSAGE', { text: string, type: MessageType }]
    | ['SET_CONTRACT_FIELD', { contract: string, field: string, value: string | ethers.BigNumber | boolean }]

//====================================================//
//====================================================//

export function reducer(state: State, action: Actions): State {
    let payload;
    
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
            var newState = { ...state };
            newState.blockchain.contracts[payload.contract][payload.field] = payload.value;
            return newState;
        default:
            return state;
    }
}
