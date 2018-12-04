const db = require("../modules/db");
const mongodb = require("mongodb");

module.exports.getShopType = function(req,res){
	db.find("shopTypeList",{},function(err,shopTypeList){
		var num = Math.ceil(shopTypeList.length/10);
		var shopTypeLists=[];
		for(var i = 0; i < num ; i++){
			shopTypeLists[i]=[];
			for(var j=i*10;j<i*10+10 && j<shopTypeList.length;j++){
				shopTypeLists[i].push(shopTypeList[j]);
			}
		}
		res.json({
			ok:1,
			shopTypeLists
		})
	})
}

module.exports.getAdvsStop = function(req,res){
	db.find("advsList",{
		whereObj:{advsName:"1"}
	},function(err,advsList){
		res.json({
			ok:1,
			advsList
		})
//		console.log(advsList)
	})
}

module.exports.getAdvsRun = function(req,res){
	db.find("advsList",{
		whereObj:{advsName:"2"}
	},function(err,advsList){
		res.json({
			ok:1,
			advsList
		})
	})
}

module.exports.homegetShopList = function(req,res){
	var pageIndex = req.query.pageIndex/1;
	var pageSum = 1;
	var pageNum = 10;
	db.count("shopList",{},function(count){
		var pageSum = Math.ceil(count / pageNum);
		if(pageSum < 0)
			pageSum = 1;
		if(pageIndex > pageSum)
			pageIndex = pageSum;
			db.find("shopList",{
				limitNum:pageNum,
				skipNum:(pageIndex - 1) * pageNum
			},function(err,shopList){
				setTimeout(()=>{
						res.json({
						ok:1,
						shopList,
						pageSum
					})
				},2000)
			})
	})
}

module.exports.getShopListByType = function(req,res){
	var shopTypeId = mongodb.ObjectID(req.query.id)
	db.find("shopList",{
		whereObj:{shopTypeId:shopTypeId}
	},function(err,shopList){
		res.json({
			ok:1,
			shopList
		})
	})
}

module.exports.getGoodsByshopId = function(req,res){
	var id = mongodb.ObjectID(req.query.id)
	console.log(id);
	var whereObj = {
		shopId: id
	}
	console.log(whereObj)
	db.getGoodsAndType(whereObj,function(err,goodsTypeList){
		res.json({
			ok:1,
			goodsTypeList
		})
	})  
}

module.exports.getGoodsListById = function(req,res){
	db.findOneById("goodsList",req.query.id,function(err,goodsList){
		res.json({
			ok:1,
			goodsList
		})
	})
}

