<template>
	<el-dialog title="添加商品" :visible="goodsVisible" @update:visible="v=>$emit('update:goodsVisible',v)">
		<el-form>
			<el-form-item label="商品名称">
				<el-input ref="goodsName" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="商品价格">
				<el-input ref="goodsPrice" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="商品图片">
				<el-upload class="upload-demo" ref="upload" action="" :on-change="upChange" :on-exceed="exceed" :limit="1" :auto-upload="false">
					<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
				<img v-if="goodsPic.length>0" width="200" :src="goodsPic" />
			</el-form-item>
			<el-form-item label="店铺名称">
			<el-select v-model="shopsId"  placeholder="请选择">
				<el-option v-for="item in shopList" :key="item._id" :label="item.shopName" :value="item._id">
				</el-option>
			</el-select>
			 </el-form-item>
			<el-form-item label="商品类别">
			<el-select v-model="goodsTypeId"  placeholder="请选择">
				<el-option v-for="item in goodsTypeList" :key="item._id" :label="item.goodsTypeName" :value="item._id">
				</el-option>
			</el-select>
			 </el-form-item>
			<el-form-item label="是否热销">
			  <el-radio v-model="isHot" label="1">是</el-radio>
			  <el-radio v-model="isHot" label="2">否</el-radio>
			</el-form-item>
		</el-form>
		
		<div slot="footer" class="dialog-footer">
			<el-button @click="$emit('update:goodsVisible',false)">取 消</el-button>
			<el-button type="primary" @click="addGoods">提交</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default{
		props:["goodsVisible","goodsId","shopId","getGoodsList"],
		name:"add-goods",
		data(){
			return{
				goodsTypeId:"",
				shopsId:"",
				goodsTypeList:[],
				shopList:[],
				goodsPic:"",
				isHot:"1"
			}
		},
		methods:{
			upChange(file){
                this.$refs.upload.clearFiles();
                var reader=new FileReader();
                reader.readAsDataURL(file.raw);
                var _this=this;
                reader.onload=function(){
                    _this.goodsPic=this.result;
                }
            },
            addGoods(){
            	var formdata = new FormData();
            	formdata.set("goodsName",this.$refs.goodsName.$data.currentValue);
            	formdata.set("goodsPrice",this.$refs.goodsPrice.$data.currentValue);
            	formdata.set("goodsPic", document.querySelector(".el-upload__input").files[0]);
            	formdata.set("shopId",this.shopsId);
            	formdata.set("goodsTypeId",this.goodsTypeId);
            	formdata.set("isHot",this.isHot);
            	this.$ajax.post("/addGoods",formdata)
            	.then(data=>{
            		if(data.ok === 1) {
							this.$emit("update:goodsVisible",false) ;  //改变传值方式
							this.$message({
								message: data.msg,
								type: 'success'
							});
							if(this.getGoodsList){
								this.getGoodsList()
							}else{
								this.$router.push("/goodsList");
							}
						} else {
							this.$message.error(data.msg);
						}
            	})
            },
			getGoodsTypeLists(){
				this.$ajax.get("/getGoodsTypeLists")
					.then(data=>{
						this.goodsTypeList = data.goodsTypeList;
						console.log(data.goodsTypeList)
					})
			},
			getShopListGood() {
				this.$ajax.get("/getShopListGood").then(data => {
					this.shopList = data.shopList;
				})
			},
			exceed(){
				console.log("123");
			}
		},
		mounted(){
			this.getGoodsTypeLists();
			this.getShopListGood();
			this.goodsTypeId = this.goodsId;
			this.shopsId = this.shopId;
		}
	}
</script>

<style>
</style>