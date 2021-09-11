import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Notes from './components/Notes'
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/style/navbar.css'

export default function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path = "/" exact>
          <Notes></Notes>
        </Route>
      </Switch>
    </Router>
    </>
  )
}
