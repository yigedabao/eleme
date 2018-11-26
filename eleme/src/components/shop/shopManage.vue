<template>
	<div>
		<div class="toolbar">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="搜索">
					<el-input placeholder="店铺" ref="shopName"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getShopLists(pageIndex)">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="openShopVisible('')">添加店铺</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-table :data="shopList"> 
			<el-table-column width="200" prop="shopName" label="店铺名称">
			</el-table-column>
			<el-table-column label="所属类别" prop="typeInfo[0].shopTypeName"></el-table-column>
			<el-table-column label="店铺图片">
				<template slot-scope="scope">
					 <div>
                        <img width="100" :src="scope.row.shopPic | imgUrl" alt="">
                    </div>
				</template>
			</el-table-column>
	
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button  size="mini" @click="openShopVisible(scope.row._id)">编辑</el-button>
					<el-button size="mini" type="danger" @click="delShopLists(scope.row._id)">删除</el-button>
                </template>
			</el-table-column>
		</el-table>
		
		<addShopManage v-if="shopVisible" :shopId="shopId" :getShopLists="getShopLists" :shopVisible.sync="shopVisible"></addShopManage>
		<div class="block">
			<el-pagination  @current-change="getShopLists" :current-page.sync="pageIndex"  layout="prev, pager, next, jumper" :page-count="pageSum">
			</el-pagination>
		</div>	
	</div>
</template>

<script>
	import addShopManage from "./addShopManage";
	export default{
		name:"shop-manage",
		data(){
			return{
				shopVisible:false,
				shopList:[],
				pageIndex:1,
				pageSum:1,
				shopId:""
			}
		},
		methods:{
			openShopVisible(id){
				this.shopVisible=true;
				this.shopId=id;
			},
			delShopLists(row){
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$ajax.get("/delShopLists",{
						params:{
							id:row
						}
					}).then(data=>{
						this.$message.success(data.msg);
						this.getShopLists(this.pageIndex);
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			getShopLists(pageIndex){
				this.$ajax.get("/getShopLists",{
					params:{
						pageIndex,
						shopName:this.$refs["shopName"].$data.currentValue
					}
				}).then(data=>{
					this.shopList = data.shopList;
					this.pageSum = data.pageSum;
				})
			},
		},
		components:{
			addShopManage
		},
		 mounted(){
            this.getShopLists(this.pageIndex);
        }
	}
</script>

<style>
</style>