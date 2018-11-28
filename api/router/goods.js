const {upPic} = require("../modules/upPic");
const db = require("../modules/db");
const mongodb = require("mongodb");

module.exports.addGoodsType = function(req, res) {
	db.insertOne("goodsTypeList", {
		goodsTypeName: req.body.goodsTypeName,
		shopId:mongodb.ObjectID(req.body.shopId),
		addTime: Date.now()
	}, function() {
		res.json({
			ok: 1,
			msg: "上传成功"
		})
	})
}

module.exports.getGoodsTypeList = function(req, res) {
	var goodsTypeName = req.query.goodsTypeName;
	var whereObj = {
		goodsTypeName: new RegExp(goodsTypeName)
	}
	db.getGoodsList(whereObj,function(err, goodsTypeList) {
		res.json({
			ok: 1,
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

module.exports.addGoods = function(req,res){
	upPic(req, "goodsPic", function(obj) {
		if(obj.ok === 1) {
			db.insertOne("goodsList", {
				goodsName: obj.params.goodsName,
				goodsPrice:obj.params.goodsPrice,
				goodsPic: obj.newPicName,
				goodsTypeId: mongodb.ObjectID(obj.params.goodsTypeId),
				shopId: mongodb.ObjectID(obj.params.shopId),
				isHot:obj.params.isHot,
				addTime: Date.now()
			}, function() {
				res.json({
					ok: 1,
					msg: "上传成功"
				})
			})
		} else {
			res.json({
				ok: 2,
				msg: obj.msg
			})
		}
	})
}

module.exports.delGoodsList = function(req,res){
	db.deleteOneById("goodsList",req.query.id,function(err,results){
		res.json({
			ok:1,
			msg:"删除商品信息成功"
		})
	})
}

module.exports.getGoodsList = function(req,res){
	var goodsName = req.query.goodsName;
	var whereObj = {
		goodsName: new RegExp(goodsName)
	}
	db.getShopGoodsType(whereObj,function(err,goodsList){
		res.json({
			ok:1,
			goodsList
		})
	})
}


module.exports.getShopListGood = function(req,res){
	db.find("shopList",{},function(err,shopList){
		res.json({
			ok:1,
			shopList
		})
	})
}

module.exports.getGoodsTypeLists = function(req,res){
	db.find("goodsTypeList",{},function(err,goodsTypeList){
		res.json({
			ok:1,
			goodsTypeList
		})
	})
}
