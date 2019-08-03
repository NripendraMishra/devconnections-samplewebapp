import { USER_NAME, USER_EMAIL, USER_PASSWORD, USER_PASSWORD2, SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initState = {
    isAuthenticated: false,
    user: {
        name: '',
        email: '',
        password: '',
        password2: ''
    }
}

export default function(state = initState, action){
    switch(action.type){
        case USER_NAME: 
          initState.user.name = action.payload
          
          return{
            ...state,
           }

        case USER_EMAIL: 
             initState.user.email = action.payload
             return{
                ...state,
               }

        case USER_PASSWORD: 
              initState.user.password = action.payload
              return{
                ...state,
               }
               
        case USER_PASSWORD2: 
                initState.user.password2 = action.payload
                return{
                    ...state,
                   }

        case SET_CURRENT_USER: 
                   return {
                        ...state,
                       isAuthenticated: !isEmpty(action.payload),
                       user: action.payload
                   }
        default:
            return state
    }
}