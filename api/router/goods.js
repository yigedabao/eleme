const {upPic} = require("../modules/upPic");
const db = require("../modules/db");
const mongodb = require("mongodb");

module.exports.addGoodsType = function(req,res){
	upPic(req,"goodsTypePic",function(obj){
		if(obj.ok === 1){
			db.insertOne("goodsTypeList",{
				goodsTypeName:obj.params.goodsTypeName,
				goodsTypePic:obj.newPicName,
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

module.exports.getGoodsTypeList = function(req,res){
	var goodsTypeName = req.query.goodsTypeName;
	var whereObj = {
		goodsTypeName:new RegExp(goodsTypeName)
	}
	db.find("goodsTypeList",{
		sortObj:{
			addTime:-1
		},
		whereObj:whereObj
	},function(err,goodsTypeList){
		res.json({
			ok:1,
			goodsTypeList
		})
	})
}

module.exports.delGoodsTypeList = function(req, res) {
	db.deleteOneById("goodsTypeList", req.query.id, function(err, results) {
		res.json({
			ok: 1,
			msg: "删除类别成功"
		})
	})
}
