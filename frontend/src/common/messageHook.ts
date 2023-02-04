import { useCustomContext } from './contextHooks';
import { Actions } from '../storage/reducer';

type SyncFunction<T = unknown> = () => T;
type AsyncFunction<T = unknown> = () => Promise<T>;

//====================================================//

export type MessageType = "Error" | "Warning" | "Notice" | "Success"

//====================================================//

export function useMessage(dispatch: React.Dispatch<Actions> | null = null): (text: string, y?: MessageType) => void {
    const dispatchFromContext = useCustomContext().dispatch;
    if (dispatch === null)
        dispatch = dispatchFromContext;
    return function (text: string, type?: MessageType): void  {
        dispatch!(['SEND_MESSAGE', { text: text, type: type===undefined ? "Notice" : type }]);
    }
}

//====================================================//
//====================================================//

export function useSafe(dispatch: React.Dispatch<Actions> | null = null): <T = unknown>(f: AsyncFunction<T>, customError?: string) => T | undefined | Promise<T | undefined>{
    const sendMessage = useMessage(dispatch);
    
    //====================================================//
    
    const safeAwait = async <T> (f: AsyncFunction<T>, customError?: string): Promise<T | undefined> => {
        return new Promise<T>((resolve, reject) => {
            f().then(v => {
                return v;
            }).catch((e) => {
                if (customError !== undefined)
                    sendMessage(customError, "Error");
                else {
                    if (typeof e === "string") {
                        sendMessage(e, "Error");
                    } else if (typeof e === "object") {
                        sendMessage((e as any).message, "Error");
                    }
                }
                return undefined;
            })
        });
    }

    /*const safeAwaitResolver = <T>(f: AsyncFunction<T>, customError?: string): T | undefined => {
        f().then((val) => {
            return val;
        }).catch((e) => {
            if (customError !== undefined)
                sendMessage(customError, "Error");
            else {
                if (typeof e === "string") {
                    sendMessage(e, "Error");
                } else if (typeof e === "object") {
                    sendMessage((e as any).message, "Error");
                }                
            }
        });
        return undefined;
    }*/

    //====================================================//

    const safe = <T>(f: SyncFunction<T>, customError?: string ): T | undefined => {
        try {
            return f();
        } catch (e) {
            if (customError !== undefined)
                sendMessage(customError, "Error");
            else {
                if (typeof e === "string") {
                    sendMessage(e, "Error");
                } else if (typeof e === "object") {
                    sendMessage((e as any).message, "Error");
                }
            }
            return undefined;
        }
    }

    //====================================================//

    const safeSelector = <T>(f: SyncFunction<T> | AsyncFunction<T>, customError: string | undefined = undefined): T | undefined | Promise<T | undefined> => {
        const isAsync = f.constructor.name === "AsyncFunction";
        if (isAsync){
            return safeAwait(f as AsyncFunction<T>, customError);
        }
        else {
            return safe(f as SyncFunction<T>, customError);
        }
    }

    return safeSelector;
}