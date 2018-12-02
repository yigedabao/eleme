const {upPic} = require("../modules/upPic");
const db = require("../modules/db");
const mongodb = require("mongodb");

module.exports.addAdvs = function(req,res){
	upPic(req,"advsPic",function(obj){
		if(obj.ok === 1){
			db.insertOne("advsList",{
				advsName:obj.params.advsName,
				advsPic:obj.newPicName,
				addTime:Date.now()
			},function(){
				res.json({
					ok:1,
					msg:"上传成功"
				})
			})
		}else{
			res.json({
				ok:2,
				msg:obj.msg
			})
		}
	})
}

module.exports.getAdvsList = function(req,res){
	var advsName = req.query.advsName;
	var whereObj = {
		advsName:new RegExp(advsName)
	}
	db.find("advsList",{
		whereObj:whereObj
	},function(err,advsList){
		res.json({
			ok:1,
			advsList
		})
	})
}

module.exports.delAdvsList = function(req,res){
	db.deleteOneById("advsList",req.query.id,function(err,results){
		res.json({
			ok:1,
			msg:"删除广告成功"
		})
	})
}
