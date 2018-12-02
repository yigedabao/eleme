<template>
	<div>
		<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="搜索" >
					<el-input placeholder="商品" ref="goodsName"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getGoodsList">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="goodsVisible=true">添加商品</el-button>
				</el-form-item>
			</el-form>
			
		<el-table :data="goodsList"> 
			<el-table-column prop="goodsName" label="商品名称">
			</el-table-column>
			<el-table-column label="商品图片">
				<template slot-scope="scope">
					 <div>
                        <img width="100" :src="scope.row.goodsPic | imgUrl" alt="">
                    </div>
				</template>
			</el-table-column>
			<el-table-column label="商品类别" prop="goods[0].goodsTypeName"></el-table-column>
			<el-table-column label="所属店铺" prop="goodsInfo[0].shopName"></el-table-column>
			<el-table-column  label="是否热销">
				<template slot-scope="scope">
					{{scope.row.isHot/1 | hot}}
				</template>
			</el-table-column>
			<el-table-column prop="goodsPrice" label="商品价格">
				<template slot-scope="scope">
					{{scope.row.goodsPrice/1 | currency}}
				</template>
			</el-table-column>
			<el-table-column prop="date" label="添加时间">
				<template slot-scope="scope">
					<i class="el-icon-time">
						{{scope.row.addTime | date}}
					</i>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<el-button  size="mini" >编辑</el-button>
					<el-button size="mini" type="danger" @click="delGoodsList(scope.row._id)">删除</el-button>
                </template>
			</el-table-column>
		</el-table>	
			
			
		<addGoods :getGoodsList="getGoodsList" :goodsVisible.sync="goodsVisible"></addGoods>
	</div>
</template>

<script>
	import addGoods from "./addGoods";
	export default{
		name:"goods-list",
		data(){
			return{
				goodsVisible:false,
				goodsList:[]
			}
		},
		methods:{
			getGoodsList(){
				this.$ajax.get("/getGoodsList",{
					params:{
						goodsName:this.$refs["goodsName"].$data.currentValue						
					}
				})
					.then(data=>{
						this.goodsList = data.goodsList;
					})
			},
			delGoodsList(row){
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$ajax.get("/delGoodsList", {
							params: {
								id: row
							}
						}).then(data => {
							this.$message.success(data.msg);
							this.getGoodsList();
						})

					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
			},
		},
		components:{
			addGoods
		},
		mounted(){
			this.getGoodsList();
		}
	}
</script>

<style>
</style>