import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import history from '../utils/history';

// middlewares
import createSagaMiddleware from 'redux-saga';

// Import custom components
import reducers from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    }catch(e){
        return undefined
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state')
        if(serializedState === null) return undefined
        return JSON.parse(serializedState)
    }catch (e) {
        return undefined
    }
}

const persistedState = loadFromLocalStorage()

/**
 * Create a Redux store that holds the app state.
 */
let middlewares = [sagaMiddleware, routerMiddleware(history)];

// add logger only in development
if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);
    middlewares.push(logger);
  }

const store = createStore(reducers,   compose(
    applyMiddleware(...middlewares),
    //For working redux dev tools in chrome (https://github.com/zalmoxisus/redux-devtools-extension)
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.devToolsExtension() : function (f) {
        return f;
    }
));

sagaMiddleware.run(rootSaga);

const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    saveToLocalStorage(state);
});

export default store;