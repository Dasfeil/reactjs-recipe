import React from 'react';
import './App.css';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'
import Recipe from './routes/Recipe'
import NoMatch from './components/NoMatch'
import shopList from './routes/ShopList';

function App() {
  return (
    <div className="App">
      <nav>
        <NavLink exact to="/" className="banner banner-link">Recipe Book</NavLink>
        <NavLink to="/recipe" className="link">Recipes</NavLink>
        <NavLink to="/shop" className="link">Shopping List</NavLink>
      </nav>
      <Switch>
        <Route path="/recipe" component={Recipe}>
        </Route>
        <Route path="/shop" component={shopList}>
        </Route>
        <Route exact path="/" render={() => (
          <Redirect to="/recipe"/>
        )}>
        </Route>
        <Route path="*">
          <NoMatch/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
