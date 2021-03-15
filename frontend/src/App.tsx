import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { client } from './app/graphql';
import { RootState } from './app/rootReducer';
import { Auth } from './features/auth/auth';
import { logout } from './features/auth/authSlice';
import { ItemList } from './features/itemList/ItemList';
import { ResetPassword } from './features/resetPassword/resetPassword';
import { SignUp } from './features/signUp/signUp';


const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const token = localStorage.getItem('token')

  return <Route {...rest} render={(props) => (
    token
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
}
const PublicRoute = ({ component: Component, ...rest }: any) => {
  const token = localStorage.getItem('token')

  return <Route {...rest} render={(props) => (
    !token
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
}

export { PrivateRoute };

function App() {
  const isAuth = useSelector(
    (state: RootState) => state.auth.isAuth
  );
  const dispatch = useDispatch();
  // useEffect(() =>{})
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="app-header">
          <span className="app-name">Frontend</span>
          {isAuth&& <button className="logout-button" onClick={() => { dispatch(logout()) }}>logout</button>}
        </header>
        <div className="main">

          <Router>
            <Switch>
              <PrivateRoute path="/" exact component={ItemList} />
              <PublicRoute path="/login" exact component={Auth} />
              <PublicRoute path="/register" exact component={SignUp} />
              <PrivateRoute path="/reset-password" exact component={ResetPassword} />
            </Switch>
          </Router>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
