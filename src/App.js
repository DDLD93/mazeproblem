import React, { useContext, useEffect } from 'react';
import {AuthContext} from './Provider'
import './App.css';
import TableArea from './layout/TableArea';
import PromptPage from './layout/PromptPage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  const {state} = useContext(AuthContext)
  return (
    <div className="App">
<Router> 
  <Switch>
    <Route exact path="/" component={!state?PromptPage:TableArea} />
  </Switch>  
</Router>
    </div>
  );
}

export default App;
