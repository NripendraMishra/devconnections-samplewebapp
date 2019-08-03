import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        // Apply to every request
        axios.defaults.headers.common['Authorization'] = token
    } else {
        // Delete auth header
    }
}

export default setAuthToken