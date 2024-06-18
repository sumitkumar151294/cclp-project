import { combineReducers } from 'redux';
import  moduleReducer  from './Slices/moduleSlice';
import loginReducer from './Slices/loginSlice';
import customerSegmentReducer from './Slices/customerSegementSlice';
import productContentReducer from './Slices/productContentSlice';
import productSectionReducer from './Slices/productSectionSlice';
import userRoleReducer from './Slices/userRoleSlice';
import userMasterReducer from './Slices/userMasterSlice';
import clientMasterReducer from './Slices/clientMasterSlice';
import addCouponReducer from './Slices/addCouponSlice';
import translationReducer from "./Slices/translationSlice";
import loginAuthReducer from "./Slices/loginAuthSlice";

const reducers = combineReducers({
    loginReducer:loginReducer,
    translationReducer: translationReducer,
    loginAuthReducer: loginAuthReducer,
    moduleReducer: moduleReducer,
    customerSegmentReducer:customerSegmentReducer,
    productContentReducer:productContentReducer,
    productSectionReducer:productSectionReducer,
    userRoleReducer: userRoleReducer,
    userMasterReducer: userMasterReducer,
    clientMasterReducer: clientMasterReducer,
    addCouponReducer:addCouponReducer
});

export default reducers;