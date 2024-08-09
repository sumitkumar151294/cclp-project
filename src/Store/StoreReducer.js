import { combineReducers } from 'redux';
import  moduleReducer  from './Slices/moduleSlice';
import loginReducer from './Slices/loginSlice';
import userRoleReducer from './Slices/userRoleSlice';
import userMasterReducer from './Slices/userMasterSlice';
import translationReducer from "./Slices/translationSlice";
import loginAuthReducer from "./Slices/loginAuthSlice";
import userRoleModuleAccessReducer from "./Slices/userRoleModuleAccessSlice";
import  sectionMasterReducer  from './Slices/sectionMasterSlice';
import sectionContentMasterReducer from './Slices/sectionContentMasterSlice';
import dealCategoryReducer from './Slices/dealCategorySlice';
import dealReducer from './Slices/dealSlice';
import dealCouponReducer from './Slices/dealCouponSlice';
import dealCouponCodeReducer from './Slices/dealCouponCodeSlice';
import uploadReducer from './Slices/uploadSlice';
import navConfigurationReducer from './Slices/NavConfigurationSlice';

const reducers = combineReducers({
    loginReducer:loginReducer,
    translationReducer: translationReducer,
    loginAuthReducer: loginAuthReducer,
    moduleReducer: moduleReducer,
    userRoleReducer: userRoleReducer,
    userMasterReducer: userMasterReducer,
    userRoleModuleAccessReducer: userRoleModuleAccessReducer,
    sectionMasterReducer:sectionMasterReducer,
    sectionContentMasterReducer:sectionContentMasterReducer,
    dealCategoryReducer:dealCategoryReducer,
    dealReducer:dealReducer,
    dealCouponReducer:dealCouponReducer,
    dealCouponCodeReducer:dealCouponCodeReducer,
    uploadReducer:uploadReducer,
    navConfigurationReducer:navConfigurationReducer,
});

export default reducers;