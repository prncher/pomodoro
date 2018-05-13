import { combineReducers, createStore } from 'redux';
import { reducer as tasksReducer } from './Reducers';
import { CommonState } from './Components/task';

export interface StoreState {
    taskSettings: CommonState;
}

const combinedReducers = combineReducers<StoreState>({
    taskSettings: tasksReducer
});

export const store = createStore<StoreState>(combinedReducers);
