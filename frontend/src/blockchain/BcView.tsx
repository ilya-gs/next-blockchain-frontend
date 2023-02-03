import { CircularProgress, Tooltip } from '@mui/material';
import React, { FC } from 'react'
import * as utils from './functions';
import { useAppSelector } from '../common/context';

// <BcView contract='bank' field="stVer" format='v.toFixed(2)'


//====================================================//

type Props = {
    contract: string,
    field: string,
    format?: string,
    tooltip?: string,
    lable?: string,
    hideDisconnected?: boolean
}

//====================================================//

const BcView: FC<Props> = ({contract,field,format,tooltip,lable, hideDisconnected})=>{ 
    
    const {contracts,walletConnected} = useAppSelector(state => state.blockchain)
    const state = useAppSelector(state => state)
    
    if(contracts[contract] === undefined)
        return (
            <span>Contract param is wrong!!</span>
       )
    if(contracts[contract][field] === undefined)
        return (
            <span>Field param is wrong!!</span>
        )

    if(hideDisconnected && !walletConnected)
    //    <span>Disconnected</span>
        return(
            <span></span>
        )

    if (contracts[contract] === undefined || contracts[contract][field] === undefined)
    //if(true)
        return (
            <span>
                {lable}
                <Tooltip title='Loading...'>
                    <CircularProgress 
                        size='12px'
                        sx={{
                            
                            position: 'relative',
                            top: '50%',
                            
                                
                        }}
                />
                </Tooltip>
            </span>
        );
    
    let v=contracts[contract][field];

    if(format)
    {
        // eslint-disable-next-line no-new-func
        const formatFunction= new Function('v','s','u', 'return ('+ format + ')');
        v=formatFunction(v,state,utils);
//        console.log(parseFloat(v).toFixed(2));
        
    }
    //console.log("BcView : tooltip", tooltip);
    if(tooltip){
        return (
            <span>{lable} <Tooltip title={tooltip}><span>{String(v)}</span></Tooltip></span>
        )
        
    }else{
        return (
            <span>{lable} {String(v)}</span>
        )

    }

}

export default BcView