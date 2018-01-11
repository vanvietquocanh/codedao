import React from "react"
import { render} from "react-dom"
import Login from "./Login"
import Register from "./Register"
import Admin from "./Admin"
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
const App = () =>(
    <Router>
        <div>
            <Route exact path="/" component={Login}/>
            <Route exact path="/register" component={Register}/>
        </div>
    </Router>
)
export default App