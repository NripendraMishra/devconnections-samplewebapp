import axios from 'axios'

import { GET_ERRORS, ADD_POST, POST_LOADING,  GET_POSTS, DELETE_POST, GET_POST, CLEAR_ERRORS } from './types';

// Add Post
export const addPost  = postData => disptatch => {
    disptatch(clearErrors())
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

// Add Comment
export const addComment  = (postId, commentData) => disptatch => {
    disptatch(clearErrors())
    axios
        .post(`/api/posts/comment/${postId}`, commentData)
        .then(res => {
            disptatch({
                type: GET_POST,
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

// Delete Comment
export const deleteComment  = (postId, commentId) => disptatch => {
    
    axios
        .delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res => {
            disptatch({
                type: GET_POST,
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

// Get Posts
export const getPosts  = () => disptatch => {
    disptatch(setPostLoading())
    axios
        .get('/api/posts')
        .then(res => {
            disptatch({
                type: GET_POSTS,
                payload: res.data
            })
        })
        .catch(err => {
            disptatch({
                type: GET_POSTS,
                payload: null
            })
        })
}

// Get Post
export const getPost  = (id) => disptatch => {
    disptatch(setPostLoading())
    axios
        .get(`/api/posts/${id}`)
        .then(res => {
            disptatch({
                type: GET_POST,
                payload: res.data
            })
        })
        .catch(err => {
            disptatch({
                type: GET_POST,
                payload: null
            })
        })
}


// Delete Post
export const deletePost  = id => disptatch => {
    
    axios
        .delete(`/api/posts/${id}` )
        .then(res => {
            disptatch({
                type: DELETE_POST,
                payload: id
            })
        })
        .catch(err => {
            disptatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Add Like
export const addLike  = id => disptatch => {
    
    axios
        .post(`/api/posts/like/${id}` )
        .then(res => {
            disptatch(getPosts())
        })
        .catch(err => {
            disptatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Remove Like
export const removeLike  = id => disptatch => {
    
    axios
        .post(`/api/posts/unlike/${id}` )
        .then(res => {
            disptatch(getPosts())
        })
        .catch(err => {
            disptatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Set Loading
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}