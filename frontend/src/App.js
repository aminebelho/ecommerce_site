import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeScreen from './pages/Home';
import ProductScreen from './pages/ProductScreen';
import CartScreen from './pages/CartScreen';
import LoginScreen from './pages/LoginScreen';

const App = () => {
  return (
    <main>
      <Switch>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/product/:id' component={ProductScreen} />
        <Route path='/cart/:id?' component={CartScreen} />
        <Route path='/login' component={LoginScreen} />
      </Switch>
    </main>
  );
};

export default App;
