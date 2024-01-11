import React from 'react'
import axios from 'axios'


export const getUser = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/user');
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}
