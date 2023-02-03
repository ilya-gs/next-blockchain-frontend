import React from 'react'
import { DutchAuction } from '../../../typechain-types/DutchAuction';
import { useAppSelector } from '../common/context';
import { fromWei2 } from './functions';
import { ethers } from 'ethers';

type Props = {
    name: string
    instance: DutchAuction
}

export const Auction = ({ name, instance }: Props) => {
    
    const { item, price } = useAppSelector(state => state.blockchain.contracts[name]);

    return (
        <div><h4>{name}</h4>
            Item: {String(item)}<br />
            Price: {String(price)}<br />
            <button>Buy</button>
        </div>
    )
}