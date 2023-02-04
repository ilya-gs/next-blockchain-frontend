import React from 'react';
import { State, Actions, initialState } from '../storage/reducer';

type P = typeof useAppSelector;

const CustomContext = React.createContext<{ state: State, dispatch: React.Dispatch<Actions> }>({ state: initialState, dispatch: null } as any); 

export function useCustomContext(): { selector: P, dispatch: React.Dispatch<Actions> } {
    return {
        selector: useAppSelector,
        dispatch: React.useContext(CustomContext).dispatch
    };
}

type Selector<T, R> = (state: T) => R;


export function useAppSelector<Selected = unknown>(f: Selector<State,Selected>): Selected {
    return f(React.useContext(CustomContext).state);
}


export function useAppDispatch(): React.Dispatch<Actions> {
    return React.useContext(CustomContext).dispatch;
}

export default CustomContext;
