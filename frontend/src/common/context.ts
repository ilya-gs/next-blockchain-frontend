import React from 'react';
import { State, Actions, initialState } from './reducer';

const CustomContext = React.createContext<{ state: State, dispatch: React.Dispatch<Actions> }>({ state: initialState, dispatch: null} as any ); 

export function useCustomContext() {
    return React.useContext(CustomContext);
}

export default CustomContext;
