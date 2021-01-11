import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import * as ActionTypes from '../constant';
import Services from '../services';
import Actions from '../actions'

function* signInSaga(param) {
    let payload = {
        status:false,
        message: 'Could not Sign in',
    }
  try {

    const response = yield call(Services.signUpApi, param.payload);
    if (response.status === 200) {
        if (response.data.status === true){
            localStorage.setItem('utoken', response.data.token)
            payload = {
                status:true,
                message: 'Success',
            }
            window.location.href = '/task'
        }else{
          payload = {...payload,message: response.data.message}
        }
    }

    yield put(Actions.authResult({...payload}))

  } catch (error) {
    const res = {...payload}
    if (error.message){
      res = {
        ...res,
        message: error.message
      }
    }
    yield put(Actions.authResult({...res}))
  }
}

function* logInSaga(action) {
  let payload = {
      status:false,
      message: 'Could not Login',
  }
try {
  const response = yield call(Services.logInApi, action.payload);
  if (response.status === 200) {
    if (response.data.status === true){
        localStorage.setItem('utoken', response.data.token)
        payload = {
            status:true,
            message: 'Success',
        }
        window.location.href = '/task'
    }else{
      payload = {...payload,message: response.data.message}
    }
}

yield put(Actions.authResult({...payload}))


} catch (error) {
  const res = {...payload}
    if (error.message){
      res = {
        ...res,
        message: error.message
      }
    }
    yield put(Actions.authResult({...res}))
}
}

function* taskAction(action) {
  const {type} = action.payload
  let payload = {
      status:false,
      message: `Could not ${type} Task`,
  }
  
try {

  const response = yield call(Services.taskAction, action.payload);

  if (response){
    if (response.status === 200 && response.data.status){
       payload = {
        ...action.payload,
        status:true,
        message: 'Success',
      }
      if (response.data.task){
        payload = {...payload, ...response.data}
      }
    }

  }

  if (type === 'fetch'){
    yield put(Actions.fetchTask(payload))
  }else if (type === 'add'){
    yield put(Actions.addTask(payload))
  }else if (type === 'update'){
    yield put(Actions.updateTask(payload))
  }else if (type === 'delete'){
    yield put(Actions.deleteTask(payload))
  }else if (type === 'archive'){
    yield put(Actions.archiveTask(payload))
  }
  // yield put(Actions.deleteTask(payload))
} catch (error) {
  if (type === 'fetch'){
    yield put(Actions.fetchTask(payload))
  }else if (type === 'add'){
    yield put(Actions.addTask(payload))
  }else if (type === 'update'){
    yield put(Actions.updateTask(payload))
  }else if (type === 'delete'){
    yield put(Actions.deleteTask(payload))
  }else if (type === 'archive'){
    yield put(Actions.archiveTask(payload))
  }
}
}

export default function* IndexSagas() {
  yield all([
    takeLatest(ActionTypes.SIGN_UP, signInSaga),
    takeLatest(ActionTypes.LOGIN, logInSaga),
    takeLatest(ActionTypes.TASK_ACTION, taskAction),
  ])
}