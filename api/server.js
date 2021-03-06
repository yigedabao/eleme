const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const admin = require("./router/admin");
const shop = require("./router/shop");
const goods = require("./router/goods");
const advs = require("./router/advs");
const home = require("./router/home");
app.use(express.static("./upload"));
app.use(bodyParser.json());
app.all("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","content-type");
	res.header("Access-Control-Allow-Methods","PUT");
    next();
});


//**********************************前端渲染******************************************
//获取商店列表
app.get("/getShopType",home.getShopType);
//获取静态广告
app.get("/getAdvsStop",home.getAdvsStop);
//获取动态广告
app.get("/getAdvsRun",home.getAdvsRun);
//获取店铺列表
app.get("/homegetShopList",home.homegetShopList);
//根据类别获取店铺信息
app.get("/getShopListByType",home.getShopListByType);
//根据店铺id获取商品
app.get("/getGoodsByshopId",home.getGoodsByshopId);

//根据id获取要使用的商品
app.get("/getGoodsListById",home.getGoodsListById);













//********************************后台管理**********************************


//************************广告******************************
//添加广告
app.post("/addAdvs",advs.addAdvs);
//获取广告信息
app.get("/getAdvsList",advs.getAdvsList);
//删除广告
app.get("/delAdvsList",advs.delAdvsList);
//************************商品分类******************************
//添加商品类别
app.post("/addGoodsType",goods.addGoodsType);
//联查获取商品类别信息
app.get("/getGoodsTypeList",goods.getGoodsTypeList);
//删除商品类别
app.get("/delGoodsTypeList",goods.delGoodsTypeList);
//获取店铺信息
app.get("/getShopListGood",goods.getShopListGood);
//单独获取商品类别信息
app.get("/getGoodsTypeLists",goods.getGoodsTypeLists);
//添加商品
app.post("/addGoods",goods.addGoods);
//联查获得商品信息
app.get("/getGoodsList",goods.getGoodsList);
//删除商品
app.get("/delGoodsList",goods.delGoodsList);
//************************店铺分类******************************
//添加店铺类别
app.post("/addShopType",shop.addShopType);
//获取店铺类别信息,分页
app.get("/getShopTypeList",shop.getShopTypeList);
//删除商品类别
app.get("/delShopTypeList",shop.delShopTypeList);
//查找shopTypelist
app.get("/getShopList",shop.getShopList);
//添加店铺信息
app.post("/addShop",shop.addShop);
//多表联查店铺列表信息
app.get("/getShopLists",shop.getShopLists);
//删除店铺
app.get("/delShopLists",shop.delShopLists);

//编辑接口  根据店铺ID获得店铺信息
app.get("/getShopInfoById",shop.getShopInfoById);
//修改店铺
app.put("/addShop",shop.updataShop)
//************************管理员**************************
app.post("/login",admin.login);
//删除管理员
app.get("/delAdminList",admin.delAdminList);
//添加新管理员
app.post("/addAdmin",admin.addAdmin);

//修改密码
app.post("/changepassword",admin.changepassword);

//获取管理员数据库信息
app.get("/seeAdminList",admin.seeAdminList);
//分页
app.get("/getAdminLogList",admin.getAdminLogList);
//删除登录信息
app.get("/dellogList",admin.dellogList);

app.listen(80,function(){
	console.log("success")
});
