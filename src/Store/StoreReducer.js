import { combineReducers } from 'redux';
import  moduleReducer  from './Slices/moduleSlice';
import loginReducer from './Slices/loginSlice';
import customerSegmentReducer from './Slices/customerSegementSlice';

const reducers = combineReducers({
    loginReducer:loginReducer,
    moduleReducer: moduleReducer,
    customerSegmentReducer:customerSegmentReducer,
});

export default reducers;