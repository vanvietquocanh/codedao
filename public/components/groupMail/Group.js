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
export default class Send extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            event        : [],
            AddName      : "",
            AddEmail     : "",
            AddFrom      : "",
            AddAge       : "",
            AddEvent     : "",
            nameGSel     : "",
            sttServer    : "",
            reExEmail    :/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            validate     : "",
            keySearch    : "",
            valMailSend  : "",
            title        : "",
            content      : "",
            elEditer     : "",
            classTagI    : "fa fa-paper-plane",
            Template     : "BasicTemplate",
            localArr     : 0,
            btnUpdate    : false,
            reRender     : true,
        }
    }
    onAddNameChange(e){
        this.setState({
            AddName: e.target.value
        })
    }
    onAddEmailChange(e){
        this.setState({
            AddEmail: e.target.value.trim().toLowerCase()
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
        if(this.state.event.length !== 0){   
            if(this.state.event[this.state.localArr][`${this.state.nameGSel}`].filter((item)=>(item.email===this.state.AddEmail)).length===0){
                if(this.state.reExEmail.test(this.state.AddEmail)){
                    if(isFinite(this.state.AddAge)&&this.state.AddAge<=100){
                        var data = {
                            name : this.state.AddName,
                            email: this.state.AddEmail,
                            from : this.state.AddFrom,
                            age  : this.state.AddAge,
                            time : moment().format('MMMM Do YYYY, h:mm:ss a'),
                        }
                        this.state.event[this.state.localArr][`${this.state.nameGSel}`].push(data);
                        this.setState({
                            AddName  :"",
                            AddEmail :"",
                            AddFrom  :"",
                            AddAge   :"",
                            validate :""
                        })
                    }else{
                        this.setState({
                            validate:"Vui lòng nhập đúng định dạng tuổi!!!",
                            AddAge  :"",
                        })
                    }
                }else{
                    this.setState({
                        validate: "Vui lòng nhập đúng định dạng mail!!!",
                        AddEmail:"",
                    })
                }
            }else{
                this.setState({
                    validate:`Đã tồn tại email "${this.state.AddEmail}"!!!`,
                    AddEmail: "",
                })
            }
        }else{
            this.setState({
                validate: "Vui lòng tạo nhóm trước!"
            })
        }
        setTimeout(()=>{
            this.setState({
                validate: "",
            })
        },2000)
    }
    changeAddEvent(e){
        this.setState({
            "AddEvent": e.target.value  
        })
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
    addNameEvent(){
        if(this.state.AddEvent.trim()!==""){
            var name = this.state.AddEvent;
            var event = {
                [`${name}`]: [],
            }
            this.state.event.push(event);
            this.setState({
                AddEvent : "",
            })
            if(this.state.nameGSel === ""){
                this.setState({
                    nameGSel : name,
                })
            }
        }
    }
    saveData(){
        var href = this.props.location.state.href.split("email=")[1];
        var data = {
            user :{
                email: href,
            },
            dataItems: this.state.event,
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
    changeTemplateMail(e){
        this.setState({
          Template: e.target.value  
        })
    }
    componentDidMount(){
        var data = {
            email: this.props.location.state.href.split("email=")[1]
        }
        axios.post("/getdata", data).then(res=>{
            this.setState({
                event : res.data.data.GMail,
                nameGSel : Object.keys(res.data.data.GMail[0])[0]
            })
        }).catch(err=>console.log(err))
    }
    renameEvent(){
        var newName = prompt("Vui lòng nhập tên mới");
        if(newName!==null){
            this.state.event[this.state.localArr][newName] = this.state.event[this.state.localArr][this.state.nameGSel];
            delete this.state.event[this.state.localArr][this.state.nameGSel];
            this.setState({
                nameGSel: newName,
            })
        }
    }
    clearEvent(){
        let quest = confirm(`Bạn chắc chắn muốn xóa nhóm "${this.state.nameGSel}" ?`);
        if(quest){
            this.state.event.splice(this.state.localArr,1);
            if(this.state.event.length>0){
                this.setState({
                    localArr : 0,
                    nameGSel : Object.keys(this.state.event[0])[0]
                })
            }else{
                this.setState({
                    localArr : 0,
                    nameGSel : ""
                })
            }
        }
    }
    searchPerson(e){
        this.setState({
            keySearch: e.target.value
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
        }else{
            this.setState({
                classTagI : "fa fa-spinner fa-pulse"
            })
            var data = {
                user    : this.props.location.state.href.split("email=")[1],
                type    : "G",
                team    : this.state.nameGSel,
                mailList: this.state.event[this.state.localArr][`${this.state.nameGSel}`].map((items,index)=>(items.email)),
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
    editElement(e,i){
        this.setState({
            AddName      : this.state.event[this.state.localArr][`${this.state.nameGSel}`][e].name,
            AddEmail     : this.state.event[this.state.localArr][`${this.state.nameGSel}`][e].email,
            AddFrom      : this.state.event[this.state.localArr][`${this.state.nameGSel}`][e].from,
            AddAge       : this.state.event[this.state.localArr][`${this.state.nameGSel}`][e].age,
            btnUpdate    : true,
            elEditer     : e,
        })
    }
    onEditData(e){
        this.state.event[this.state.localArr][`${this.state.nameGSel}`][this.state.elEditer].name = this.state.AddName;
        this.state.event[this.state.localArr][`${this.state.nameGSel}`][this.state.elEditer].email = this.state.AddEmail;
        this.state.event[this.state.localArr][`${this.state.nameGSel}`][this.state.elEditer].from = this.state.AddFrom;
        this.state.event[this.state.localArr][`${this.state.nameGSel}`][this.state.elEditer].age = this.state.AddAge;
        this.setState({
            AddName   :"",
            AddEmail  :"",
            AddFrom   :"",
            AddAge    :"",
            btnUpdate : false,
            elEditer  : "",
        })
    }
    render(){
        var data,selected,search,btn;
        try{
            if(this.state.nameGSel!==""&&this.state.event[this.state.localArr][`${this.state.nameGSel}`]){
                search = this.state.event[this.state.localArr][`${this.state.nameGSel}`].filter((value)=>value.email.indexOf(this.state.keySearch)!==-1)
                data = search.map((item,i)=>(<tr key={i}>
                                                            <td>{item.name}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.from}</td>
                                                            <td>{item.age}</td>
                                                            <td>{item.time}</td>
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
                selected = this.state.event.map((event, index)=>(<option key={index} value={`${Object.keys(event)[0]}-${index}`}>{Object.keys(event)[0]}</option>));
            }
        }catch(e){

        }
        if(this.state.btnUpdate){
            btn = (<button onClick={this.onEditData.bind(this)} className="button-add" style={{"lineHeight":"1.5em"}}><i className="fa fa-check" aria-hidden="true"/></button>)
        }else{
            btn = (<button onClick={this.onAddData.bind(this)} className="button-add" style={{"lineHeight":"1.5em"}}><i className="fa fa-plus" aria-hidden="true"/></button>)
        }
    	return(
           <div>
        <div>
            <HeaderSide/>
            <section>
                <div className="mainwrapper" style={{"background":"#fff"}}>
                    <LeftPanel 
                        activeGroup="active"
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
                                        <li><a href="">goup</a></li>
                                    </ul>
                                    <h4>Nhóm Mail</h4>
                                </div>
                            </div>
                        </div>
                        <div className="contentpanel">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4 className="panel-title">Nhóm Mail</h4>
                                    <p><a href="" target="_blank"></a></p>
                                    <div className="sel-add-event">
                                        <select className="sel-event" onChange={this.changeSelVal.bind(this)}>
                                            {selected}
                                        </select>
                                        <ul className="container-add">
                                            <input 
                                                className="in-add" 
                                                type="text" 
                                                onChange={this.changeAddEvent.bind(this)} 
                                                value={this.state.AddEvent} 
                                                placeholder="Thêm Nhóm..."/>
                                            <button className="btn-add" onClick={this.addNameEvent.bind(this)}>
                                                <i className="fa fa-plus" aria-hidden="true"/>
                                            </button>
                                            <button className="btn-add" onClick={this.clearEvent.bind(this)}><i className="fa fa-times-circle-o fa-lg" aria-hidden="true"/></button>
                                        </ul>
                                    </div>
                                    <h1 className="titleEvent">{this.state.nameGSel}</h1>
                                    <ul className="pull-right flex-search-save">
                                        <p style={{"color":"red", "lineHeight":"2.3em", "fontSize":"20px"}}>{this.state.sttServer}</p>
                                        <p style={{"color":"red", "lineHeight":"3em", "fontSize":"15px", "width":"135%"}}>{this.state.validate}</p>
                                        <button className="delbuttons save-search flex-search-save" style={{"paddingRight":"1em"}} onClick={this.renameEvent.bind(this)}>
                                            <i className="fa fa-pencil" aria-hidden="true" style={{"padding":".5em"}}/> Rename
                                        </button>
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
                                        <th className="fieldName">Tên</th>
                                        <th className="fieldName">Email</th>
                                        <th className="fieldName">Địa chỉ</th>
                                        <th className="fieldName customsize">Tuổi</th>
                                        <th className="fieldName">Ngày Thêm</th>
                                        <th className="fieldName" style={{"minWidth":"80px"}}>Xóa</th>
                                        <th className="fieldName" style={{"minWidth":"80px"}}>Sửa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data}
                                    <tr >
                                        <td><input className="addElment" onChange={this.onAddNameChange.bind(this)} value={this.state.AddName} type="text"/></td>
                                        <td><input className="addElment" onChange={this.onAddEmailChange.bind(this)} value={this.state.AddEmail} type="text"/></td>
                                        <td><input className="addElment" onChange={this.onAddFromChange.bind(this)} value={this.state.AddFrom} type="text"/></td>
                                        <td><input className="addElment" onChange={this.onAddAgeChange.bind(this)} value={this.state.AddAge} type="text"/></td>
                                        <td className="fieldName">
                                            {btn}
                                        </td>
                                    </tr>
                                </tbody>
                                    </table>
                                        <h1 style={{"color":"red", "lineHeight":"2.3em", "fontSize":"20px"}}>{this.state.STTSV}</h1>
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
                        </div>
                    </section>
                </div>
           </div>
        )
    }
  }