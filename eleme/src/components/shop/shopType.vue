<template>
	<div>
		<div class="toolbar">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="搜索">
					<el-input placeholder="类别" ref="shopTypeName"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getShopTypeList(pageIndex)">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="dialogFormVisible=true">添加店铺类别</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="shopTypeList" style="width: 100%">
				<!--<el-table-column prop="_id" label="id">
				
				</el-table-column>-->
			<el-table-column width="200" prop="name" label="店铺类别">
				<template slot-scope="scope">
					{{scope.row.shopTypeName}}
				</template>
			</el-table-column>
			<el-table-column label="店铺类别图片">
				<template slot-scope="scope">
					 <div>
                        <img width="100" :src="scope.row.shopTypePic | imgUrl" alt="">
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
					<el-button  size="mini" @click="openType(scope.row._id)">编辑</el-button>
                    <el-button  size="mini" type="primary" @click="openShop(scope.row._id)">添加店铺</el-button>
                    <el-button size="mini" type="danger" @click="delShopTypeList(scope.$index,scope.row._id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		</div>
		<!--<el-dialog title="添加店铺类别" :visible.sync="dialogFormVisible">
			<el-form>
				<el-form-item label="类别名称">
					<el-input ref="shopTypeName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="类别的图片">
					<el-upload class="upload-demo" ref="upload" action="" :limit="1" :auto-upload="false">
						<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addShopType">提交</el-button>
			</div>
		</el-dialog>-->
		<div class="block">
			<el-pagination  @current-change="getShopTypeList" :current-page.sync="pageIndex"  layout="prev, pager, next, jumper" :page-count="pageSum">
			</el-pagination>
		</div>
		<addShopType v-if="dialogFormVisible" :typeId="typeId" :getShopTypeList="getShopTypeList" :dialogFormVisible.sync="dialogFormVisible"></addShopType>
		<addShopManage v-if="shopVisible" :shopId="''" :typeId="typeId" :shopVisible.sync="shopVisible"></addShopManage>
	</div>
</template>
<script>
	import addShopType from "./addShopType";
	import addShopManage from "./addShopManage";
	export default {
		name: "shop-type",
		 data(){
            return {
            	typeId:"",
                dialogFormVisible:false,
                shopVisible:false,
                shopTypeList:[],
                pageSum:1,
                pageIndex:1,
            }
        },
		methods: {
			fn(v){
                dialogFormVisible=v;
            },
            openType(id){
            	this.dialogFormVisible=true;
            	this.typeId="id";
            },
 
//			addShopType(){
//				var formdata = new FormData();
//				formdata.set("shopTypeName", this.$refs.shopTypeName.$data.currentValue);
//				formdata.set("shopTypePic", document.querySelector(".el-upload__input").files[0]);
//				this.$ajax.post("/addShopType", formdata)
//					.then(data => {
//						this.dialogFormVisible = false;
//						this.getShopTypeList();
//						if(data.ok === 1) {
//							this.$message({
//								message: data.msg,
//								type: 'success'
//							});
//						} else {
//							this.$message.error(data.msg);
//						}
//				})
//			},
			getShopTypeList(pageIndex){
				this.$ajax.get("/getShopTypeList",{
					params:{
						pageIndex,
						shopTypeName:this.$refs["shopTypeName"].$data.currentValue
					}
				}).then(data=>{
					this.shopTypeList = data.shopTypeList;
					this.pageSum=data.pageSum;	
					this.pageIndex = data.pageIndex;
//					console.log(11,data.pageSum);
				})
			},
			delShopTypeList(index,row){
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$ajax.get("/delShopTypeList", {
						params: {
							id: row
						}
					}).then(data => {
						this.$message.success(data.msg);
						this.getShopTypeList(this.pageIndex);
//						console.log(this.pageIndex);
//						console.log(this.pageSum);
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			openShop(id){
				this.typeId = id;
				this.shopVisible=true
			},
		
		},
		components:{
            addShopType,
            addShopManage
        },
		mounted(){
			this.getShopTypeList(this.pageIndex)
		}
	}
</script>

<style scoped>
	.block{
		margin-top: 20px;
	}
</style>