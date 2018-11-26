<template>
	<el-dialog title="修改密码" :visible="dialogFormVisible" @update:visible="v=>$emit('update:dialogFormVisible',v)">
		<el-form :model="loginForm" ref="loginForm" :rules="rules">
			<h3>当前用户:{{$store.state.admin.adminName}}</h3>
			<el-form-item prop="passWord" label="请输入原密码">
				<el-input autocomplete="off" type="password" v-model="loginForm.passWord" placeholder="请输入原密码"></el-input>
			</el-form-item>
			<el-form-item prop="newpassWord" label="请输入新密码">
				<el-input autocomplete="off" type="password" v-model="loginForm.newpassWord" placeholder="请输入新密码"></el-input>
			</el-form-item>
			<el-form-item prop="repassWord" label="确认新密码">
				<el-input autocomplete="off" type="password" v-model="loginForm.repassWord" placeholder="确认新密码"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="$emit('update:dialogFormVisible',false)">取消修改</el-button>
				<el-button type="primary" @click="submitForm('loginForm')">确认修改</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script>
	export default {
		name: "change-password",
		props: ["dialogFormVisible"],
		data() {
			var validatePass2 = (rule, value, callback) => {
				if(value.length < 6 || value.length > 16) {
					callback(new Error('请输入6-16位密码'));
				} else {
					callback();
				}
			};
			var validatePass3 = (rule, value, callback) => {
				if(value!==this.loginForm.newpassWord) {
					callback(new Error('与新密码不一致'));
				} else {
					callback();
				}
			};
			return {
				adminId: localStorage.adminId,
				rules: {
					passWord: [{
						required: true,
						message: '请输入原密码',
						trigger: 'blur'
					}],
					newpassWord: [{
							required: true,
							message: '请输入新密码',
							trigger: 'blur'
						},
						{
							validator: validatePass2,
							trigger: 'blur'
						}
					],
					repassWord: [{
							required: true,
							message: '请确认新密码',
							trigger: 'blur'
						},
						{
							validator: validatePass3,
							trigger: 'blur'
						}
					]
				},
				loginForm: {
					passWord: "",
					newpassWord: "",
					repassWord: ""
				}
			}
		},
		methods: {
			submitForm(formName) {
				console.log(this.adminId);
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$ajax.post("/changepassword", {
							id: this.adminId,
							passWord: this.loginForm.passWord,
							newpassWord: this.loginForm.newpassWord,
						}).then(data => {
							if(data.ok === 1) {
								this.$emit("update:dialogFormVisible", false);
								this.$store.commit('OUT_LOGIN');
								this.$message.success(data.msg);
								
							} else {
								this.$message.error(data.msg);
							}
						})

					} else {
						this.$message.error("与新密码不一致");
						return false;
					}
				});
			},

		},
	}
</script>

<style>

</style>