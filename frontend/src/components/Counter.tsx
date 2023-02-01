import React, { FC } from 'react'
import { useCustomContext } from '../common/context';

//====================================================//

type Props = {}

//====================================================//

const Counter: FC<Props> = (props) => {
    const { state, dispatch } = useCustomContext();
    return (
        <div>
            <div>Counter: {state.counter}</div>
            <div>Error: {state.error}</div>
            <button onClick={() => dispatch(["INCREASE"])}>Increase</button>
            <button onClick={() => dispatch(["DECREASE"])}>Decrease</button>
        </div>
    )
}

//====================================================//

export default Counter