import React, { FC } from 'react'
import * as utils from './functions';
import { useAppSelector } from '../common/context';
import { ContractFiledValue } from '../storage/reducer';
import { CircularProgress, Tooltip } from '@mui/material';

// <BcView contract='bank' field="stVer" format='v.toFixed(2)'


//====================================================//

type Props = {
    contract: string,
    field: string,
    format?: string,
    tooltip?: string,
    lable?: string,
    hideDisconnected?: boolean
} | {
    value: ContractFiledValue,
    format?: string,
    tooltip?: string,
    lable?: string,
    hideDisconnected?: boolean
}

//====================================================//

const BcView: FC<Props> = (props)=>{ 
    
    let v;
    const { format, hideDisconnected, lable, tooltip } = props;
    const state = useAppSelector(state => state);
    const { walletConnected, contracts } = state.blockchain;
    
    if (!('value' in props)) {
        const { contract, field } = props;
        if (contracts[contract] === undefined)
            return (
                <span>Contract param is wrong!!</span>
            )
        if (contracts[contract][field] === undefined)
            return (
                <span>Field param is wrong!!</span>
            )
        v = contracts[contract][field];
    }
    else
        v = props.value;

    if(hideDisconnected && !walletConnected)
    //    <span>Disconnected</span>
        return(
            <span></span>
        )

    //if (contracts[contract] === undefined || contracts[contract][field] === undefined)
    if(false)
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