import { combineReducers } from 'redux';
import  moduleReducer  from './Slices/moduleSlice';
import loginReducer from './Slices/loginSlice';

const reducers = combineReducers({
    moduleReducer:moduleReducer,
    loginReducer:loginReducer
});

export default reducers;