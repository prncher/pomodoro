import { Reducer } from 'redux';
import * as actions from '../Actions';
import { CommonState } from '../Components/task';

const unloadedState: CommonState = {
    tasks: [],
    addTask: [],
    selectTask: undefined
}; 

export const reducer: Reducer<CommonState> = (state: CommonState, action: actions.KnownAction): CommonState => {
    // tslint:disable-next-line:switch-default
    switch (action.type) {
        case actions.TASK_ADDED: {
            const newState = {...state, tasks: [...state.tasks, action.task]};
            return newState;
        }
        case actions.TASK_SELECTED: {
            return {...state, selectTask: action.task};
        }
        default:
        
        return state || unloadedState;
    }
};

// import { KnownAction } from 'Actions';
// import { combineReducers } from 'redux';

// const allReducers = combineReducers({
//     tasks: () => [],
//     addTask: (state = null, action): KnownAction => {
//         switch (action.type) {
//             case 'TASK_ADDED':
//                 return action.tasks;
//             default: return state;
//         }
//     },
//     selectTask: (state = null, action): KnownAction => {
//         switch (action.type) {
//             case 'TASK_SELECTED':
//                 return action.task;
//             default: return state;
//         }
//     },
// });

// export default allReducers;