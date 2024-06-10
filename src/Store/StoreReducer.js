import { combineReducers } from 'redux';
import  moduleReducer  from './Slices/moduleSlice';
import loginReducer from './Slices/loginSlice';
import customerSegmentReducer from './Slices/customerSegementSlice';
import productContentReducer from './Slices/productContentSlice';
import productSectionReducer from './Slices/productSectionSlice';
import userRoleReducer from './Slices/userRoleSlice';

const reducers = combineReducers({
    loginReducer:loginReducer,
    moduleReducer: moduleReducer,
    customerSegmentReducer:customerSegmentReducer,
    productContentReducer:productContentReducer,
    productSectionReducer:productSectionReducer,
    userRoleReducer: userRoleReducer,
});

export default reducers;