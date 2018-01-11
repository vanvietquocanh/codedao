import React from "react"
import { render} from "react-dom"
import Dashboard from "./Dashboard"
import Mail from "./Message/Mail"
import Send from "./sendmail/Send"
import Group from "./groupMail/Group"
import History from "./history/History"
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
const App = () =>(
    <Router>
        <div>
            <Route exact path="/admin/" component={Dashboard}/>
            <Route exact path="/admin/messsage" component={Mail}/>
            <Route exact path="/admin/mailmanager" component={Send}/>
            <Route exact path="/admin/group" component={Group}/>
            <Route exact path="/admin/history" component={History}/>
        </div>
    </Router>
)
export default App