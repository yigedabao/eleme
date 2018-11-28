<template>
	<el-dialog title="添加商品类别" :visible="dialogFormVisible" @update:visible="v=>$emit('update:dialogFormVisible',v)">
		<el-form>
			<el-form-item label="商品类别名称">
				<el-input ref="goodsTypeName" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="店铺名称">
			<el-select v-model="shopsId"  placeholder="请选择">
				<el-option v-for="item in shopList" :key="item._id" :label="item.shopName" :value="item._id">
				</el-option>
			</el-select>
			 </el-form-item>
		</el-form>
		
		<div slot="footer" class="dialog-footer">
			<el-button @click="$emit('update:dialogFormVisible',false)">取 消</el-button>
			<el-button type="primary" @click="addGoodsType">提交</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default{
		props:["dialogFormVisible","getGoodsTypeList","shopId"],
		name:"add-goods-type",
		data(){
			return{
				shopsId:"",
				shopList:[]
			}
		},
		methods:{
			addGoodsType(){
				this.$ajax.post("/addGoodsType",{
					goodsTypeName:this.$refs.goodsTypeName.$data.currentValue,
					shopId:this.shopsId
				})
					.then(data => {
						this.$emit("update:dialogFormVisible",false);
						if(data.ok === 1) {
							this.$message({
								message: data.msg,
								type: 'success'
							});
							if(this.getGoodsTypeList){
								this.getGoodsTypeList();
							}else{
								this.$router.push("/goodsType");
							}
						} else {
							this.$message.error(data.msg);
						}
				})
			},
			exceed(){
				this.$message.error("您已经上传了图片");
			},
			getShopListGood() {
				this.$ajax.get("/getShopListGood").then(data => {
					this.shopList = data.shopList;
				})
			},
		},
		mounted(){
			this.getShopListGood();
			this.shopsId = this.shopId
		}
		
	}
	
</script>

<style>
</style>