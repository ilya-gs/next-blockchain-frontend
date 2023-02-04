import React, { FC, PropsWithChildren, useEffect, useState} from 'react'
import AskDialog, { CallbackAskDlg } from '../components/AskDialog';
import { sleep } from '../blockchain/functions';
import { State, Actions, initialState, reducer } from '../storage/reducer';
import { AskDialogCreator } from './contextHooks';
import { SnackbarProvider } from 'notistack';

export const CustomContext = React.createContext<{
    state: State,
    dispatch: React.Dispatch<Actions>,
    dialogCreator: AskDialogCreator
}>({ state: initialState, dispatch: null, dialogCreator: null} as any); 

//====================================================//

export type AppContextSate = {
    state: State;
    dispatch: React.Dispatch<Actions>;
    dialogCreator: AskDialogCreator;
}

//====================================================//

type Props = {
}

//====================================================//

const AppContext: FC<PropsWithChildren<Props>> = ({ children }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [options, setOpions] = useState<string[]>([]);
    const [text, setText] = useState<string>('');
    const [callBack, setCallback] = useState<CallbackAskDlg | undefined>();


    const [state, dispatch] = React.useReducer(reducer, initialState);
    const providerState: AppContextSate = { state, dispatch, dialogCreator };

    //====================================================//

    function dialogCreator(_title: string, _options: string[], _text: string): Promise<number> {
        setTitle(_title);
        setOpions(_options);
        setText(_text);

        return new Promise((resolve, reject) => {

            function callbackDlg(optionSelected: number) {
                console.log(optionSelected);
                setOpen(false);
                resolve(optionSelected);
            }

            setCallback(() => callbackDlg);
            setOpen(true);
        })
    }

    //====================================================//

    // useEffect(() => {
    //     sleep(5000).then(() => dialogCreator("title", ["yes", "no"], "text text").then((res) => console.log(res)));
        
    // }, []);

    //====================================================//

    return (
        <SnackbarProvider maxSnack={7}>
            <CustomContext.Provider value={providerState}>
                <AskDialog open={open} title={title} options={options} callback={callBack} text={text} />                
                {children} 
            </CustomContext.Provider>
        </SnackbarProvider>
    )
}

//====================================================//

export default AppContext