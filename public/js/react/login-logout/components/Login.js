import React from "react"
import axios from "axios"
import { render} from "react-dom"
import { Link } from 'react-router-dom'
import "./style/logincustoms.scss"

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email       :"",
            valEmail    :false,
            sessionSVer :"",
            password    :"",
            valPass     :false,
            notification:"",
            reExEmail   :/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            reExInput   : /^[A-Za-z][A-Za-z0-9]*$/,
        }
    }
    changeEmail(value){
        this.setState
        (
            {
                email:value.target.value.trim().toLowerCase(),
                valEmail:this.state.reExEmail.test(value.target.value.trim().toLowerCase())
            }
        )
        this.printOutMessage(value.target.value.trim().toLowerCase(),"mail");
    }
    changePass(value){
        this.setState
        (
            {
                password:value.target.value.trim().toLowerCase(),
                valPass :(this.state.reExInput.test(value.target.value.trim().toLowerCase())&&value.target.value.trim().toLowerCase().length>=6)?true:false
            }
        )
        this.printOutMessage(value.target.value.trim().toLowerCase(),"pass");
    }
    printOutMessage(value,type){
        if(type ==="mail"){
            if(this.state.reExEmail.test(value)&&value.length>=6){
                this.setState(
                    {
                        notification:""
                    }
                )
            }else{
                this.setState(
                    {
                        notification:`Vui lòng nhập đúng ${type}!!!`
                    }
                )
            }
        }else{
            if(this.state.reExInput.test(value)&&value.length>=6){
                this.setState(
                    {
                        notification:""
                    }
                )
            }else{
                this.setState(
                    {
                        notification:`Vui lòng nhập đúng định dạng ${type}!!!`
                    }
                )
            }
        }
    }
    sendLogin(){
        console.log(this.state.valPass,this.state.valEmail)
        if(this.state.valPass&&this.state.valEmail){
            var url = "/login";
            var data = {
                    email    : this.state.email,
                    password : this.state.password,
                }
            axios.post(url , data).then((data)=>{
                if(data.data.error){
                    this.setState({
                        sessionSVer: data.data.error
                    })
                }else {
                    window.location.href = `http://localhost:3000/${data.data.href}`
                }
            }).catch((err)=>console.log(err))
        }else{
            this.setState({
                notification: "Vui lòng điền đầy đủ thông tin"
            })
        }
    }
    render(){
        return(
                <section>
                    <div className="panel panel-signin">
                        <div className="panel-body">
                            <br />
                            <h4 className="text-center mb5">Bạn là thành viên hay chưa?</h4>
                            <p className="text-center">Đăng nhập vào tài khoản của bạn</p>
                            <div className="mb30"></div>
                            <div className="logo text-center">{this.state.notification}{this.state.sessionSVer}</div>
                            <div>
                                <div className="input-group mb15">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                    <input type="text" className="form-control" name="email" placeholder="Email" value={this.state.email} onChange={this.changeEmail.bind(this)}/>
                                </div>
                                <div className="input-group mb15">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                    <input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.changePass.bind(this)}/>
                                </div>
                                <div className="clearfix">
                                    <div className="pull-right">
                                        <button type="submit" className="btn btn-success" onClick={this.sendLogin.bind(this)}>Đăng nhập <i className="fa fa-angle-right ml5"></i></button>
                                    </div>
                                </div>                      
                            </div>
                        </div>
                        <div className="panel-footer">
                            <Link to="/register"><ul className="btn btn-primary btn-block">Bạn chưa là thành viên? Tạo tài khoản ngay</ul></Link>
                        </div>
                    </div>
                </section>
            )
        }
    }