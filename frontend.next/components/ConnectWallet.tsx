import React, { FC, MouseEventHandler } from 'react'
import NetworkErrorMessage from './NetworkErrorMessage'

//====================================================//

type Props = {
    connectWallet: MouseEventHandler<HTMLButtonElement>,
    networkError: string,
    dismiss(): void
}

//====================================================//

const ConnectWallet: FC<Props> = ({ connectWallet, networkError, dismiss }) => {
    return (
        <>
            <div>
                {networkError && (
                    <NetworkErrorMessage
                        message={networkError}
                        dismiss={dismiss}
                    />
                )}
            </div>

            <p>Please connect your account...</p>
            <button type="button" onClick={connectWallet}>
                Connect Wallet
            </button>
        </>
    )
}

//====================================================//

export default ConnectWallet