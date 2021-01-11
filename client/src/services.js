import axios from 'axios';
import API_URL from './constant/global'

const signUpApi = async (payload) => {
    return axios.post('signUp',payload,{headers:{
        'Content-Type':'application/json'
    }})
}

const logInApi = async (payload) => {
    return axios.post('logIn',payload,{headers:{
        'Content-Type':'application/json'
    }})
}

const fetchTaskApi = async (payload) => {
    return axios.post('fetchTask',payload,{headers:{
        'Content-Type':'application/json'
    }})
}

const addTaskApi = async (payload) => {
    return axios.post('addTask',payload,{headers:{
        'Content-Type':'application/json'
    }})
}

const deleteTaskApi = async (payload) => {
    return axios.post('deleteTask',payload,{headers:{
        'Content-Type':'application/json'
    }})
}

const updateTaskApi = async (payload) => {
    return axios.post('updateTask',payload,{headers:{
        'Content-Type':'application/json'
    }})
}

const taskAction = async (payload) => {
    const {type} = payload
    return axios.post(`${type}Task`,payload,{headers:{
        'Content-Type':'application/json'
    }})
}

export default {
    signUpApi,logInApi, fetchTaskApi, addTaskApi, deleteTaskApi, updateTaskApi, taskAction
}