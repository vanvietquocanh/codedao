var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	if(req.query.id&&req.query.userid&&req.query.name){
  		res.render("admin");
	}else{
		res.render("error",{"message":"Chưa đăng nhập","error":{"status":404,"stack":"Chưa đăng nhập"}})
	}
});

module.exports = router;
