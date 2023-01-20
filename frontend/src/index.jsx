import React from "react";
import ReactDOM from 'react-dom';
import App from './main/app'
import { applyMiddleware, createStore } from "redux";

//middlewares
import promise from "redux-promise";
import multi from 'redux-multi';
import thunk from "redux-thunk";

import reducers from './main/reducers'
import { Provider} from "react-redux";

//PARA ACESSAR O PLUGIN NO NAVEGADOR E ACOMPNHAR DURANDO O DEV
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

//aplyMiddleare, cocmo o nome indica, da o suporte para essa aplicação
//recebe como parâmetros os middlewares que são usados
const store = applyMiddleware(multi, promise, thunk)(createStore)(reducers, devTools)
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
, document.getElementById('app'))