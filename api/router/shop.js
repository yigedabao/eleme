const {upPic} = require("../modules/upPic");
const db = require("../modules/db");
const mongodb = require("mongodb");
module.exports.addShopType = function(req, res) {
	upPic(req, "shopTypePic", function(obj) {
		if(obj.ok === 1) {
			db.insertOne("shopTypeList", {
				shopTypeName: obj.params.shopTypeName,
				shopTypePic: obj.newPicName,
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

module.exports.getShopTypeList = function(req, res) {
	var shopTypeName = req.query.shopTypeName;
	var whereObj = {
		shopTypeName:new RegExp(shopTypeName)
	}
	var pageIndex = req.query.pageIndex / 1;
	var pageSum = 0;
	var pageNum = 5;
	db.count("shopTypeList", whereObj, function(count) {
		var pageSum = Math.ceil(count / pageNum);
		if(pageSum < 0) {
			pageSum = 1;
		}
		if(pageIndex > pageSum) {
			pageIndex = pageSum
		}
		if(pageIndex < 1) {
			pageIndex = 1;
		}
		var skipIndex = (pageIndex - 1) * pageNum;
		db.find("shopTypeList", {
			sortObj: {
				addTime: -1
			},
			whereObj:whereObj,
			skipNum: skipIndex,
			limitNum: pageNum
		}, function(err, shopTypeList) {
			res.json({
				ok: 1,
				shopTypeList,
				pageSum,
				pageIndex
			})
		})
	})
}

module.exports.delShopTypeList = function(req, res) {
	db.deleteOneById("shopTypeList", req.query.id, function(err, results) {
		res.json({
			ok: 1,
			msg: "删除类别成功"
		})
	})
}

module.exports.getShopList = function(req, res) {
	db.find("shopTypeList", {}, function(err, shopTypeList) {
		res.json({
			ok: 1,
			shopTypeList,
			msg: "成功找到"
		})
	})
}

module.exports.addShop = function(req, res) {
	upPic(req, "shopPic", function(obj) {
		if(obj.ok === 1) {
			db.insertOne("shopList", {
				shopName: obj.params.shopName,
				shopPic: obj.newPicName,
				shopTypeId: mongodb.ObjectID(obj.params.shopTypeId),
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

module.exports.getShopLists = function(req, res) {
	var shopName = req.query.shopName;
	var whereObj = {
		shopName:new RegExp(shopName)
	}
	var pageIndex = req.query.pageIndex / 1;
	var pageSum = 1;
	var pageNum = 5;
	db.count("shopList", whereObj, function(count) {
		var pageSum = Math.ceil(count / pageNum); //总页数
		if(pageSum < 0)
			pageSum = 1;
		if(pageIndex > pageSum)
			pageIndex = pageSum;
		db.getShopList(whereObj,(pageIndex - 1) * pageNum, pageNum, function(err, shopList) {
			res.json({
				ok: 1,
				shopList,
				pageSum
			})
		})
	})
}

module.exports.delShopLists = function(req,res){
	db.deleteOneById("shopList", req.query.id, function(err, results) {
		res.json({
			ok: 1,
			msg: "删除店铺成功"
		})
	})
}

module.exports.getShopInfoById = function(req,res){
	db.findOneById("shopList",req.query.shopId,function(err,shopInfo){
		res.json({
			ok:1,
			shopInfo,
			msg:"成功"
		})
	})
}

module.exports.updataShop=function(req,res){
    upPic(req,"shopPic",function(obj){
//      console.log(obj);
        if(obj.ok===2){
            res.json({
                ok:2,
                msg:obj.msg
            })
        }else{
            var upObj={
                $set:{
                    shopName:obj.params.shopName,
                    shopTypeId:mongodb.ObjectID(obj.params.shopTypeId),
                }
            }
            if(obj.newPicName){// 上传了图片
                upObj.$set.shopPic=obj.newPicName;
            }
            db.updateOneById("shopList",obj.params.shopId,upObj,function(err,results){
                res.json({
                    ok:1,
                    msg:"修改成功"
                })
            })
        }

    })
}
