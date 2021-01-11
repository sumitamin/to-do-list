import { SIGN_UP, LOGIN, ADD_TASK, FETCH_TASK, EDIT_TASK, DELETE_TASK, AUTH_RESULT, TASK_ACTION, CLEAR_ACTION, ARCHIVE_TASK } from "../constant";
    
  const initialState = {
    isError: false,
    isLoading: false,
    status:true,
    message: '',
    task:[],
    bucket:[],
  };
  
  const authReducer = (state = initialState, action) => {
      switch (action.type) {
        
        case AUTH_RESULT:
        return {
          ...state,
          isError: !action.payload.status,
          isLoading: false,
          status:action.payload.status,
          message:action.payload.message
        }

        case SIGN_UP:
        return {
          ...state,
          isError: false,
          isLoading: true,
          status:true,
          message:''
        }

        case LOGIN:
        return {
          ...state,
          isError: false,
          isLoading: true,
          status:true,
          message:''
        }

        case CLEAR_ACTION:
        return {
          ...state,
          isError: false,
          isLoading: true,
          status:true,
          message:''
        }

        case TASK_ACTION:

        let tasks = state.task

        if (action.payload.type === 'fetch'){
          tasks = []
        }
        
        return {
          ...state,
          isError: false,
          isLoading: true,
          status:true,
          message:'',
          task:[...tasks]
        }

        case ADD_TASK:

        let r = {
          ...state,
          task:[...state.task, {...action.payload}],
          isError: !action.payload.status,
          isLoading: false,
          status: action.payload.status,
          message: action.payload.message
        }
        if (action.payload.newBucket && Object.keys(action.payload.newBucket).length > 0){
          r = {...r, bucket:[...state.bucket, {...action.payload.newBucket}]}
        }

        return r;

        case FETCH_TASK:
        const {message} = action.payload
        let taskFetched = []
        let bucket = []
        if (action.payload.status){
          taskFetched = [...action.payload.task]
          bucket = [...action.payload.bucket]
        }

        return {
          ...state,
          task:[...taskFetched],
          bucket:[...bucket],
          isError: !action.payload.status,
          isLoading: false,
          status: action.payload.status,
          message: message
        }

        case DELETE_TASK:
        
        const allTask = [...state.task]
        const delTask = action.payload.task
        let filterTask = allTask
        if (action.payload.status){
          filterTask = allTask.filter(v => v.id && delTask && v.id.toString() !== delTask.toString())
        }
        return {
          ...state,
          task:[...filterTask],
          isError: !action.payload.status,
          isLoading: false,
          status: action.payload.status,
          message: action.payload.message
        }

        case EDIT_TASK:
        
        const taskToEdit = [...state.task]
        const {name, id, complete} = action.payload
        let taskIndex = taskToEdit

        if (action.payload.status){
          taskIndex = taskToEdit.map(v => {
            const updateTask = v
            if (v.id.toString() === id.toString()){
              updateTask.name = name
              updateTask.complete = complete
              updateTask.bucket = action.payload.bucket
            }
            return updateTask;
          })
        }



        return {
          ...state,
          task:[...taskIndex],
          isError: !action.payload.status,
          isLoading: false,
          status: action.payload.status,
          message: action.payload.message
        }

        default:
          return state;
      }
    };
    
    export default authReducer;
    