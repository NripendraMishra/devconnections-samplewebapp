import axios from 'axios'

import { GET_ERRORS, ADD_POST } from './types';

// Add Post
export const addPost  = postData => disptatch => {
    axios
        .post('/api/posts', postData)
        .then(res => {
            disptatch({
                type: ADD_POST,
                payload: res.data
            })
        })
        .catch(err => {
            disptatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}