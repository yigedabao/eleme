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
			<el-table-column width="200" prop="goodsTypeName" label="商品类别名称">
			</el-table-column>
			<el-table-column label="所属店铺" prop="goodsInfo[0].shopName"></el-table-column>
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
                    <el-button  size="mini" type="primary" @click="openGoods(scope.row._id)">添加商品</el-button>
                    <el-button size="mini" type="danger" @click="delGoodsTypeList(scope.row._id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<addGoodsType v-if="dialogFormVisible" :getGoodsTypeList="getGoodsTypeList" :dialogFormVisible.sync="dialogFormVisible"></addGoodsType>
		<addGoods v-if="goodsVisible" :goodsId="goodsId" :goodsVisible.sync="goodsVisible"></addGoods>
	</div>
</template>

<script>
	import addGoodsType from "./addGoodsType";
	import addGoods from "./addGoods"
	export default {
		name: "goods-type",
		data(){
			return{
				dialogFormVisible:false,
				goodsVisible:false,
				goodsTypeList:[],
				goodsId:""
			}
		},
		methods:{
			openGoods(id){
				this.goodsId = id;
				this.goodsVisible = true
			},
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
			addGoodsType,
			addGoods
		},
		mounted(){
			this.getGoodsTypeList();
		}
		
	}
</script>

<style></style>