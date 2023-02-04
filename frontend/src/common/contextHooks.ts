import React from 'react';
import { CustomContext } from './AppContext';
import { Actions, State } from '../storage/reducer';

//====================================================//
type P = typeof useAppSelector;

export function useCustomContext(): { selector: P, dispatch: React.Dispatch<Actions> } {
    return {
        selector: useAppSelector,
        dispatch: React.useContext(CustomContext).dispatch
    };
}

//====================================================//

type Selector<T, R> = (state: T) => R;

export function useAppSelector<Selected = unknown>(f: Selector<State,Selected>): Selected {
    return f(React.useContext(CustomContext).state);
}

//====================================================//

export function useAppDispatch(): React.Dispatch<Actions> {
    return React.useContext(CustomContext).dispatch;
}

//====================================================//
export type AskDialogCreator = (_title: string, _options: string[], _text: string) => Promise<number>

export function useAskDialog(): AskDialogCreator {
    return React.useContext(CustomContext).dialogCreator;
}
