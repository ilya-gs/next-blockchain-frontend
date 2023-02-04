import React, { FC } from 'react'
import { useCustomContext } from '../common/context';

//====================================================//

type Props = {}

//====================================================//

const ErrorLoger: FC<Props> = (props) => {
    const { selector } = useCustomContext();
    
    return (
        <div>
            <div>Error: {selector((state) => state.message.text)}</div>
        </div>
    )
}

//====================================================//

export default ErrorLoger