<template>
	<div>
		<mt-header >
			<router-link to="" slot="left">
				<mt-button icon="back"  @click="$router.back(-1)"></mt-button>
			</router-link>
		</mt-header>
			<div class="logo_img_wrap">		
				<img class="logo_img" :src="goodsList[0].goodsInfo[0].shopPic | imgUrl" />
			</div>
			<div class="det_main">
				<h3>{{shopName}}</h3>
				<p><span>评价4.8</span><span>月售2873单</span><span>蜂鸟专送约29分钟</span></p>
				<div class="prefer">
					<span>¥8</span>
					<span>无门槛</span>
					<span>领取</span>
				</div>
				<div class="intord">
					<span class="one">
						首单
					</span>
					<span>新用户下单立减17元(不与其他活动同享)</span>
					<span>14个优惠</span>
				</div>
				<div class="announ">
					公告：❤工作再忙也要好好吃饭，西贝祝您用餐愉快❤
				</div>
			</div>
			<div class="det_nav">
				<ul>
					<li>点餐</li>
					<li>评价</li>
					<li>商家</li>
				</ul>
			</div>
			<div class="det_adv">
				<img src="../../assets/guanggao.jpg"  />
			</div>
			
			
			<div class="det_links">
				
			</div>
			
			
			
			<div class="det_footer">
				<div class="det_car">&#xe63a;</div>
				<p>未选购商品<br/>另需配送费3元</p>
				<span>¥20起送</span>
			</div>
	</div>
</template>

<script>
	export default {
		name: "datails",
		data(){
			return{
				goodsList:[],
				shopName:"",
			}
		},
		methods: {
			getGoodsByshopId() {
				this.$ajax.get("/getGoodsByshopId",{
					params:{
						id:this.$route.query.id
					}
				}).then(data=>{
					this.goodsList = data.goodsList;
					console.log(data.goodsList)
				})
			},
		},
		mounted() {
			this.getGoodsByshopId();
			this.shopName = this.$route.query.shopName;
			
		}
	}
</script>

<style scoped>
	.mint-header{
		height: 2rem;
	}
	.logo_img_wrap{
		padding-bottom: 0.3rem;
	}
	.logo_img{
		width: 1.5rem;
		height: 1.5rem;
		margin: -1.2rem auto 0;
		position: relative;
		z-index: 99;
	}
	.det_main{
		height: 2.8rem;
		text-align: center;
	}
	.det_main h3{
		width: 100%;
		font-size: 0.5rem;
	}
	.det_main p{
		margin-top: 0.1rem 0;
	}
	.det_main p span{
		font-size: 0.08rem;
		display: inline-block;
		margin: 0 0.1rem ;
		color: #666;
	}
	.det_main .prefer{
		width:2.88rem ;
		height: 0.48rem;
		line-height: 0.48rem;
		color: #594519;
    	background: #ffe578;
    	margin: 0.12rem auto;
    	font-size: 0.09rem;
	}
	.det_main .prefer span{
		margin: 0 0.1rem;
	}
	.det_main .intord span{
		font-size: 0.08rem;
	}
	.det_main .intord .one{
		display: inline-block;
		padding: 0 0.03rem;
		color: white;
		background: greenyellow;
	}
	.det_main .announ{
		font-size: 0.08rem;
		color: #666;
		margin-top: 0.1rem;
	}
    .det_nav{
		height: 0.8rem ;
		border-bottom: 1px solid #E7E1CD;
	}
	.det_nav ul{
		display: flex;
	}
	.det_nav ul li{
		flex: 1;
		text-align: center;
		line-height: 0.8rem;
	}
	.det_adv{
		height: 1.76rem;
		padding: 0.18rem 0.32rem 0;
	}
	.det_adv img{
		width: 100%;
		display: block;
	}
	
	.det_links{
		height: 200px;
		background: yellow;
	}
	
	
	
	
	
	
	
	
	.det_footer{
		position: relative;
		height: 1.08rem;
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: rgba(61,61,63,.9);
	}
	.det_footer .det_car{
		width: 0.95rem;
		height: 0.95rem;
		background: #363636;
		border: 0.13rem solid #444444;
		border-radius:50% ;
		position: absolute;
		top: -0.3rem;
		left: 0.35rem;
		font-family: 'iconfont';
		text-align: center;
		line-height: 0.95rem;
		font-size: 0.55rem;
		color: #5e5e63;
	}
	.det_footer p{
		font-size: 0.08rem;
		color:#999;
		margin:0.25rem 0 0 1.74rem;
	}
	.det_footer span{
		color: white;
		font-size: 0.34rem;
		line-height:1.08rem;
		position: absolute;
		top: 0;
		right: 0.4rem;
	}
</style>