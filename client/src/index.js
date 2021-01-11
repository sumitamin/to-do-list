import React, { Fragment  } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import { Route, Switch } from "react-router-dom";
import { ScrollContext } from "react-router-scroll-4";
// import * as serviceWorker from './serviceWorker';
import { ConnectedRouter } from 'connected-react-router';

// ** Import custom components for redux**
import { Provider } from "react-redux";
import store from "./store/index";
import history from "./utils/history";

import login from './component/auth/login';
import signin from './component/auth/signIn';
import App from './component/app';
import task from './component/task';
import archiveTask from './component/task/archiveTask';

function Root() {
  return (
    <div className="App">
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ScrollContext>
            <Switch>
            <Fragment>
              <App>
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signin} />
                <Route exact path="/task" component={task} />
                <Route exact path="/archive-task" component={archiveTask} />
              </App>
            </Fragment>
            </Switch>
          </ScrollContext>
          </ConnectedRouter>
      </Provider>
    </div>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
