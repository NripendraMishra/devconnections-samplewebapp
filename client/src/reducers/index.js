import { combineReducers }  from 'redux';
import authReducers from './authReducers';
import errorReducers from './errorReducers';
import profileReducers from './profileReducers';
import postReducers from './postReducers';

export default combineReducers({
    auth: authReducers,
    errors: errorReducers,
    profile: profileReducers,
    post: postReducers
})