import React, {
  Component
} from "react";
import ReactDOM from "react-dom";
import {
  Provider
} from "mobx-react";
import {
  AppContainer
} from "react-hot-loader";
import {
  rehydrate,
  hotRehydrate
} from "rfx-core";
import App from "./components/App";
import stores from "./stores/stores";

const store = rehydrate();

export default class Campaign extends Component {
  render() {
    return ( 
      <AppContainer>
        <Provider store = {hotRehydrate()} >
          <App />
        </Provider>  
      </AppContainer>
    );
  }
}
ReactDOM.render( <Campaign /> , document.getElementById('root'));

