import {
    produce
} from 'immer';
import {
    ActionTypes
} from './actions';

export const initialState = Object.freeze({
    locale: 'en_US',
});

export default (action, state = initialState) =>
produce(state, (draft) => {
    switch (action.type) {
        case ActionTypes.SETLOCALE: {
            draft.locale = action.payload;
            return;
        }
    }
});
