import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import HeaderSide from "./Header"
import { BarChart } from 'react-easy-chart'
import LeftPanel from "./LeftPanel"
import axios from "axios"
import moment from "moment"
export default class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mailGroup : 0,
            mailAdd   : 0,
            mailList  : 0,
            countGMail: 0,
            averagePerson: 0,
            sumPerson : 0,
            countGMailSend: 0,
            countMList: 0,
        }
    }
    setItems(data){
        this.state.countGMailSend = data.countMailGroup;
        this.state.countMList = data.countMailList;
        data.GMail.map((item, index)=>{
            this.state.countGMail+=item[Object.keys(item)].length;
        })
        this.state.averagePerson = (this.state.countGMail+this.state.mailList)/(data.GMail.length+1);
        this.state.sumPerson = (this.state.mailList+this.state.countGMail)
        this.setState({
            mailGroup : data.GMail.length,
            mailList  : data.sendMail.length,
        })
    }
    componentDidMount(){
        var data;
        if(this.props.location.state){
            data = {
                email: this.props.location.state.href.split("email=")[1]
            }
        }else{
            data = {
                email: this.props.location.search.split("email=")[1]
            }
        }
        axios.post("/getdata", data).then(res=>this.setItems(res.data.data)).catch(err=>console.log(err))   
    }
    render(){
        var leftpanel;
        if(window.location.href.indexOf("name")!==-1){
            leftpanel=(<LeftPanel
                activeDashboard="active"
                href = {window.location.href}
            />);
        }else{
            leftpanel=(<LeftPanel 
                activeDashboard="active"
                href = {this.props.location.state.href}
            />);              
        }
        return(
            <div>
                <HeaderSide/>
                <section>
                    <div className="mainwrapper" style={{"background":"#fff"}}>
                        {leftpanel}
                        <div className="mainpanel">
                            <div className="pageheader">
                                <div className="media">
                                    <div className="pageicon pull-left">
                                        <i className="fa fa-home"></i>
                                    </div>
                                    <div className="media-body">
                                        <ul className="breadcrumb">
                                            <li><a href=""><i className="glyphicon glyphicon-home"></i></a></li>
                                        </ul>
                                        <h4>Bảng điều khiển</h4>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="contentpanel">
                                
                                <div className="row row-stat">                                    
                                    <div className="col-md-6">
                                        <div className="panel panel-primary noborder">
                                            <div className="panel-heading noborder">
                                                <div className="panel-btns">
                                                    <a href="" className="panel-close tooltips" data-toggle="tooltip" title="Close Panel"><i className="fa fa-times"></i></a>
                                                </div>
                                                <div className="panel-icon"><i className="fa fa-users"></i></div>
                                                <div className="media-body">
                                                    <h5 className="md-title nomargin">Số Nhóm Mail</h5>
                                                    <h1 className="mt5">{this.state.mailGroup}</h1>
                                                </div>
                                                <hr/>
                                                <div className="clearfix mt20">
                                                    <div className="pull-left">
                                                        <h5 className="md-title nomargin">Danh Sách Mail</h5>
                                                        <h4 className="nomargin">{this.state.mailList}</h4>
                                                    </div>  
                                                    <div className="pull-right">
                                                        <h5 className="md-title nomargin">Tổng số mail trong các nhóm</h5>
                                                        <h4 className="nomargin">{this.state.countGMail}</h4>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-6">
                                        <div className="panel panel-dark noborder">
                                            <div className="panel-heading noborder">
                                                <div className="panel-btns">
                                                    <a href="" className="panel-close tooltips" data-toggle="tooltip" data-placement="left" title="Close Panel"><i className="fa fa-times"></i></a>
                                                </div>
                                                <div className="panel-icon"><i className="fa fa-pencil"></i></div>
                                                <div className="media-body">
                                                    <h5 className="md-title nomargin">Mail đã gửi</h5>
                                                    <h1 className="mt5">{this.state.countGMailSend+this.state.countMList}</h1>
                                                </div>
                                                <hr/>
                                                <div className="clearfix mt20">
                                                    <div className="pull-left">
                                                        <h5 className="md-title nomargin">từ danh sách</h5>
                                                        <h4 className="nomargin">{this.state.countMList}</h4>
                                                    </div>
                                                    <div className="pull-right">
                                                        <h5 className="md-title nomargin">từ nhóm</h5>
                                                        <h4 className="nomargin">{this.state.countGMailSend}</h4>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    
                                    <div className="col-md-6">
                                        <div className="panel panel-default">
                                            <div className="panel-body padding15">
                                                <h5 className="md-title mt0 mb10">Biểu đồ số mail thêm vào</h5>
                                                <div id="basicFlotLegend2" className="flotLegend"></div>
                                                <div id="basicflot2" className="flotChart">
                                                     <BarChart
                                                        data={[
                                                          {x: 'A', y: 20},
                                                          {x: 'B', y: 30},
                                                          {x: 'C', y: 40},
                                                          {x: 'D', y: 20},
                                                          {x: 'E', y: 40},
                                                          {x: 'F', y: 25},
                                                          {x: 'G', y: 5}
                                                        ]}
                                                      />
                                                </div>
                                            </div>
                                            <div className="panel-footer">
                                                <div className="tinystat pull-left">
                                                    <div id="sparkline3" className="chart mt5"></div>
                                                    <div className="datainfo">
                                                        <span className="text-muted">Trung Bình</span>
                                                        <h4>{this.state.averagePerson}</h4>
                                                    </div>
                                                </div>
                                                <div className="tinystat pull-right">
                                                    <div id="sparkline4" className="chart mt5"></div>
                                                    <div className="datainfo">
                                                        <span className="text-muted">Tổng</span>
                                                        <h4>{this.state.sumPerson}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="panel panel-default">
                                            <div className="panel-body padding15">
                                                <h5 className="md-title mt0 mb10">Số người được thêm vào</h5>
                                                <div id="basicFlotLegend3" className="flotLegend"></div>
                                                <div id="basicflot3" className="flotChart">
                                                    <BarChart
                                                        data={[
                                                          {x: 'A', y: 20},
                                                          {x: 'B', y: 30},
                                                          {x: 'C', y: 40},
                                                          {x: 'D', y: 20},
                                                          {x: 'E', y: 40},
                                                          {x: 'F', y: 25},
                                                          {x: 'G', y: 5}
                                                        ]}
                                                    />
                                                </div>
                                            </div>
                                            <div className="panel-footer">
                                                <div className="tinystat pull-left">
                                                    <div id="sparkline5" className="chart mt5"></div>
                                                    <div className="datainfo">
                                                        <span className="text-muted">Trung Bình</span>
                                                        <h4>{(this.state.countGMailSend+this.state.countMList)/2}</h4>
                                                    </div>
                                                </div>
                                                <div className="tinystat pull-right">
                                                    <div id="sparkline6" className="chart mt5"></div>
                                                    <div className="datainfo">
                                                        <span className="text-muted">Tổng</span>
                                                        <h4>{this.state.countGMailSend+this.state.countMList}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                </section>
            </div>
            )
        }
    }