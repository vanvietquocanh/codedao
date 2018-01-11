import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import "../sendmail/sendmail.scss"
import HeaderSide from "../Header"
import LeftPanel from "../LeftPanel"
import moment from "moment"
import axios from "axios"
export default class History extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            database     : [],
            nameGSel     : "",
            sttServer    : "",
            keySearch    : "",
            title        : "",
            content      : "",
            Template     : "",
            localArr     : 0,
            reRender     : true,
        }
    }
    clearBtn(e,i){
        var quest = confirm(`Bạn chắc chắn muốn xóa email "${this.state.event[this.state.localArr][`${this.state.nameGSel}`][e].email}" ?`);
        if(quest){
            this.state.event[this.state.localArr][`${this.state.nameGSel}`].splice(e,1);
            this.setState({
                reRender : false,
            })
        }
    }
    saveData(){
        var href = this.props.location.state.href.split("email=")[1];
        var data = {
            user :{
                email: href,
            },
            dataItems: this.state.event
        }
        console.log(data)
        axios.post("/savegroupmail", data)
        .then(data=>this.sttSV(data.data.res))
        .catch(err=>this.sttSV(err))
    }
    sttSV(stt){
        this.setState({
            sttServer: stt
        })
        setTimeout(()=>{
            this.setState({
                sttServer: ""
            })  
        },2000);
    }
    changeSelVal(e){
        var local = e.target.value.split("-")[1];
        var name = e.target.value.split("-")[0];
        this.setState({
            nameGSel: name,
            localArr: local
        })
    }
    componentDidMount(){
        var data = {
            email: this.props.location.state.href.split("email=")[1]
        }
        axios.post("/getdata", data).then(res=>{
            this.setState({
                database : res.data.data,
                nameGSel : Object.keys(res.data.data.GMail[0])[0]
            })
        }).catch(err=>console.log(err))
    }
    searchPerson(e){
        this.setState({
            keySearch: e.target.value
        })
    }
    render(){
        var data,selected,search,btn;
        try{
            if(this.state.nameGSel!==""&&this.state.database.GMail[this.state.localArr][`${this.state.nameGSel}`]){
                console.log(this.state.database.historyCustomG)
                search = this.state.database.historyCustomG.filter((value)=>value.email.indexOf(this.state.keySearch)!==-1)
                data = search.map((item,i)=>(<tr key={i}>
                                                            <td>{item[0].team}</td>
                                                            <td>{item[0].title}</td>
                                                            <td>{item[0].content}</td>
                                                            <td>{item[0].time}</td>
                                                            <td style={{"textAlign":"center"}}>
                                                                <button
                                                                    className="checkSend delbuttons" 
                                                                    onClickCapture={this.clearBtn.bind(this,i)} 
                                                                    style={{"width":"50%"}}>
                                                                    <i className="fa fa-times-circle-o fa-lg" 
                                                                    aria-hidden="true"/>
                                                                </button>
                                                            </td>
                                                            <td style={{"textAlign":"center"}}><button className="checkSend delbuttons" onClickCapture={this.editElement.bind(this,i)} style={{"width":"50%"}}><i className="fa fa-pencil fa-lg" aria-hidden="true"/></button></td>
                                                        </tr>));
                selected = this.state.database.GMail.map((event, index)=>(<option key={index} value={`${Object.keys(event)[0]}-${index}`}>{Object.keys(event)[0]}</option>));
            }
        }catch(e){

        }
    	return(
           <div>
        <div>
            <HeaderSide/>
            <section>
                <div className="mainwrapper" style={{"background":"#fff"}}>
                    <LeftPanel 
                        historySend="active"
                        href = {this.props.location.state.href}
                    />
                    <div className="mainpanel">
                        <div className="pageheader">
                            <div className="media">
                                <div className="pageicon pull-left">
                                    <i className="fa fa-paper-plane-o"></i>
                                </div>
                                <div className="media-body">
                                    <ul className="breadcrumb">
                                        <li><a href=""><i className="glyphicon glyphicon-home"></i></a></li>
                                        <li><a href="">history</a></li>
                                    </ul>
                                    <h4>Lịch Sử</h4>
                                </div>
                            </div>
                        </div>
                        <div className="contentpanel">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4 className="panel-title">Lịch Sử</h4>
                                    <p><a href="" target="_blank"></a></p>
                                    <div className="sel-add-event" style={{width:"40%"}}>
                                        <select className="sel-event" style={{width:"100%"}} onChange={this.changeSelVal.bind(this)}>
                                            <option value="all">Tất cả</option>
                                            {selected}
                                        </select>
                                    </div>
                                    <h1 className="titleEvent">{this.state.nameGSel}</h1>
                                    <ul className="pull-right flex-search-save">
                                        <p style={{"color":"red", "lineHeight":"2.3em", "fontSize":"20px"}}>{this.state.sttServer}</p>
                                        <p style={{"color":"red", "lineHeight":"3em", "fontSize":"15px", "width":"135%"}}>{this.state.validate}</p>
                                        <input 
                                            className="save-search in-add search-box" 
                                            type="text" 
                                            placeholder="Search..." 
                                            onChange={this.searchPerson.bind(this)}
                                        />
                                        <button className="delbuttons save-search flex-search-save" style={{"paddingRight":"1em"}} onClick={this.saveData.bind(this)}>
                                            <i className="fa fa-floppy-o" aria-hidden="true"/>  Save
                                        </button>
                                    </ul>
                                 <table id="basicTable" className="table table-striped table-bordered responsive">
                                <thead className="fieldName">
                                    <tr >
                                        <th className="fieldName">Tên Nhóm / Cá nhân</th>
                                        <th className="fieldName">Tiêu Đề</th>
                                        <th className="fieldName">Nội Dung</th>
                                        <th className="fieldName">Ngày Gửi</th>
                                        <th className="fieldName" style={{"minWidth":"80px"}}>Chọn</th>
                                        <th className="fieldName" style={{"minWidth":"80px"}}>Xóa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data}
                                </tbody>
                                    </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
           </div>
        )
    }
  }