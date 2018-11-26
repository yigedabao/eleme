<template>
	<div>
		<h3>管理员信息</h3>
		<el-button @click="dialogFormVisible = true" plain>添加管理员</el-button>

		<el-dialog title="新增管理员" :visible.sync="dialogFormVisible">
			<el-form :model="form" ref="form" :rules="rules">
				<el-form-item prop="adminName" label="管理员账户" :label-width="formLabelWidth">
					<el-input ref="adminName" v-model="form.adminName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item prop="passWord" label="管理员密码" :label-width="formLabelWidth">
					<el-input ref="passWord" v-model="form.passWord" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="setAdminList('form')">确 定</el-button>
			</div>
		</el-dialog>
		<el-table :data="adminList" style="width: 100%">
			<el-table-column prop="_id" label="id">

			</el-table-column>
			<el-table-column label="管理员账号">
				<template slot-scope="scope">
					{{scope.row.adminName}}
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row._id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		name: 'addAdmin',
		data() {
			var validatePass2 = (rule, value, callback) => {
				if(value.length < 6 || value.length > 16) {
					callback(new Error('请输入6-16位密码'));
				} else {
					callback();
				}
			};
			return {
				adminList: [],
				dialogFormVisible: false,
				rules: {
					adminName: [{
						required: true,
						message: '请输入管理员账号',
						trigger: 'blur'
					}],
					passWord: [{
							required: true,
							message: '请输入您的密码',
							trigger: 'blur'
						},
						{
							validator: validatePass2,
							trigger: 'blur'
						}
					]
				},
				form: {
					adminName: "",
					passWord: "",
				},
				formLabelWidth: '120px'
			}
		},
		methods: {
			setAdminList(form) {
//				console.log(this.$refs[form])
				this.$refs[form].validate((valid) => {
					if(valid) {
						var that = this;
						this.$store.dispatch("addAdmin",{
							adminName: this.form.adminName,
							passWord: this.form.passWord,
							success(msg) {
								that.$message({
									message: msg,
									type: 'success'
								});
							},
							error(msg) {
								that.$message.error(msg);
							}
						});
					}

				});
			},
			handleDelete(index, row) {
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$ajax.get("/delAdminList", {
						params: {
							id: row
						}
					}).then(data => {
						this.$message.success(data.msg);
						this.seeAdminList();
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			seeAdminList() {
				this.$ajax.get("/seeAdminList").then(data => {
					this.adminList = data.adminList;
				})
			}
		},
		mounted() {
			this.seeAdminList();
		}
	}
</script>

<style scoped>
	.el-input {
		width: 400px;
	}
	
	h3 {
		text-align: center;
		margin-bottom: 20px;
	}
</style>