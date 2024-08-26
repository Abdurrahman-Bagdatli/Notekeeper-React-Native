import {createStore, combineReducers } from 'redux';
import taskReducer from './reducers/taskReducer';
import settingReducer from './reducers/settingReducer';

const store = createStore(combineReducers({
  tasks: taskReducer,
  settings: settingReducer,
}));

export default store;
