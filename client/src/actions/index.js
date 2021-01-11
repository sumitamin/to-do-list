import * as ActivityAction from '../constant';

const archiveTask = payload => {
    return {
        type: ActivityAction.ARCHIVE_TASK,
        payload
    }
}

const taskAction = payload => {
    return {
        type: ActivityAction.TASK_ACTION,
        payload
    }
}

const authResult = payload => {
    return {
        type: ActivityAction.AUTH_RESULT,
        payload
    }
}

const clearAction = payload => {
    return {
        type: ActivityAction.CLEAR_ACTION,
        payload
    }
}

const fetchTask = payload => {
    return {
        type: ActivityAction.FETCH_TASK,
        payload
    }
}

const signUp = payload => {
    return {
        type: ActivityAction.SIGN_UP,
        payload
    }
}

const logIn = payload => {
    return {
        type: ActivityAction.LOGIN,
        payload
    }
}

const addTask = (payload) => {
    return {
        type: ActivityAction.ADD_TASK,
        payload
    }
}

const updateTask = (payload) => {
    return {
        type: ActivityAction.EDIT_TASK,
        payload
    }
}

const deleteTask = (payload) => {
    return {
        type: ActivityAction.DELETE_TASK,
        payload
    }
}

export default {
    signUp, logIn, addTask, updateTask, deleteTask, fetchTask, clearAction, authResult, taskAction, archiveTask
}
