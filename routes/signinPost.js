const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const assert = require('assert');
const hash = require('hasha');

const url = 'mongodb://127.0.0.1:27017/manageruser';
/* GET home page. */
router.post('/', function(req, res, next) {
	var query = {
		email : req.body.email
	}
	try{
		mongo.connect(url,function(err,db){
			assert.equal(null,err);
				db.collection('userlist').findOne(query,function(err,result){
					if(result){
						if(result.password === hash(req.body.password)){
							res.send(JSON.stringify({"href":`admin/?id=${result._id}&name=${result.name}&userid=${result.password}&email=${result.email}`}));
						}else{
							res.send(JSON.stringify({"error":"Email hoặc mật khẩu không đúng!"}))
						}
					}else{
						res.send(JSON.stringify({"error":"Email hoặc mật khẩu không đúng!"}))
					}
					assert.equal(null,err);
					db.close();
				});
		});
	}catch(e){
		res.send(JSON.stringify({"error":"Lỗi kết nối database!"}))
	}
});

module.exports = router;
