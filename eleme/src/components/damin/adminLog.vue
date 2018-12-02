<template>
	<div>
		<h3>管理员日志信息</h3>
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item label="搜索框">
				<el-input v-model="formInline.user" placeholder="账号" ref="adminName" ></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="getAdminLogList(pageIndex)">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="adminLogList" style="width: 100%">
			<el-table-column prop="_id" label="id"> </el-table-column>
			<el-table-column prop="date" label="日志时间">
				<template slot-scope="scope">
					<i class="el-icon-time">
						{{scope.row.addTime | date}}
					</i>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="管理员账号">
				<template slot-scope="scope">
					{{scope.row.adminInfo[0].adminName}}
				</template>
			</el-table-column>
			<el-table-column label="类型">
				<template slot-scope="scope">
					{{adminLogEnum[scope.row.logType]}}
				</template>
			</el-table-column>
			<el-table-column label="说明" prop="detail">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row._id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="block">
			<el-pagination  @current-change="getAdminLogList" :current-page.sync="pageIndex"  layout="prev, pager, next, jumper" :page-count="pageSum">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	export default {
		name: 'damin-log',
		data() {
			return {
				adminLogList: [],
				adminLogEnum: {},
				formInline: {
					user: '',
					region: ''
				},
				pageSum:1,
				pageIndex:1
			}
		},
		methods: {
			handleDelete(index, row) {
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$ajax.get("/dellogList", {
						params: {
							id: row
						}
					}).then(data => {
						this.$message.success(data.msg);
						this.getAdminLogList(this.pageIndex);
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			getAdminLogList(pageIndex) {
				this.$ajax.get("/getAdminLogList",{
					params:{
						pageIndex
					}
				}).then(data => {
					this.adminLogList = data.adminLogList;
					this.adminLogEnum = data.adminLogEnum;
					this.pageSum=data.pageSum;	
				})
			}
		},
		mounted() {
			this.getAdminLogList(1);
		}
	}
</script>

<style scoped>
	h3 {
		text-align: center;
		margin-bottom: 20px;
	}
	
	.block {
		margin-top: 20px;
	}
</style>