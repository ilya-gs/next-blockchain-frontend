import React, { useEffect } from 'react';
import { OnboardingButton } from './components/OnboardingButton';
import { initialState, reducer } from './common/reducer';
import CustomContext from './common/context';
import Counter from './components/Counter';
import { eu, useEthereum } from './common/etherUtils';
import { setup } from './common/setup';

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const providerState = { state, dispatch };
  const eth = useEthereum();
  
  useEffect(() => {

    async function init() {

      await eth.initRpcProvider()
      await eth.initInstances(eth.rpcProvider!);

      const res = await eu.contracts.AuctionBike.item();
        console.log("🚀 ~ file: App.tsx:21 ~ eth.initInstances ~ res", res)
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
        Hello!!!<br />
        <Counter></Counter>
        <OnboardingButton />
        
      </div>
    </CustomContext.Provider>
  );
}

export default App;
