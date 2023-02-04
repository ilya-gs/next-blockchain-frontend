import React from 'react'
import { Button, Tooltip } from '@mui/material';
import { FC, PropsWithChildren } from 'react'
import { useSafe } from '../common/messageHook';
import { eu } from './etherUtils';
import { useAppSelector } from '../common/context';

// <BeView field="currentLccPrice" format='v.toFixed(2)'


//====================================================//

type Props = {
    action: () => Promise<any>,
    tooltip?: string,
    lable?: string,
    hideDisconnected?: boolean
    name?: string
}

const BcAction: FC<PropsWithChildren<Props>> = ({ action, lable, tooltip, name: button, children}) => {
    const walletConnected = useAppSelector(state => state.blockchain.walletConnected)
    const signer = eu.signer;
//    const message = useMessage();
    const safe = useSafe();

    /***********************************************************/

    function sendData() {
        if (signer){
            console.log('Action Sent');
            safe(action);
        }
    }

    /***********************************************************/
    
    if (!children)
        children = <>{ button }</>;

    if (!walletConnected){
        return (
            <Tooltip title={"Please connect Metamask!"} followCursor>
                <span>
                    <Button disabled variant="outlined" size="medium" onClick={sendData}>{children}</Button>
                </span>
            </Tooltip>
        )        
    }
    if(tooltip){
        return (
                <Tooltip title={tooltip}>
                    <Button variant="outlined" size="medium" onClick={sendData}>{children}</Button>
                </Tooltip>
        )
        
    }else
    {
        return (
                <Button variant="outlined" size="medium" onClick={sendData}>{children}</Button>
        )

    }

}

export default BcAction