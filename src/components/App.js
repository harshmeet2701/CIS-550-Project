import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import Recommendation from './Recommendation';
import Search from './Search';
import BestSeller from './BestSeller';
import Movies from './Movies';
import Categories from './Categories';

function App() {
  return (
    <div className="App">
   <Router>
   <Switch>
						<Route
							exact
							path="/"
							render={() => (
								<SignIn />
							)}
						/>

						<Route
							exact
							path="/signup"
							render={() => (
								<SignUp />
							)}
						/>

						<Route
							exact
							path="/dashboard"
							render={() => (
								<Dashboard />
							)}
						/>

						<Route
							exact
							path="/recommended"
							render={() => (
								<Recommendation />
							)}
						/>

						<Route
							exact
							path="/search"
							render={() => (
								<Search />
							)}
						/>

						<Route
							exact
							path="/bestseller"
							render={() => (
								<BestSeller />
							)}
						/>

						<Route
							exact
							path="/movies"
							render={() => (
								<Movies />
							)}
						/>

						<Route
							exact
							path="/categories"
							render={() => (
								<Categories />
							)}
						/>


					</Switch>
     
  </Router> 
   </div>
  );
}

export default App;
