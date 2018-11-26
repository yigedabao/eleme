<template>
	<el-form :model="loginForm" ref="loginForm" class="login-container" :rules="rules" >
		<h3>饿了么后台管理系统</h3>
		<el-form-item prop="adminName">
			<el-input ref="adminName" type="text" v-model="loginForm.adminName" placeholder="请输入账号"></el-input>
		</el-form-item>
		<el-form-item prop="passWord">
			<el-input ref="passWord" type="password" v-model="loginForm.passWord" placeholder="请输入密码"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button style="width:100%" :loading="isLoading" type="primary" @click="submitForm('loginForm')">登录</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	import axios from 'axios';
	export default{
		name:"login",
		data(){
			var validatePass2 = (rule, value, callback) => {
		        if (value.length<6 || value.length>16){
		          callback(new Error('请输入6-16位密码'));
		        } else {
		          callback();
		        }
		    };
			return{
				isLoading:false,
				rules:{
					adminName:[
						{ required: true, message: '请输入管理员账号', trigger: 'blur' }
					],
					passWord:[
						{ required: true, message: '请输入您的密码', trigger: 'blur' },
//						{ min: 6,max:16, message: '请输入6-16位密码', trigger: 'blur' },
                        { validator: validatePass2, trigger: 'blur' }
					]
				},
				loginForm:{
					adminName:"",
					passWord:""
				},
			}
		},
		methods:{
			 submitForm(formName) {
			 	console.log(this.$refs.adminName.value);
		        this.$refs[formName].validate((valid) => {
//		        	console.log(112121)
		        	if(valid){
		        		this.isLoading=true;
		        		var that = this;
		        		this.$store.dispatch("login",{
		        			adminName:this.loginForm.adminName,
				        	passWord:this.loginForm.passWord,
				        	success(msg){
							        that.$message({
							         	message:msg,
							          	type:'success'
							        });
							        that.isLoading=false;
				        		},
				        	error(msg){
				        		that.$message.error(msg);
				        		that.isLoading=false;
				        	}
		        		});
		        	}
			       
		        });
		    },
		}
	}
</script>

<style scoped>
		.login-container{
        width:350px;
        margin:150px auto;
        border:2px solid #eaeaea;
        padding:35px 35px 15px 25px;
        box-shadow:0 0 10px blue;
    }
    .login-container h3{
        text-align:center;
    }
</style>