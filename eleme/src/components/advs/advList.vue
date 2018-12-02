<template>
	<div>
		<el-form :inline="true" class="demo-form-inline">
			<el-form-item label="搜索">
				<el-input placeholder="广告" ref="advsName"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="getAdvsList">查询</el-button>
			</el-form-item>
			<el-form-item> 
				<el-button type="primary" @click="openAdv">添加广告</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="advsList"> 
			<el-table-column width="200" prop="advsName" label="广告名称">
			</el-table-column>
			<el-table-column label="广告图片">
				<template slot-scope="scope">
					 <div>
                        <img width="100" :src="scope.row.advsPic | imgUrl" alt="">
                    </div>
				</template>
			</el-table-column>
			<el-table-column prop="date" label="添加时间">
				<template slot-scope="scope">
					<i class="el-icon-time">
						{{scope.row.addTime | date}}
					</i>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button  size="mini" >编辑</el-button>
					<el-button size="mini" type="danger" @click="delAdvsList(scope.row._id)">删除</el-button>
                </template>
			</el-table-column>
		</el-table>
		<addAdvs v-if="dialogFormVisible" :getAdvsList="getAdvsList" :dialogFormVisible.sync="dialogFormVisible"></addAdvs>
	</div>
</template>

<script>
	import addAdvs from "./addAdvs"
	export default {
		name: "adv-list",
		data(){
			return{
				dialogFormVisible:false,
				advsList:[],
			}
		},
		methods:{
			getAdvsList(){
				this.$ajax.get("/getAdvsList",{
					params:{
						advsName:this.$refs["advsName"].$data.currentValue
					}
				}).then(data=>{
						this.advsList = data.advsList
					})
			},
			delAdvsList(row){
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$ajax.get("/delAdvsList",{
						params:{
							id:row
						}
					}).then(data=>{
						this.$message.success(data.msg);
						this.getAdvsList();
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			openAdv(){
				this.dialogFormVisible = true
			}
		},
		components:{
			addAdvs
		},
		mounted(){
			this.getAdvsList();
		}
	}
</script>

<style>

</style>