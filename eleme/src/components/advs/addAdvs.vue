<template>
		<el-dialog title="添加广告" :visible="dialogFormVisible" @update:visible="v=>$emit('update:dialogFormVisible',v)">
		<el-form>
			<el-form-item label="广告名称">
				<el-input ref="advsName" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="广告图片">
				<el-upload class="upload-demo" ref="upload" action="" :on-exceed="exceed" :limit="1"  :auto-upload="false">
					<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</el-form-item>
		</el-form>
		
		<div slot="footer" class="dialog-footer">
			<el-button @click="$emit('update:dialogFormVisible',false)">取 消</el-button>
			<el-button type="primary" @click="getAdvs">提交</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default{
		props:["dialogFormVisible","getAdvsList"],
		name:"add-advs",
		data(){
			return{
				
			}
		},
		methods:{
			getAdvs(){
				var formdata = new FormData();
				formdata.set("advsName",this.$refs.advsName.$data.currentValue);
				formdata.set("advsPic",document.querySelector(".el-upload__input").files[0]);
				this.$ajax.post("/addAdvs",formdata)
					.then(data=>{
						if(data.ok === 1) {
							this.$emit("update:dialogFormVisible",false) ;  
							this.getAdvsList();
							this.$message({
								message: data.msg,
								type: 'success'
							});
						} else {
							this.$message.error(data.msg);
						}
					})
			},
			exceed(){
				console.log("123");
			}
		}
	}
</script>

<style>
</style>