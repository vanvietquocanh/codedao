import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import "./sendmail.scss"
import HeaderSide from "../Header"
import LeftPanel from "../LeftPanel"
import moment from "moment"
import axios from "axios"
export default class Send extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items        : [],
            mailSelect   : [],
            AddName      : "",
            AddEmail     : "",
            AddFrom      : "",
            AddAge       : "",
            sttServer    : "",
            reExEmail    :/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            validate     : "",
            keySearch    : "",
            title        : "",
            valMailSend  : "",
            content      : "",
            STTSV        : "",
            ObjGroupMail : "",
            valueSelect  : "",
            classTagI    : "fa fa-paper-plane",
            Template     : "BasicTemplate",
            reRender     : true,
            elEditer     : "",
            btnUpdate    : false,
        }
    }
    onAddNameChange(e){
        this.setState({
            AddName: e.target.value
        })
    }
    onAddEmailChange(e){
        this.setState({
            AddEmail: e.target.value.trim().toLowerCase(),
        })
    }
    onAddFromChange(e){
        this.setState({
            AddFrom: e.target.value
        })
    }
    onAddAgeChange(e){
        this.setState({
            AddAge: e.target.value
        })
    }
    onAddData(e){
        if(this.state.items.filter((item)=>(item.email===this.state.AddEmail)).length===0){
            if(this.state.reExEmail.test(this.state.AddEmail)){
                if(isFinite(this.state.AddAge)&&this.state.AddAge<=100){
                    var data = {
                        name : this.state.AddName,
                        email: this.state.AddEmail,
                        from : this.state.AddFrom,
                        age  : this.state.AddAge,
                        time : moment().format('MMMM Do YYYY, h:mm:ss a'),
                    }
                    this.state.items.push(data);
                    this.setState({
                        AddName  :"",
                        AddEmail :"",
                        AddFrom  :"",
                        AddAge   :"",
                        validate :"",
                    })
                }else{
                    this.setState({
                        validate: "Vui lòng nhập đúng định dạng tuổi!!!",
                        AddAge  :"",
                    })
                }
            }else{
                this.setState({
                    validate: "Vui lòng nhập đúng định dạng mail!!!",
                    AddEmail: "",
                })
            }
        }else{
            this.setState({
                validate:`Đã tồn tại email "${this.state.AddEmail}"!!!`,
                AddEmail: "",
            })
        }
        setTimeout(()=>{
            this.setState({
                validate: "",
            })
        },3000)
    }
    clearBtn(e,i){
        var quest = confirm(`Bạn chắc chắn muốn xóa email "${this.state.items[e].email}" ?`);
        if(quest){
            this.state.items.splice(e,1);
            this.setState({
                reRender : false,
            })
        }
    }
    saveData(){
        var href = this.props.location.state.href;
        var data = {
            user :{
                email: href.split("email=")[1]
            },
            dataItems: this.state.items
        }
        axios.post("/savedata", data)
        .then(data=>this.sttSV(data.data.res))
        .catch(err=>this.sttSV(err))

        var data1 = {
            user :{
                email: href.split("email=")[1],
            },
            dataItems: this.state.ObjGroupMail,
        }
        console.log(data1)
        axios.post("/savegroupmail", data1)
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
    searchPerson(e){
        this.setState({
            keySearch: e.target.value
        })
    }
    changeTemplateMail(e){
        this.setState({
          Template: e.target.value  
        })
    }
    sendingMail(){  
        if(this.state.title===""){
            this.setState({
                valMailSend: "Vui Lòng nhập tiêu đề!!!",
            })
        }else if(this.state.content===""){
            this.setState({
                valMailSend: "Vui Lòng nhập nội dung thư!!!",
            })
        }else if(this.state.mailSelect.length===0){
            this.setState({
                valMailSend: "Vui Lòng chọn người nhận!!!",
            })
        }else{
            this.setState({
                classTagI : "fa fa-spinner fa-pulse"
            })
            var data = {
                user    : this.props.location.state.href.split("email=")[1],
                type    : "L",
                mailList: this.state.mailSelect.map((email,index)=>(email)),
                title   : this.state.title,
                content : this.state.content,
                template: this.state.Template,
            }
            axios.post("/send", data).then(res=>{
                this.setState({
                    classTagI    : "fa fa-paper-plane",
                    STTSV        : res.data,
                })
                setTimeout(()=>{
                    this.setState({
                        STTSV        : "",
                    })
                },3000)
            }).catch(err=>console.log(err))
        }
    }
    checkboxValue(e){
        if(e.target.checked){
            this.state.mailSelect.push(e.target.value)
        }else{
            var oldArray = this.state.mailSelect;
            this.state.mailSelect = [];
            oldArray.forEach((item)=>{
                if(item !== e.target.value){
                    this.state.mailSelect.push(item)
                }
            })
        }
    }
    changeTitle(e){
        this.setState({
            title   : e.target.value,
        })
    }
    changeContent(e){
        this.setState({
            content : e.target.value,
        })
    }
    componentDidMount(){
        var data = {
            email: this.props.location.state.href.split("email=")[1]
        }
        axios.post("/getdata", data).then(res=>{
            this.setData(res.data.data)
        }).catch(err=>console.log(err))
    }
    editElement(e,i){
        this.setState({
            AddName      : this.state.items[e].name,
            AddEmail     : this.state.items[e].email,
            AddFrom      : this.state.items[e].from,
            AddAge       : this.state.items[e].age,
            btnUpdate    : true,
            elEditer     : e,
        })
    }
    onEditData(e){
        this.state.items[this.state.elEditer].name = this.state.AddName;
        this.state.items[this.state.elEditer].email = this.state.AddEmail;
        this.state.items[this.state.elEditer].from = this.state.AddFrom;
        this.state.items[this.state.elEditer].age = this.state.AddAge;
        this.setState({
            AddName   :"",
            AddEmail  :"",
            AddFrom   :"",
            AddAge    :"",
            btnUpdate : false,
            elEditer  : "",
        })
    }
    setData(data){
        this.setState({
            items    : data.sendMail,
            ObjGroupMail: data.GMail,
            valueSelect : `${Object.keys(data.GMail[0])}-0`,
        })
    }
    changeSelVal(e){
        this.setState({
            valueSelect: e.target.value
        })
    }
    pushListToGroup(e){
        function checkLength(test){
            return test.length>=0;
        }
        function checkValue(item,value){
            return item.email.indexOf(value)!==-1;
        }
        if(checkLength(this.state.mailSelect)&&this.state.ObjGroupMail){
            var nameObj = this.state.valueSelect.split("-")[0];
            var index = this.state.valueSelect.split("-")[1];
            var group = this.state.ObjGroupMail[index][nameObj];
            this.state.mailSelect.forEach(e=>{
                this.state.items.forEach(item=>{
                    if(checkValue(item,e)){
                        if(group.length===0){
                            group.push(item);
                        }else{
                            var resultBoolean = true;
                            group.forEach(person=>{
                                if(checkValue(person,item.email)){
                                    resultBoolean = false;
                                }
                            })
                            if(resultBoolean){
                                this.state.ObjGroupMail[index][nameObj].push(item);
                                console.log(this.state.ObjGroupMail);
                            }
                        }
                    }
                })
            })
        }else{
            alert("Vui lòng tạo nhóm!!!");
        }
    }
    render(){
        var data,search,btn,selGrMail;
        if(this.state.items.length>0){
            search = this.state.items.filter((value)=>value.email.indexOf(this.state.keySearch)!==-1)
            data = search.map((item,i)=>(<tr key={i}>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.from}</td>
                                            <td>{item.age}</td>
                                            <td>{item.time}</td>
                                            <td><input type="checkbox" className="checkSend" name="send" value={item.email} onChange={this.checkboxValue.bind(this)}/></td>
                                            <td style={{"textAlign":"center"}}><button className="checkSend delbuttons" onClickCapture={this.clearBtn.bind(this,i)} style={{"width":"50%"}}><i className="fa fa-times-circle-o fa-lg" aria-hidden="true"/></button></td>
                                            <td style={{"textAlign":"center"}}><button className="checkSend delbuttons" onClickCapture={this.editElement.bind(this,i)} style={{"width":"50%"}}><i className="fa fa-pencil fa-lg" aria-hidden="true"/></button></td>
                                        </tr>));
        }
        if(this.state.btnUpdate){
            btn = (<button onClick={this.onEditData.bind(this)} className="button-add"><i className="fa fa-check" aria-hidden="true"/></button>)
        }else{
            btn = (<button onClick={this.onAddData.bind(this)} className="button-add"><i className="fa fa-plus" aria-hidden="true"/></button>)
        }

        if(this.state.ObjGroupMail.length>0){
            selGrMail = this.state.ObjGroupMail.map((event,index)=>{
                return (<option key={index} value={`${Object.keys(event)}-${index}`}>{Object.keys(event)}</option>)
            })
        }
        return(
           <div>
        <div>
            <HeaderSide/>
                <section>
                <div className="mainwrapper" style={{"background":"#fff"}}>
                     <LeftPanel 
                        activeSendmail="active"
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
                                        <li><a href="">mailmanager</a></li>
                                    </ul>
                                    <h4>Quản Lý Mail</h4>
                                </div>
                            </div>
                        </div>
                        
                        <div className="contentpanel">
                            
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4 className="panel-title">Quản Lý Mail</h4>
                                    <p><a href="" target="_blank"></a></p>
                                    <ul className="flex-search-save saveBTN">
                                        <label style={{"lineHeight":"2em","fontSize":"2em"}}>
                                            Nhóm: 
                                        </label>
                                        <select className="sel-event sel-event-send" onChange={this.changeSelVal.bind(this)}>
                                            {selGrMail}
                                        </select>
                                        <button className="button-add fixed-btn mg-bt" onClick={this.pushListToGroup.bind(this)}>
                                            <i className="fa fa-files-o"/>
                                        </button>
                                        <p style={{"color":"red", "lineHeight":"2.3em", "fontSize":"20px", "textAlign":"center"}}>{this.state.sttServer}</p>
                                        <p style={{"color":"red", "lineHeight":"3.5em", "fontSize":"13px", "width":"135%"}}>{this.state.validate}</p>
                                        <input 
                                            className="in-add save-search search-box" 
                                            type="text" 
                                            placeholder="Search..."
                                            onChange={this.searchPerson.bind(this)}
                                        />
                                        <button className="delbuttons save-search flex-search-save mg-bt" style={{"paddingRight":"1em"}} onClick={this.saveData.bind(this)}>
                                            <i className="fa fa-floppy-o" aria-hidden="true"/>  Save
                                        </button>
                                    </ul>
                                <table id="basicTable" className="table table-striped table-bordered responsive">
                                <thead className="fieldName">
                                    <tr >
                                        <th className="fieldName">Tên</th>
                                        <th className="fieldName">Email</th>
                                        <th className="fieldName">Địa chỉ</th>
                                        <th className="fieldName customsize">Tuổi</th>
                                        <th className="fieldName">Ngày Thêm</th>
                                        <th className="fieldName customsize" style={{"minWidth":"60px"}}>Chọn</th>
                                        <th className="fieldName" style={{"minWidth":"80px"}}>Xóa</th>
                                        <th className="fieldName" style={{"minWidth":"80px"}}>Sửa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data}
                                    <tr>
                                        <td style={{"lineHeight":"1.8em"}}><input className="addElment" onChange={this.onAddNameChange.bind(this)} value={this.state.AddName} type="text"/></td>
                                        <td style={{"lineHeight":"1.8em"}}><input className="addElment" onChange={this.onAddEmailChange.bind(this)} value={this.state.AddEmail} type="text"/></td>
                                        <td style={{"lineHeight":"1.8em"}}><input className="addElment" onChange={this.onAddFromChange.bind(this)} value={this.state.AddFrom} type="text"/></td>
                                        <td style={{"lineHeight":"1.8em"}}><input className="addElment" onChange={this.onAddAgeChange.bind(this)} value={this.state.AddAge} type="text"/></td>
                                        <td className="fieldName">{btn}</td>
                                    </tr>
                                </tbody>
                            </table>
                                <h1 style={{"color":"red", "lineHeight":"2.3em", "fontSize":"20px"}}>{this.state.STTSV}</h1>
                                </div>
                               <div className="panel-body row">
                                    <ul style={{"display":"flex", "width":"100%", "paddingLeft":"0"}}>
                                        <input type="text" className="titleMail" placeholder="Tiêu đề mail" value={this.state.title} onChange={this.changeTitle.bind(this)}/>
                                        <select style={{"padding":".2em","marginLeft":"2em"}} onChange={this.changeTemplateMail.bind(this)}>
                                            <option value="BasicTemplate">Mẫu Cơ bản</option>
                                            <option value="ClassicTemplate">Mẫu Cổ Điển</option>
                                            <option value="BeautifulTemplate">Mẫu Đẹp</option>
                                        </select>
                                    </ul>
                                    <h6 style={{"color":"red"}}>{this.state.valMailSend}</h6>
                                    <textarea id="wysiwyg" 
                                        placeholder="Nội dung mail..." 
                                        className="form-control" 
                                        value={this.state.content} 
                                        rows="10"
                                        onChange={this.changeContent.bind(this)}
                                    />
                                </div>
                                <button className="send" onClick={this.sendingMail.bind(this)}><i className={this.state.classTagI} aria-hidden="true"/></button>
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