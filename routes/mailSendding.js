const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bassic = require("./bassicMail")
const mongo = require('mongodb')
const assert = require('assert')
const beautiful = require("./beautifulTemplate")
const classic = require("./classicTemplate")


const url = 'mongodb://127.0.0.1:27017/manageruser';
/* POST FROM admin*/
router.post('/', function(req, res, next) {
	var group,list;
	var query = {
		"email" : req.body.user
	}
	// try{
		mongo.connect(url,function(err,db){
			assert.equal(null,err);
				db.collection('userlist').findOne(query,function(err,result){
					group = result.countMailGroup;
					list = result.countMailList;
					assert.equal(null,err);
					db.close();
				});
		});
	// }catch(e){
	// }
	function respone() {
		var data = 0;
	    	if(req.body.type === "L"){
	    		list+=req.body.mailList.length;
	    		data = {
					$set:{
						"countMailList":list,
						},
					$push:{
						"historyCustom":[req.body, new Date()]
					}
				}
	    	}else{
	    		group+=req.body.mailList.length;
	    		data = {
					$set:{
						"countMailGroup":group,
					},
					$push:{
						"historyCustomG":[req.body, new Date()]
					}
				}
	    	}
	    	mongo.connect(url,(err,db)=>{
	    		assert.equal(null,err);
	    		db.collection("userlist").updateOne(query, data, {upsert:true},(err,result)=>{
	    			assert.equal(null,err);
					db.close();
	    		})
	    	})
	}
	function sendMail(template,id,pass, type) {
		var transporter = nodemailer.createTransport(`smtps://hethongquanlyemail%40gmail.com:soutngaylapmail@smtp.gmail.com`);
		var mailOptions = {
			    from: 'Hệ Thống Quản Lý',
			    to: req.body.mailList.toString(),
			    subject: 'Hệ Thống Quản Lý', 
			    html: template
			};
		transporter.sendMail(mailOptions, (error, info) => {
		    if (error) {
		    	res.send("error");
		    }else{
		    	respone();
		    	res.send('Success');
		    }
		});
	}
	function checktemplate(template) {
		switch(template){
			case "BasicTemplate":
				sendMail(bassic(req.body.title,req.body.content), req.body.id, req.body.pass, req.body.type)
				break;

			case "ClassicTemplate":
				sendMail(classic(req.body.title,req.body.content), req.body.id, req.body.pass, req.body.type)
				break;

			case "BeautifulTemplate":
				sendMail(beautiful(req.body.title,req.body.content), req.body.id, req.body.pass, req.body.type)
				break;
		}
	}
	checktemplate(req.body.template);
});

module.exports = router;
