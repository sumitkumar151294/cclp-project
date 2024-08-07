import { combineReducers } from 'redux';
import userRoleReducer from './Slices/userRoleSlice';
import translationReducer from "./Slices/translationSlice";
import userRoleModuleAccessReducer from "./Slices/userRoleModuleAccessSlice";
import  sectionMasterReducer  from './Slices/sectionMasterSlice';
import sectionContentMasterReducer from './Slices/sectionContentMasterSlice';


const reducers = combineReducers({
    translationReducer: translationReducer,
    userRoleReducer: userRoleReducer,
    userRoleModuleAccessReducer: userRoleModuleAccessReducer,
    sectionMasterReducer:sectionMasterReducer,
    sectionContentMasterReducer:sectionContentMasterReducer,

});

export default reducers;