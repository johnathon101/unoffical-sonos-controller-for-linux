import _ from 'lodash';
import { handleActions } from 'redux-actions';
import Constants from '../constants';

const initialState = {
    selected: [],
    visible: false,
    current: null
};

function resetReducer() {
    return initialState;
}

export default handleActions(
    {
        [Constants.GROUP_MANAGEMENT_SHOW]: (state, action) => {
            return {
                ...state,
                selected: _.map(action.payload, g => g.uuid),
                currentGroup: action.payload[0].group,
                visible: true
            };
        },

        [Constants.GROUP_MANAGEMENT_TOGGLE]: (state, action) => {
            const uuid = action.payload.uuid;

            const selected =
                state.selected.indexOf(uuid) > -1
                    ? state.selected.filter(i => i != uuid)
                    : state.selected.concat([uuid]);

            return {
                ...state,
                selected
            };
        },

        [Constants.GROUP_MANAGEMENT_HIDE]: resetReducer,
        [Constants.GROUP_MANAGEMENT_SAVE]: resetReducer
    },
    initialState
);
