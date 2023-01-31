import path from "path";

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
        setup.artifactsPath = path.join(__dirname, '/..', 'frontend/contracts');
    }
}

