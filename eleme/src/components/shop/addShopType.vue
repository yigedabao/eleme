<template>
	<el-dialog title="添加店铺类别" :visible="dialogFormVisible" @update:visible="v=>$emit('update:dialogFormVisible',v)">
		<el-form>
			<el-form-item label="类别名称">
				<el-input ref="shopTypeName" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="类别的图片">
				<el-upload class="upload-demo" ref="upload" action="" :on-exceed="exceed" :limit="1"  :auto-upload="false">
					<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</el-form-item>

		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="$emit('update:dialogFormVisible',false)">取 消</el-button>
			<el-button type="primary" @click="addShopType">提交</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		props: ["dialogFormVisible", "getShopTypeList","typeId"],
		name: "add-shop-type",
		data() {
			return {
				// dialogFormVisible:false
			}
		},
		methods: {
			addShopType() {
//				this.$refs.upload.clearFiles();   //清除组件
				var formdata = new FormData();
				if(this.$refs.shopTypeName.$data.currentValue.length > 0){
					formdata.set("shopTypeName", this.$refs.shopTypeName.$data.currentValue);
					formdata.set("shopTypePic", document.querySelector(".el-upload__input").files[0]);					
				}else{
					this.$message.error("请完善添加信息");
				}	
				this.$ajax.post("/addShopType", formdata)
					.then(data => {
//						this.dialogFormVisible = false;
						if(data.ok === 1) {
							this.getShopTypeList();
							this.$emit("update:dialogFormVisible",false) ;  //改变传值方式
							this.$message({
								message: data.msg,
								type: 'success'
							});
						} else {
							this.$message.error(data.msg);
						}
				})
			},
			exceed() {
				this.$message.error("您已经上传了图片"); //已经选择文件以后不能多次选择
			}
		}	
	}
</script>

<style >

</style>