import { useRef } from "react";

//====================================================//


export type Setup = {
    initialized: boolean,
    rpcProviderUrl: string;
    artifactsPath: string;
    chainId: number;
    chainIdHex: string;
    messageHideDuration: number;
    init(): void;
}

//====================================================//

export const setup: Setup = {
    initialized: false,
    rpcProviderUrl: 'http://127.0.0.1:8545',

    chainId: 31337,
    chainIdHex: "0x7a69",

    artifactsPath: '',

    messageHideDuration: 5000,

    init() {
        setup.initialized = true;
        setup.artifactsPath = (__dirname + '/../contracts');
    }
}

//====================================================//

export function useSetup(): Setup {
    const setupRef = useRef<Setup>();
    
    if (!setup.initialized)
        setup.init()
    
    if (setupRef.current !== setup) {
        setupRef.current = setup;
    }
    
    return setupRef.current;
}

