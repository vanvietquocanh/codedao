import React from "react"
import {
  Link
} from 'react-router-dom'
export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          
        }
    }
    render(){
      return(
          <div>
            <header>
            <div className="headerwrapper">
                <div className="header-left">
                    <Link to="/admin/" className="logo">
                        <img src="" alt="" /> 
                    </Link>
                    <div className="pull-right">
                        <a href="" className="menu-collapse">
                            <i className="fa fa-bars"></i>
                        </a>
                    </div>
                </div>
                <div className="header-right">   
                    <div className="pull-right">
                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                          <i className="glyphicon glyphicon-log-out"></i>
                        </button>
                    </div>                
                </div>
                
            </div>
        </header>
          </div>
        )
    }
  }