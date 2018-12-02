<template>
	<el-dialog title="添加店铺" :visible="shopVisible" @update:visible="v=>$emit('update:shopVisible',v)">
		<el-form>
			<el-form-item label="店铺名称">
				<el-input ref="shopName" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="店铺图片">
				<el-upload class="upload-demo" ref="upload" action="" :on-change="upChange" :on-exceed="exceed" :limit="1" :auto-upload="false">
					<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
				<img v-if="shopPic.length>0" width="200" :src="shopPic" />
			</el-form-item>
			<el-form-item label="店铺类别">
			<el-select v-model="shopTypeId" placeholder="请选择">
				<el-option v-for="item in shopTypeList" :key="item._id" :label="item.shopTypeName" :value="item._id">
				</el-option>
			</el-select>
			 </el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="$emit('update:shopVisible',false)">取 消</el-button>
			<el-button type="primary" @click="addShopManage">提交</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		props: ["shopVisible","typeId","getShopLists","shopId"],
		name: "add-shop-manage",
		data() {
			return {
				shopTypeId: "",
				shopTypeList: [],
				shopPic:""
			}
		},
		methods: {
			 upChange(file){
                this.$refs.upload.clearFiles();
                var reader=new FileReader();
                reader.readAsDataURL(file.raw);
                var _this=this;
                reader.onload=function(){
//              	console.log(this.result);
                    _this.shopPic=this.result;
                }
            },
			addShopManage() {
				var formdata = new FormData();
				if(this.$refs.shopName.$data.currentValue.length > 0){
					formdata.set("shopName", this.$refs.shopName.$data.currentValue);					
					formdata.set("shopPic", document.querySelector(".el-upload__input").files[0]);
					formdata.set("shopTypeId",this.shopTypeId);
				}else{
					this.$message.error("请完善添加信息");
				}		
				if(this.shopId.length>0){
					formdata.set("shopId",this.shopId);
					this.$ajax.put("/addShop",formdata)
					.then(data=>{
						if(data.ok === 1){
							this.$emit("update:shopVisible",false) ;
                     	    this.$message({
                            message: data.msg,
                            type: 'success'
                        });
                        if(this.getShopLists)
                            this.getShopLists(1);
                        else
                            this.$router.push("/shopManage");
                    }else{
                        this.$message.error(data.msg);
                    }
                    })
				}else{
					this.$ajax.post("/addShop", formdata)
					.then(data => {
						if(data.ok === 1) {
							this.$emit("update:shopVisible",false) ;  //改变传值方式
							this.$message({
								message: data.msg,
								type: 'success'
							});
							if(this.getShopLists){
								this.getShopLists(1);
							}else{
								this.$router.push("/shopManage");
							}
						} else {
							this.$message.error(data.msg);
						}
					})
				}
				
			},
			exceed() {
				console.log("123")
			},
			getShopList() {
				this.$ajax.get("/getShopList").then(data => {
					this.shopTypeList = data.shopTypeList;
				})
			},
			getShopInfo(){
				this.$ajax.get("/getShopInfoById",{
					params:{
						shopId:this.shopId
					}
				}).then(data=>{
					this.$refs.shopName.$data.currentValue=data.shopInfo.shopName;
					this.shopTypeId=data.shopInfo.shopTypeId;
                    this.shopPic="http://127.0.0.1/"+data.shopInfo.shopPic;
                    console.log(111,this.shopTypeId)
				})
			}
		},
		mounted(){
			this.getShopList();
			this.shopTypeId = this.typeId;
			console.log(111,this.shopTypeId)
			if(this.shopId.length>0){
				this.getShopInfo();
			}
		}

	}
</script>

<style>

</style>