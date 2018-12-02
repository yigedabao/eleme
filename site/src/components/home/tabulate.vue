<template>
	<div>
		<div class="recommend">— 推荐商家 —</div>
		<div class="nav">
			<ul>
				<li>综合排序</li>
				<li>距离最近</li>
				<li>品质联盟</li>
				<li>筛选</li>
			</ul>
		</div>
		<div class="lists">
			<ul
		  v-infinite-scroll="loadMore"
		  infinite-scroll-disabled="loading"
		  infinite-scroll-distance="10">
		  <div class="shop-list" v-for="item in shopList">
		  		<div class="shop-info">
		  			<a>
		  				<img class="shop-pic" :src="item.shopPic | imgUrl" />
		  				<div class="shop-r">
		  					<h4>{{item.shopName}}</h4>
		  					<div class="rate">
		  						<p>4.9 月售2282单</p>
		  						<p>蜂鸟专送</p>
		  					</div>
		  					<div class="pei">
		  						<p>￥0起送 | 配送费￥8</p>
		  						<p>1.3km | 3.9min</p>
		  					</div>
		  				</div>
		  			</a>
		  			
		  		</div>
		  		<div  class="shop-activity">
		  			<p>奶茶果汁 | <span>口碑人气好店</span></p>
		  			<p>该商户食品安全已由国泰产险承担，食品安全有保障</p>
		  		</div>
		  </div>
		</ul>
		<div v-if="isLoading"><mt-spinner  type="triple-bounce"></mt-spinner></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "tabulate",
		data(){
			return{
				shopList:[],
				pageIndex:0,
				pageSum:1,
				isLoading:false,
				loading:false,
			}
		},
		methods:{
			loadMore(){
				this.isLoading=true
				this.$ajax.get("/homegetShopList",{
					params:{
						pageIndex:++this.pageIndex
					}
				})
				.then(data=>{
					this.shopList=this.shopList.concat(data.shopList);
					this.isLoading=false;
					this.pageSum=data.pageSum;					
					if(this.pageIndex==5){
					this.loading=true
				}	
				})
				
				
			}
		},
		mounted() {
		}
	}
</script>

<style scoped>
	.recommend {
		height: 0.72rem;
		text-align: center;
		font-size: 0.28rem;
	}
	
	.nav {
		height: 0.79rem;
		line-height: 0.79rem;
		border-bottom: 1px solid #EAEAEA;
	}
	
	.nav ul {
		display: flex;
	}
	
	.nav ul li {
		width: 25%;
		text-align: center;
		font-size: 0.28rem;
	}
	.list ul .every_list{
		padding: 0.4rem 0;
	}
	.shop-list{
		height:2.88rem;
		padding: 4vw 0;
		border-bottom: 1px solid #eee;
	}
	.shop-info{
		height: 1.3rem;
		padding: 0 3vw;
		margin-bottom: 4vw;
	}
	.shop-r{
		padding-left: 0.2rem;
		float: left;
		width: 5rem;
	}
	.rate{
		float: left;
		width: 5.5rem;
	}
	.shop-r p{
		font-size: 0.12rem;	
		font-weight: 100;
		color: #999;
		margin: 0.05rem 0;
		line-height: 0.35rem;
	}
	.shop-r p:nth-of-type(1){
		float: left;
	}
	.shop-r p:nth-of-type(2){
		float: right;
		color: #fff;
		background: #0097ff;
	}
	.pei{
		float: left;
		width: 5.5rem;
	}
	.pei p:nth-of-type(1){
		float: left;
	}
	.pei p:nth-of-type(2){
		float: right;
		color: #999;
		background: none;
		
	}
	.shop-info a{
		display: block;
		color: #333;
		font-weight: 900;
	}
	.shop-info  a h4{
			font-size: 0.3rem;				
	}
	.shop-activity{
		height: 1.01rem;
		padding-left: 25vw;
	}
	.shop-activity span{
		color: #e8470b;
	}
	.shop-activity p:nth-of-type(1){
		padding-bottom: 0.2rem;
	}
	.shop-activity p{
		color: rgb(102, 102, 102);
		font-size: 0.09rem;	
		font-weight: 100;
		line-height: 0.4rem;
	} 
	.shop-pic{
		width: 1.3rem;
		height: 1.3rem;
		float: left;
	}
</style>