import React, { useEffect } from 'react';
import { initialState, reducer } from './common/reducer';
import CustomContext from './common/context';
import Counter from './components/Counter';
import { eu, useEthereum } from './common/etherUtils';
import { setup } from './common/setup';
import BcView from './blockchain/BcView';
import { Auction } from './blockchain/Auction';

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const providerState = { state, dispatch };
  const eth = useEthereum();
  
  useEffect(() => {

    async function init() {

      await eth.initRpcProvider()
      await eth.initInstances(eth.rpcProvider!);

      setInterval(async () => {
        const  item = await eu.contracts.AuctionBike.item();
        dispatch(['SET_CONTRACT_FIELD', { contract: "auctionBike", field: "item", value: item }])
        const price = await eu.contracts.AuctionBike.getPrice();
        dispatch(['SET_CONTRACT_FIELD', { contract: "auctionBike", field: "price", value: price }])
      }, 1000)
      
      const res = await eu.contracts.AuctionBike.item();
      console.log("🚀 ~ file: App.tsx:21 ~ eth.initInstances ~ res", eu.contracts.AuctionBike)
    }
    
    setup.init();
    init();

    return () => {
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <CustomContext.Provider value={providerState}>
      <div>
        <Auction name='auctionBike' instance={eu.contracts.AuctionBike}></Auction>
        <BcView contract='auctionBike' field='name' tooltip='test tt' lable='Name' />
      </div>
    </CustomContext.Provider>
  );
}

export default App;
