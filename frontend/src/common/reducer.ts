export type State = {
    counter: number;
//    isLoading: boolean;
    error: string;
}

export const initialState: State = {
    counter: 0,
    error: ''
}

//====================================================//
//====================================================//

export type Actions =
    | ['INCREASE'] 
    | ['DECREASE']
    | ['SET', number ]

//====================================================//
//====================================================//

export function reducer(state: State, action: Actions): State {
    const payload = action[1];
    switch (action[0]) {
        case 'INCREASE':
            return { ...state, counter: state.counter + 1 };
        case "DECREASE":
            return { ...state, counter: state.counter - 1 };
        case "SET":
            return { ...state, counter: payload!};
        default:
            return state;
    }
}
