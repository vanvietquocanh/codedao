const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const assert = require('assert');
const hash = require('hasha');

const url = 'mongodb://127.0.0.1:27017/manageruser';

/* POST FROM savedata*/
router.post('/', function(req, res, next) {
	var query = {
		"email" : req.body.email
	}
	try{
		mongo.connect(url,function(err,db){
			assert.equal(null,err);
				db.collection('userlist').findOne(query,function(err,result){
					if(result){
						res.send(JSON.stringify({"data":result}))
					}else{
						res.send(JSON.stringify({"error":"Lỗi kết nối database"}))
					}
					assert.equal(null,err);
					db.close();
				});
		});
	}catch(e){
		res.send(JSON.stringify({"error":"Lỗi kết nối database"}))
	}
});

module.exports = router;
