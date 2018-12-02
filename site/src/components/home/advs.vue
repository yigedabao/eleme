<template>
	<div>
		<div class="adv">
			<div class="adv_top">
				<img v-for="item in advsStop" :src="item.advsPic | imgUrl" alt="">
			</div>
			<div class="adv_bottom">
				<mt-swipe :show-indicators="false" >
				  <mt-swipe-item v-for="info in advsRun">
				  		<img :src="info.advsPic | imgUrl" alt="">
				  </mt-swipe-item>
				</mt-swipe>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"advs",
		data(){
			return{
				advsStop:[],
				advsRun:[]
			}
		},
		methods:{
			getAdvsStop(){
				this.$ajax.get("/getAdvsStop")
				.then(data=>{
					this.advsStop = data.advsList
				})
			},
			getAdvsRun(){
				this.$ajax.get("/getAdvsRun")
				.then(data=>{
					this.advsRun = data.advsList
				})
			}
		},
		mounted(){
			this.getAdvsStop();
			this.getAdvsRun();
		}
	}
</script>

<style scoped>
	.mint-swipe {
		height: 1.77rem;
		margin-top: 0.05rem;
	}
	.mint-swipe img{
		width: 100%;
	}
	
	.adv{
		padding: 0.12rem;
		margin-bottom: 0.21rem;
	}
	.adv .adv_top{
		display: flex;
		flex-direction: row-reverse;
		justify-content: space-between;
	}
	.adv .adv_top img{
		width: 3.6rem;
		height: 2.8rem;
		display: block;
	}
</style>