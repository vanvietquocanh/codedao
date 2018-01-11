const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const assert = require('assert');
const hash = require('hasha');

const url = 'mongodb://127.0.0.1:27017/manageruser';

/* POST FROM groupsave*/
router.post('/', function(req, res, next) {
	var data = {
		$set:{"GMail":req.body.dataItems}
	}
	var query = {
		"email" : req.body.user.email
	}
	try{
		mongo.connect(url,function(err,db){
			assert.equal(null,err);
				db.collection('userlist').updateOne(query, data, {upsert:true}, function(err,result){
					res.send(JSON.stringify({"res":"ok"}))
					assert.equal(null,err);
					db.close();
				});
		});
	}catch(e){
		res.send(JSON.stringify({"res":"err"}))
	}
});

module.exports = router;
