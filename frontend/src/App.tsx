import React, { useEffect } from 'react';
import { eu, useEthereum } from './blockchain/etherUtils';
import { setup } from './common/setup';
import BcView from './blockchain/BcView';
import { Auction } from './blockchain/Auction';
import ErrorLoger from './components/ErrorLoger';
import { useSafe } from './common/messageHook';
import Dumper from './components/Dumper';
import { useAppDispatch, useAppSelector } from './common/contextHooks';


function App() {
  const dispatch=useAppDispatch()
  const eth = useEthereum();
  const safe = useSafe();

  useEffect(() => {

    async function init() {

      await eth.initRpcProvider()
      await eth.initInstances(eth.rpcProvider!);

      setInterval(async () => safe( async () => {
        const  item = await eu.contracts.AuctionBike.item();
        dispatch(['SET_CONTRACT_FIELD', { contract: "auctionBike", field: "item", value: item }])
        const price = await eu.contracts.AuctionBike.getPrice();
        dispatch(['SET_CONTRACT_FIELD', { contract: "auctionBike", field: "price", value: price }])
        const stoped = await eu.contracts.AuctionBike.stopped() ? 1 : 0;
        dispatch(['SET_CONTRACT_FIELD', { contract: "auctionBike", field: "stoped", value: stoped }])
      }, "Can't get contracts data"), 1000)
      
      console.log("🚀 ~ file: App.tsx:21 ~ eth.initInstances ~ res", eu.contracts.AuctionBike)
    }
    
    setup.init();
    init();

    return () => {
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
      <div>
        <Auction name='auctionBike' instance={eu.contracts.AuctionBike}></Auction>
        <BcView contract='auctionBike' field='name' tooltip='test tt' lable='Name' />
        <br />
        <br />
        <br />
        <br />
        <ErrorLoger></ErrorLoger>
        <Dumper value={useAppSelector((state) => state)}/>
      </div>
  );
}

export default App;
