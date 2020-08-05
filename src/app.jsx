import React, {Component} from "react";
import {Provider} from "react-redux"
import {BrowserRouter, Route} from "react-router-dom"

import {GlobalStyled} from './style.js';
import {GlobalStyled1} from './static/iconfont/iconfont'
import Header from "./common/header";
import store from "./store";
import Home from "./pages/home";
import Detail from "./pages/detail/loadable";
import Login from "./pages/login";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <GlobalStyled/>
        <GlobalStyled1/>
        <BrowserRouter>
          <div>
            <Header/>
            <Route path='/' exact component={Home}></Route>
            <Route path='/detail' exact component={Detail}></Route>
            <Route path='/login' exact component={Login}></Route>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}