import AuthReducer from './auth';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
  auth: AuthReducer
})

export default allReducers;