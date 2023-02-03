import React, { FC } from 'react'
import { useCustomContext } from '../common/context';
import { useMessage, useSafe } from '../common/messageHook';
import Dumper from './Dumper';

//====================================================//

type Props = {}

//====================================================//

const Counter: FC<Props> = (props) => {
    const { state, dispatch } = useCustomContext();
//    const [count2,setCount2] = useState(0);
//    console.log("🚀 ~ file: Counter.tsx:13 ~ dispatch", dispatch)
//    console.log("🚀 ~ file: Counter.tsx:13 ~ state", state)
    const sendMessage = useMessage();
    const safe = useSafe();
    
    
    return (
        <div>
            <Dumper value={state} />
            <div>Error: {state.message.text}</div>
            <button onClick={() => dispatch(["INCREASE"])}>Increase</button>
            <button onClick={() => dispatch(["DECREASE"])}>Decrease</button><br />
            <button onClick={() => sendMessage("Some error", "Error")}>Message</button><br />
            <button onClick={() => safe(() => { throw new Error("Custom Error"); })}>Error</button>
            <button onClick={() => {
                console.log("🚀 ~ file: Counter.tsx:13 ~ dispatch", dispatch);
                console.log("🚀 ~ file: Counter.tsx:13 ~ state", state);
                //setCount2(count2 + 1);
            }}>Log</button><br />            
        </div>
    )
}

//====================================================//

export default Counter