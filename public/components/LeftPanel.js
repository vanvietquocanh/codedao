import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
export default class LeftPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            href : this.props.href,
            name : this.props.href.split("name=")[1].split("&userid")[0],
        }
    }
    render(){
        return(
            <div className="leftpanel">
                <div className="media profile-left">
                    <Link className="pull-left profile-thumb" to={{pathname:"/admin/", state:{"href":this.state.href}}}>
                        <img className="img-circle" src="https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-9/11138510_743919879053949_7145343774556287455_n.jpg?oh=fffead77496dda5fe0aeee29861ea7ef&oe=5A9E6864" alt=""/>
                    </Link>
                    <div className="media-body">
                        <small className="text-muted">welcome!</small>
                        <h4 className="media-heading">{this.state.name}</h4>
                    </div>
                </div>
                
                <h5 className="leftpanel-title">Navigation</h5>
                <ul className="nav nav-pills nav-stacked">
                    <li className={this.props.activeDashboard}><Link to={{pathname:"/admin/", state:{"href":this.state.href}}}><i className="fa fa-home"></i> <span>Bảng Điều Khiển</span></Link></li>
                    <li className={this.props.activeMesage}>
                        <Link to={{pathname:"/admin/messsage", state:{"href":this.state.href}}}>
                            <i className="fa fa-envelope-o"></i> <span>Hộp thư đến</span>
                        </Link>
                    </li>
                    <li className={this.props.activeSendmail}>
                        <Link to={{pathname:"/admin/mailmanager", state:{"href":this.state.href}}}>
                            <i className="fa fa-paper-plane-o" aria-hidden="true"/><span>Quản Lý Mail</span>
                        </Link>
                    </li>
                    <li className={this.props.activeGroup}>
                        <Link to={{pathname:"/admin/group", state:{"href":this.state.href}}}>
                            <i className="fa fa-users" aria-hidden="true"/><span>Nhóm Mail</span>
                        </Link>
                    </li>
                    <li className={this.props.historySend}>
                        <Link to={{pathname:"/admin/history", state:{"href":this.state.href}}}>
                            <i className="fa fa-history" aria-hidden="true"/><span>Lịch Sử</span>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}
