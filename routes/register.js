const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const assert = require('assert');
const hash = require('hasha');

const url = 'mongodb://127.0.0.1:27017/manageruser';

/* POST FROM REGISTER*/
router.post('/', function(req, res, next) {
	var data = {
		name  	 	 : req.body.name,
		email 	 	 : req.body.email,
		password 	 : hash(req.body.password),
		sendMail 	 : [],
		GMail    	 : [],
		countMailGroup: 0,
		countMailList: 0,
		historyCustomG: [],
		historyCustom: [],
	}
	mongo.connect(url,function(err,db){
		assert.equal(null,err);
			try {
				db.collection('userlist').insertOne(data,function(err,result){
					res.send(JSON.stringify({ "message":"Đăng ký thành công!"}));
					assert.equal(null,err);
					db.close();
				});
			} catch(e) {
				res.send(JSON.stringify({"err":"Đã có người sữ dụng email này"}))
			}
	});
});

module.exports = router;
