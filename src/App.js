import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './components/navBar'
import CountryData from './components/countryData';
import GameData from './components/gameData';
import GameAndCountryData from './components/gameAndCountry';


function App() {
    return (
        <Router>
            <div className="container">
                <div className='row'>
                    <div className='col'>
                        <NavBar/>
                        <Switch>
                            <Route path='/country-data' component={CountryData}/>
                            <Route path='/game-data' component={GameData}/>
                            <Route path='/game-country-data' component={GameAndCountryData}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
