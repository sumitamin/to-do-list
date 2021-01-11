import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from '../utils/history';
import task from './task';

export default combineReducers({
  task,
  router: connectRouter(history),
});