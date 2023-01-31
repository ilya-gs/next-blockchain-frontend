import React, { FC } from 'react'

//====================================================//

type Props = {
    message: string,
    dismiss(): void,
}

//====================================================//

const NetworkErrorMessage: FC <Props> = ({message,dismiss}) => {
    return (
        <div>
            {message}
            <button type="button" onClick={dismiss}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

//====================================================//

export default NetworkErrorMessage