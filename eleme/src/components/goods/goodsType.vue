<template>
	<div>
		<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="搜索">
					<el-input placeholder="商品类别" ref="goodsTypeName"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getGoodsTypeList()">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="dialogFormVisible=true">添加商品类别</el-button>
				</el-form-item>
			</el-form>
		<el-table :data="goodsTypeList" style="width: 100%">
			<el-table-column width="200" prop="name" label="商品类别">
				<template slot-scope="scope">
					{{scope.row.goodsTypeName}}
				</template>
			</el-table-column>
			<el-table-column label="商品类别图片">
				<template slot-scope="scope">
					 <div>
                        <img width="100" :src="scope.row.goodsTypePic | imgUrl" alt="">
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
			</el-table-column>
			<el-table-column label="操作" >
				<template slot-scope="scope">
					<el-button  size="mini">编辑</el-button>
					<el-button size="mini" type="danger" @click="delGoodsTypeList(scope.row._id)">删除</el-button>
                    <el-button  size="mini" type="primary">添加商品</el-button>
				</template>
			</el-table-column>
		</el-table>
		<addGoodsType :getGoodsTypeList="getGoodsTypeList" :dialogFormVisible.sync="dialogFormVisible"></addGoodsType>
	</div>
</template>

<script>
	import addGoodsType from "./addGoodsType";
	export default {
		name: "goods-type",
		data(){
			return{
				dialogFormVisible:false,
				goodsTypeList:[]
			}
		},
		methods:{
			getGoodsTypeList(){
				this.$ajax.get("/getGoodsTypeList",{
					params:{
						goodsTypeName:this.$refs["goodsTypeName"].$data.currentValue						
					}
				})
					.then(data=>{
						this.goodsTypeList = data.goodsTypeList;
					})
			},
			delGoodsTypeList(row){
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$ajax.get("/delGoodsTypeList", {
						params: {
							id: row
						}
					}).then(data => {
						this.$message.success(data.msg);
						this.getGoodsTypeList();
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}
		},
		components:{
			addGoodsType
		},
		mounted(){
			this.getGoodsTypeList();
		}
		
	}
</script>

<style></style>