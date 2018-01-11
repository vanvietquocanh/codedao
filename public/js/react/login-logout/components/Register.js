import React from "react"
import axios from "axios"
import { Link } from 'react-router-dom'
export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name        :"",
            valUserName :false,
            password    :"",
            valPass     :false,
            email       :"",
            sessionSVer :"",
            valEmail    :false,
            isCheckedbox:false,
            notification:"",
            reExEmail   :/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            reExInput   : /^[A-Za-z][A-Za-z0-9]*$/,
        }
    }
    changeName(value){
        this.setState
        (
            {
                name:value.target.value.trim().toLowerCase(),
                valUserName:(this.state.reExInput.test(value.target.value.trim().toLowerCase())&&value.target.value.trim().toLowerCase().length>=6)?true:false
            }
        )
        this.printOutMessage(value.target.value.trim().toLowerCase(),"name");
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
    changeCheckbox(value){
        this.setState
        (
            {
                isCheckedbox:value.target.checked,
            }
        )
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
                        notification:`Vui lòng nhập đúng ${type}!!!`
                    }
                )
            }
        }
    }
    sendRegister(){
        if(this.state.valUserName&&this.state.valPass&&this.state.valEmail&&this.state.isCheckedbox){
            var url = "/register";
            var data = {
                    name     : this.state.name,
                    email    : this.state.email,
                    password : this.state.password,
                }
            axios.post(url , data).then((data)=>{
                if(data.data.err){
                    this.setState({
                        sessionSVer: data.data.err
                    })
                }else {
                    window.location.href = "http://localhost:3000/"
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
                    <div className="panel panel-signup">
                        <div className="panel-body">
                            <div className="logo text-center">
                            </div>
                            <br />
                            <h4 className="text-center mb5">Tạo tài khoản</h4>
                            <p className="text-center">Vui lòng nhập thông tin đăng nhập</p>
                            <div className="mb30"><p className="logo">{this.state.notification}{this.state.sessionSVer}</p></div>
                            <div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="input-group mb15">
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                            <input type="text" className="form-control" placeholder="Họ và tên" 
                                                value={this.state.name} onChange={this.changeName.bind(this)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="input-group mb15">
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
                                            <input type="email" className="form-control" placeholder="Địa chỉ mail"
                                                    value={this.state.email} onChange={this.changeEmail.bind(this)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="input-group mb15">
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                            <input type="password" className="form-control" placeholder="Nhập mật khẩu" 
                                                    value={this.state.password} onChange={this.changePass.bind(this)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="clearfix">
                                    <div className="pull-left">
                                        <div className="ckbox ckbox-primary mt5">
                                            <input type="checkbox" id="agree" value={this.state.isCheckedbox} onChange={this.changeCheckbox.bind(this)}/>
                                            <label htmlFor="agree">Tôi đồng ý với<a href="">Các điều khoản và điều kiện</a></label>
                                        </div>
                                    </div>
                                    <div className="pull-right">
                                        <button type="submit" className="btn btn-success" onClick={this.sendRegister.bind(this)}>Tạo tài khoản mới <i className="fa fa-angle-right ml5"></i></button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="panel-footer">
                            <Link to="/"><ul className="btn btn-primary btn-block">Đã là thành viên? Đăng nhập</ul></Link>
                        </div>
                    </div>
                </section>
            )
        }
    }