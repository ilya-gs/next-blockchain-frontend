import { useRef } from "react";

//====================================================//


export type Setup = {
    initialized: boolean,
    rpcProviderUrl: string;
    artifactsPath: string;
    init(): void;
}

export const setup: Setup = {
    initialized: false,
    rpcProviderUrl: 'HTTP://127.0.0.1:8545',

    artifactsPath: '',

    init() {
        setup.initialized = true;
        setup.artifactsPath = (__dirname + '/../contracts');
    }
}

export function useSetup(): Setup {
    const setupRef = useRef<Setup>();
    
    if (!setup.initialized)
        setup.init()
    
    if (setupRef.current !== setup) {
        setupRef.current = setup;
    }
    
    return setupRef.current;
}

