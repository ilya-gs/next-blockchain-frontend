import { useCustomContext } from './context';

//====================================================//

export type MessageType = "Error" | "Warning" | "Notice" | "Success"

//====================================================//

export function useMessage(): (text: string, y: MessageType) => void {
    const { dispatch } = useCustomContext();
    return function (text: string, type: MessageType): void  {
        dispatch(['SEND_MESSAGE', { text: text, type: type }]);
    }
}

//====================================================//

export function useSafe(): (f: () => any) => boolean
{
    const sendMessage = useMessage();
    const ret = (f: () => any ): boolean => {
        try {
            f();
            return true;
        } catch (e) {
            if (typeof e === "string") {
                sendMessage(e, "Error"); 
            } else if (typeof e === "object") {
                sendMessage((e as any).message, "Error"); 
            }
            return false;
        }
    }
    return ret;
}
