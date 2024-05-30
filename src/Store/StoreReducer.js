import { combineReducers } from 'redux';
import  testMasterReducer  from './Slices/testSlice';
const reducers = combineReducers({
    testMasterReducer:testMasterReducer
    
});

export default reducers;