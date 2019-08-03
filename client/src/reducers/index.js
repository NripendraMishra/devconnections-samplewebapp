import { combineReducers }  from 'redux';
import authReducers from './authReducers';
import errorReducers from './errorReducers';
import profileReducers from './profileReducers';

export default combineReducers({
    auth: authReducers,
    errors: errorReducers,
    profile: profileReducers
})