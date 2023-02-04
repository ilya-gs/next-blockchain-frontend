import React, { FC } from 'react'
import { useCustomContext } from '../common/contextHooks';
import { useSnackbar } from 'notistack';
import { MessageType } from '../common/messageHook';
import { setup } from '../common/setup';

//====================================================//

type Props = {}

//====================================================//

let g_Prev: { text: string, type: MessageType } | undefined= undefined;

const MessageViewer: FC<Props> = (props) => {
    const { selector, dispatch } = useCustomContext();
    const { enqueueSnackbar } = useSnackbar();
    //const prevMessage = useRef< string  | undefined>(undefined);

    const message = selector((state) => state.message);
    
    // useEffect(() => {
    //     if (message) {
    //         enqueueSnackbar(message.text, { variant: message.type });
    //         setTimeout(() => dispatch(['CLEAR_MESSAGE']), 10);
    //     }
    // }, [message]);

    if (message)
    {
        console.log("🚀 ~ file: MessageViewer.tsx:44 ~ message", message)
        
        if (g_Prev !== message) {
            console.log("🚀 ~ file: MessageViewer.tsx:34 ~ g_Prev", g_Prev)
            //prevMessage.current = message.text;
            g_Prev = message;
            setTimeout(() => enqueueSnackbar(message.text, { variant: message.type , autoHideDuration: setup.messageHideDuration}), 100);
            setTimeout(() => dispatch(['CLEAR_MESSAGE']), 10000);
        }
    }
    else
        g_Prev = undefined;

    return (
        <></>
    )
}

//====================================================//

export default MessageViewer