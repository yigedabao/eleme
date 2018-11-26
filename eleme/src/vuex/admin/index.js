import axios from "axios";
import Vue from "vue";
var vue=new Vue();
export default{
	state:{
		adminName:localStorage.adminName || null,
		adminId:localStorage.adminId || null
	},
	mutations:{
		CHANGE_ADMININFO(state,info){
            state.adminId=localStorage.adminId=info.adminId;
            state.adminName=localStorage.adminName=info.adminName;
       },
       OUT_LOGIN(state){
       		console.log("vuexLogin")
       		localStorage.clear();
       		state.adminId=localStorage.adminId;
            state.adminName=localStorage.adminName;
            vue.$message({
            	message:"退出成功",
            	type:'success'
            });
       },
       CHANGE_ADDADMIN(state,info){
       		state.adminId=localStorage.adminId=info.adminId;
            state.adminName=localStorage.adminName=info.adminName;
       }
	},
	getters:{
		
	},
	actions:{
		login({commit,state,getter},{adminName,passWord,success,error}){
			axios.post("/login",{
				adminName,
				passWord
			}).then(data=>{
				if(data.ok===1){
					commit("CHANGE_ADMININFO",data);				
					success(data.msg);
				}
				else{
					error(data.msg);
				}
			})

		},
		addAdmin({commit,state,getter},{adminName,passWord,success,error}){
			axios.post("/addAdmin",{
				adminName,
				passWord
			}).then(data=>{
				if(data.ok===1){
					commit("CHANGE_ADDADMIN",data);				
					success(data.msg);
				}
				else{
					error(data.msg);
				}
			})
		}
	}
}
