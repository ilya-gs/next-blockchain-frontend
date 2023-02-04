import React from 'react'
import { DutchAuction } from '../../../typechain-types/DutchAuction';
import { useAppSelector } from '../common/contextHooks';
import BcView from './BcView';
import BcAction from './BcAction';
import BcConnectIcon from './BcConnectIcon';

type Props = {
    name: string
    instance: DutchAuction
}

export const Auction = ({ name, instance }: Props) => {
    
    const { item, stoped } = useAppSelector(state => state.blockchain.contracts[name]);
    

    if (stoped){
        return (
            <div><h4>{name}</h4>
                Auction Finished<br />
                <button>Buy</button>
            </div>
        )        
    }
    

    return (
        <div>
            <BcConnectIcon />
            <h4>{name}</h4>
            
            <BcView value={item} lable='Item:'/><br />
            Price: <BcView contract='auctionBike' field='price' format='u.fromWei2(v)'/><br />
            <BcAction action={async () => { await instance.buy() }}>Buy</BcAction>
        </div>
    )
}