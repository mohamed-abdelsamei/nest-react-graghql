import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { client } from './app/graphql';
import { RootState } from './app/rootReducer';
import { Auth } from './features/auth/auth';
import { ItemList } from './features/itemList/ItemList';
import { ResetPassword } from './features/resetPassword/resetPassword';
import { SignUp } from './features/signUp/signUp';
import logo from './logo.svg';


const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isAuth);

  return <Route {...rest} render={(props) => (
    isLoggedIn
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
}

export { PrivateRoute };

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <Router>
            <Switch>
              <Route path="/" exact component={ItemList} />
              <Route path="/login" exact component={Auth} />
              <Route path="/register" exact component={SignUp} />
              <PrivateRoute path="/reset-password" exact component={ResetPassword} />
            </Switch>
          </Router>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
