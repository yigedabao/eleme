<template>
	<mt-swipe :auto="0">
		<mt-swipe-item v-for="item in shopTypeList">
			<div class="shop-type">
				<div v-for="info in item" @click="openShop(info._id,info.shopTypeName)">
					<img :src="info.shopTypePic | imgUrl" alt="">
					<p>{{info.shopTypeName}}</p>
				</div>
			</div>
		</mt-swipe-item>
	</mt-swipe>

</template>

<script>
	export default {
		name: "shop-type",
		data() {
			return {
				shopTypeList: [],
			}
		},
		methods: {
			getShopType() {
				this.$ajax.get("/getShopType")
					.then(data => {
						this.shopTypeList = data.shopTypeLists;
					})
			},
			openShop(id,name){
				this.$router.push({path:"/shop",query:{id:id,shopTypeName:name}});
			}
		},
		mounted() {
			this.getShopType();
		}
	}
</script>

<style scoped>
	.mint-swipe {
		height: 3.74rem;
		/*background: yellow;*/
	}
	
	.shop-type {
		display: flex;
		flex-wrap: wrap;
	}
	
	.shop-type div {
		width: 20%;
		margin-top: 0.29rem;
	}
	
	.shop-type div img {
		width: 0.9rem;
		height: 0.9rem;
		display: block;
		margin: 0 auto;
	}
	
	.shop-type div p {
		text-align: center;
		margin-top: 0.03rem;
		font-size: 0.24rem;
		color: inherit;
	}
</style>