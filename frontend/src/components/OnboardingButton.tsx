import React from 'react';
import {useState} from 'react';
import { Ethereumish } from '../types/Ethereumish';

let provider: Ethereumish = (window as any).ethereum;
const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect';
const CONNECTED_TEXT = 'Connected';

export function OnboardingButton() {
    const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
    const [isDisabled, setDisabled] = useState(false);
    const [accounts, setAccounts] = React.useState([]);


    React.useEffect(() => {
        if (accounts.length > 0) {
            setButtonText(CONNECTED_TEXT);
            setDisabled(true);
        } else {
            setButtonText(CONNECT_TEXT);
            setDisabled(false);
        }
    }, [accounts]);

    function handleNewAccounts(newAccounts: any) {
        setAccounts(newAccounts);
        console.log("AccountCanged");
    }

    //====================================================//

    function handleNewChain() {
        console.log("handleNewChain: ", provider.chainId);
    }

    React.useEffect(() => {

        
        if (!('ethereum' in window)) {
            return;
        }

        provider = window.ethereum as Ethereumish;
//        provider.request({ method: 'eth_requestAccounts' })
//            .then(handleNewAccounts);
        

        return () => {
            (window as any).ethereum.removeListener('accountsChanged', handleNewAccounts);
        };
        
        
    }, []);

    const onClick = () => {
        if (provider) {
            provider.request({ method: 'eth_requestAccounts' })
                .then((newAccounts: any) => {
                    setAccounts(newAccounts)
                    provider.on('accountsChanged', handleNewAccounts);
                    provider.on('chainChanged', handleNewChain);
                }

                );
        } else {
            
        }
    };
    return (
        <button disabled={isDisabled} onClick={onClick}>
            {buttonText}
        </button>
    );
}
