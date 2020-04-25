import React, { Component, Fragment } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { GlobalResetStyle } from './style';
import { GlobalIconfontStyle } from './static/iconfont/iconfont';
import Header from './common/header';
import Home from './pages/home';
import Admin from './pages/admin';
import Detail from './pages/detail/loadable';
import Login from './pages/login';
import Register from './pages/register';
import Write from './pages/write';
import './style.js';

class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <Fragment >
          <GlobalResetStyle />
          <GlobalIconfontStyle />
          <BrowserRouter>
            <Header />
            <div>
              <Route path='/' exact component={Home}></Route>  
              <Route path='/admin' exact component={Admin}></Route>  
              <Route path='/detail/:id' exact component={Detail}></Route>  
              <Route path='/login' exact component={Login}></Route>  
              <Route path='/write' exact component={Write}></Route>  
              <Route path='/register' exact component={Register}></Route>  
            </div>
          </BrowserRouter>
        </Fragment>
      </Provider>
    )
  }
}

export default App;