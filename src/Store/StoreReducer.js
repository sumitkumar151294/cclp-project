import { combineReducers } from 'redux';
import  moduleReducer  from './Slices/moduleSlice';
import loginReducer from './Slices/loginSlice';
import customerSegmentReducer from './Slices/customerSegementSlice';
import productContentReducer from './Slices/productContentSlice';

const reducers = combineReducers({
    loginReducer:loginReducer,
    moduleReducer: moduleReducer,
    customerSegmentReducer:customerSegmentReducer,
    productContentReducer:productContentReducer
});

export default reducers;