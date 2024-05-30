import { combineReducers } from 'redux';
import offerMasterRedcucer  from './Slices/offerMasterSlice';
import faqMasterReducer from './Slices/faqMasterSlice';
const reducers = combineReducers({
    offerMasterRedcucer:offerMasterRedcucer,
    faqMasterReducer:faqMasterReducer
});

export default reducers;