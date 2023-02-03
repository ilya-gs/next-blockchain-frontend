import React, { FC } from 'react'

//====================================================//

type Props = {value: any}

//====================================================//

const Dumper: FC <Props> = ({value}) => {
    return (
        <pre>
            {JSON.stringify(value, undefined, 4)} 
        </pre>
    )
}

//====================================================//

export default Dumper