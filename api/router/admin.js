const db = require("../modules/db");
const common = require("../modules/common");
const md5 = require("md5");
const myEnum = require("../modules/Enum");

module.exports.login = function(req, res) {
	db.findOne("adminList", {
		adminName: req.body.adminName,
		passWord: md5(req.body.passWord + "@!Ele.Com")
	}, function(err, adminInfo) {
		if(adminInfo) {
			db.insertOne("adminLog", {
				adminId: adminInfo._id,
				logType: 1,
				addTime: Date.now(),
				detail: adminInfo.adminName + "于" + common.getNowTime() + "登录了"
			}, function(err, results) {
				res.json({
					ok: 1,
					adminId: adminInfo._id,
					adminName: adminInfo.adminName,
					msg: "登录成功！"
				})
			})

		} else {
			res.json({
				ok: 2,
				msg: "用户名或密码错误"
			})
		}
	})

}

//删除管理员
module.exports.delAdminList = function(req, res) {
	db.deleteOneById("adminList", req.query.id, function(err, results) {
		res.json({
			ok: 1,
			msg: "删除成功"
		})
	})
}

//添加新管理员
module.exports.addAdmin = function(req, res) {

	db.count("adminList", {
		adminName: req.body.adminName
	}, function(count) {
		console.log(count);
		if(count < 1) {
			db.insertOne("adminList", {
				adminName: req.body.adminName,
				passWord: md5(req.body.passWord + "@!Ele.Com")
			}, function(err) {
				res.json({
					ok: 1,
					msg: "添加管理员成功"
				})
			})
		} else {
			res.json({
				ok: 2,
				msg: "该用户已存在"
			})
		}
	})
}

//获取管理员数据库信息
module.exports.seeAdminList = function(req, res) {
	db.find("adminList", {}, function(err, adminList) {
		res.json({
			ok: 1,
			adminList
		})
	})
}

//分页
module.exports.getAdminLogList = function(req, res) {
	var pageIndex = req.query.pageIndex / 1;
	var pageSum = 1;
	var pageNum = 5;
	db.count("adminLog", {}, function(count) {
		var pageSum = Math.ceil(count / pageNum); //总页数
		if(pageSum < 0)
			pageSum = 1;
		if(pageIndex > pageSum)
			pageIndex = pageSum;
		db.getAdminLogList((pageIndex - 1) * pageNum, pageNum, function(err, adminLogList) {
			res.json({
				ok: 1,
				adminLogList,
				adminLogEnum: myEnum.adminLogEnum,
				pageSum
			})
		});
	})
}

//删除登录信息
module.exports.dellogList = function(req, res) {
	//	console.log(req.query.id)
	db.deleteOneById("adminLog", req.query.id, function(err, results) {
		res.json({
			ok: 1,
			msg: "删除成功"
		})
	})
}

//修改密码
module.exports.changepassword = function(req, res) {
	var passWord = md5(req.body.passWord + "@!Ele.Com")
	var newpassWord = md5(req.body.newpassWord + "@!Ele.Com");
	console.log(req.body.id)
	db.findOneById("adminList", req.body.id, function(err, adminList) {
		if(adminList) {
//			console.log(adminList.passWord)
			if(adminList.passWord === passWord) {
				db.updateOneById("adminList", adminList._id, {$set: {
					passWord:newpassWord
				}}, function(err, results) {
					res.json({
						ok: 1,
						msg: "修改成功"
					})
				})
			} else {
				res.json({
					ok: 2,
					msg: "原密码错误"
				})
			}
		} else {
			res.json({
				ok: 2,
				msg: "网络连接异常"
			})
		}

	})
}