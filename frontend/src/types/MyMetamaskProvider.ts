export interface RequestArguments {
    method: string;
    params?: unknown[] | object;
}

interface ConnectInfo {
    chainId: string;
}

interface ProviderMessage {
    type: string;
    data: unknown;
}

interface ProviderRpcError extends Error {
    message: string;
    code: number;
    data?: unknown;
}

export interface Web3WalletPermission {
    // The name of the method corresponding to the permission
    parentCapability: string;

    // The date the permission was granted, in UNIX epoch time
    date?: number;
}

interface RequestedPermissions {
    [methodName: string]: {}; // an empty object, for future extensibility
}

interface AddEthereumChainParameter {
    chainId: string; // A 0x-prefixed hexadecimal string
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string; // 2-6 characters long
        decimals: 18;
    };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
    iconUrls?: string[]; // Currently ignored.
}

interface SwitchEthereumChainParameter {
    chainId: string; // A 0x-prefixed hexadecimal string
}

interface WatchAssetParams {
    type: 'ERC20'; // In the future, other standards will be supported
    options: {
        address: string; // The address of the token contract
        'symbol': string; // A ticker symbol or shorthand, up to 11 characters
        decimals: number; // The number of token decimals
        image: string; // A string url of the token logo
    };
}


export interface MyMetaMaskEthereumProvider {
    isMetaMask?: boolean;
    isConnected(): boolean;
//    request(args: RequestArguments): Promise<unknown>;
    on(type: 'connect', handler: (connectInfo: ConnectInfo) => void): void;
    on(type: 'disconnect', handler: (error: ProviderRpcError) => void): void;
    on(type: 'accountsChanged', handler: (accounts: Array<string>) => void): void;
    on(type: 'chainChanged', handler: (chainId: string) => void): void;
    on(type: 'message', handler: (message: ProviderMessage) => void): void;
    
    request(req: { method: 'eth_requestAccounts' }): Promise<string[]>;
    request(req: { method: 'wallet_requestPermissions', params: RequestedPermissions[] }): Promise<string[]>;
    request(req: { method: 'wallet_getPermissions' }): Promise<string>;
    request(req: { method: 'wallet_switchEthereumChain', params: [SwitchEthereumChainParameter] }): Promise<null>;
    request(req: { method: 'wallet_watchAsset', params: WatchAssetParams }): Promise<null>;
    request(req: { method: 'wallet_scanQRCode', params: string[] }): Promise<string>;
    request(req: { method: 'eth_chainId' }): Promise<string>;
    request(req: { method: 'wallet_addEthereumChain', params: [AddEthereumChainParameter] }): Promise<null>;

    once(eventName: string | symbol, listener: (...args: any[]) => void): this;
    //on(eventName: string | symbol, listener: (...args: any[]) => void): this;
    /**
    * @deprecated
    */
    off(eventName: string | symbol, listener: (...args: any[]) => void): this;
    /**
    * @deprecated
    */
    addListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
    /**
    * @deprecated
    */
    removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
    /**
    * @deprecated
    */
    removeAllListeners(event?: string | symbol): this;
};


