<template>
	<div>
		<mt-header>
			<router-link to="" slot="left">
				<mt-button icon="back" @click="$router.back(-1)"></mt-button>
			</router-link>
		</mt-header>
		<div class="logo_img_wrap">
			<img class="logo_img" :src="shopPic | imgUrl" />
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
			<img src="../../assets/guanggao.jpg" />
		</div>
		<!--*************************************************************************-->

		<div class="swiper-container">
			<ul class="swiper-container-ul">
				<li class="swiper-container-ul-li actives">点餐</li>
				<li class="swiper-container-ul-li">商家</li>
			</ul>
			<div class="swiper-wrapper">
				<div class="swiper-slide">
					<div class="content">
						<div class="left" id="left">
							<ul>
								<li v-for="item in goodsTypeList">{{item.goodsTypeName}}
								</li>
							</ul>
						</div>
						<div class="right" id="right">
							<ul>
								<li v-for="item in goodsTypeList">
									<div class="class-title">
										{{item.goodsTypeName}}</div>
									<div class="item_wrap" v-for="ite in item.goodsInfo">
										<div class="item">
											<div class="item-left">
												<div class="item-img">
													<img :src="ite.goodsPic | imgUrl" />
												</div>
											</div>
											<div class="item-right">
												<div class="title">{{ite.goodsName}}</div>
												<div class="subtitle">月售1000份，好评率100%</div>
												<div class="price">{{ite.goodsPrice/1 | currency}}</div>
											</div>
										</div>
										<div class="add" @click="addCar(ite._id,ite.goodsPrice/1)">+</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="swiper-slide" style="display:none;">
					店铺介绍
				</div>
			</div>
		</div>

		<!--********************************************************************************-->
		<mt-actionsheet :actions="carList" v-model="sheetVisible" cancelText="">
		</mt-actionsheet>
		<div class="det_footer">
			<div class="det_car" @click="sheetVisible=true">&#xe63a;</div>
			<div class="shop_num">{{num}}</div>
			<p>未选购商品<br/>另需配送费3元</p>
			<span>¥20起送</span>
		</div>
	</div>
</template>

<script>
	$('.content').css('height', $('.right').height());
	$('.left ul li').eq(0).addClass('active');
	$(window).scroll(function() {
		if($(window).scrollTop() >= 400) {
			$('.swiper-container-ul').css('position', 'fixed');
			$('.left').css('position', 'fixed');
			$('.right').css('margin-left', $('.left').width());
		} else {
			$('.swiper-container-ul').css('position', '');
			$('.left').css('position', '');
			$('.right').css('margin-left', '');
		};
		//滚动到标杆位置,左侧导航加active
		$('.right ul li').each(function() {
			var target = parseInt($(this).offset().top - $(window).scrollTop() - 150);
			var i = $(this).index();
			if(target <= 0) {
				$('.left ul li').removeClass('active');
				$('.left ul li').eq(i).addClass('active');
			}
		});
	});

	export default {
		name: "datails",
		data() {
			return {
				goodsTypeList: [],
				shopName: "",
				shopPic: "",
				num: 0,
				goodsList: [],
				sheetVisible: false,
				carList: []
			}
		},
		//		 goodsSum(){
		//              var sum=0;
		//              this.carList.forEach((v)=>{
		//                  sum+=v.buyNum*v.money
		//              })
		//              return sum;
		//         },
		methods: {

			getGoodsByshopId() {
				this.$ajax.get("/getGoodsByshopId", {
					params: {
						id: this.$route.query.id
					}
				}).then(data => {
					this.goodsTypeList = data.goodsTypeList;
					this.shopPic = data.goodsTypeList[0].goods[0].shopPic
					console.log(data.goodsTypeList)
				})
			},
			addCar(id, Price) {
				console.log(id);
				this.$ajax.get("/getGoodsListById", {
					params: {
						id
					}
				}).then(data => {
					this.goodsList = data.goodsList;
					//				console.log(this.goodsList.goodsName);
					this.carList.unshift({
						id,
						name: this.goodsList.goodsName
					})
					console.log(this.carList)
				})
				$('.det_car').css("background", "#3190E8");
				$('.det_car').css("color", "#fff");
				$('.shop_num').css("display", "block");
				$('.det_footer').find("p").html("¥" + Price);
				$('.det_footer').find("p").css("font-size", "0.4rem");
				$('.det_footer').find("p").css("color", "white");
				this.num = ++this.num;
			},
			fn() {
				$('.left ul').on('click', 'li', function() {
					var i = $(this).index('.left ul li');
					$('body, html').animate({
						scrollTop: $('.right ul li').eq(i).offset().top - 40
					}, 500);
				});
				$('.swiper-container-ul-li').click(function() {
					var index = $(this).index();
					if(index == 0) {
						$('.swiper-slide').eq(0).show();
						$('.swiper-container-ul-li').eq(0).addClass('actives');
						$('.swiper-slide').eq(1).hide();
						$('.swiper-container-ul-li').eq(1).removeClass('actives');
					} else {
						$('.swiper-slide').eq(0).hide();
						$('.swiper-container-ul-li').eq(0).removeClass('actives');
						$('.swiper-slide').eq(1).show();
						$('.swiper-container-ul-li').eq(1).addClass('actives');
					}
				});
			}

		},
		mounted() {
			this.getGoodsByshopId();
			this.shopName = this.$route.query.shopName;
			this.fn();
		}
	}
</script>

<style type="text/css">
	body,
	ul,
	li,
	dl,
	dt,
	dd,
	p,
	ol,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	form,
	img,
	table,
	fieldset,
	legend {
		margin: 0;
		padding: 0;
	}
	
	ul,
	li,
	ol {
		list-style: none;
	}
	
	img,
	fieldset {
		border: 0;
	}
	
	img {
		display: block;
	}
	
	a {
		text-decoration: none;
		color: #333;
	}
	
	body {
		font-family: "微软雅黑";
		font-size: 16px;
		padding-bottom: 1.5rem;
	}
	
	input,
	a {
		outline: none;
	}
	
	html {
		font-size: 13.33vw;
	}
	
	@font-face {
		font-family: 'iconfont';
		src: url('../../font/iconfont.eot');
		src: url('../../font/iconfont.eot?#iefix') format('embedded-opentype'), url('../../font/iconfont.woff') format('woff'), url('../../font/iconfont.ttf') format('truetype'), url('../../font/iconfont.svg#iconfont') format('svg');
	}
</style>
<style scoped>
	.mint-header {
		height: 2rem;
	}
	
	.logo_img_wrap {
		padding-bottom: 0.3rem;
	}
	
	.logo_img {
		width: 1.5rem;
		height: 1.5rem;
		margin: -1.2rem auto 0;
		position: relative;
		z-index: 99;
	}
	
	.det_main {
		height: 2.8rem;
		text-align: center;
	}
	
	.det_main h3 {
		width: 100%;
		font-size: 0.5rem;
	}
	
	.det_main p {
		margin-top: 0.1rem 0;
	}
	
	.det_main p span {
		font-size: 0.08rem;
		display: inline-block;
		margin: 0 0.1rem;
		color: #666;
	}
	
	.det_main .prefer {
		width: 2.88rem;
		height: 0.48rem;
		line-height: 0.48rem;
		color: #594519;
		background: #ffe578;
		margin: 0.12rem auto;
		font-size: 0.09rem;
	}
	
	.det_main .prefer span {
		margin: 0 0.1rem;
	}
	
	.det_main .intord span {
		font-size: 0.08rem;
	}
	
	.det_main .intord .one {
		display: inline-block;
		padding: 0 0.03rem;
		color: white;
		background: greenyellow;
	}
	
	.det_main .announ {
		font-size: 0.08rem;
		color: #666;
		margin-top: 0.1rem;
	}
	
	.det_nav {
		height: 0.8rem;
		border-bottom: 1px solid #E7E1CD;
	}
	
	.det_nav ul {
		display: flex;
	}
	
	.det_nav ul li {
		flex: 1;
		text-align: center;
		line-height: 0.8rem;
	}
	
	.det_adv {
		height: 1.76rem;
		padding: 0.18rem 0.32rem 0;
	}
	
	.det_adv img {
		width: 100%;
		display: block;
	}
	/******************************************************************************/
	
	.swiper-container-ul {
		list-style: none;
		overflow: hidden;
		width: 100%;
		background: #fff;
		top: 0;
	}
	
	.swiper-container-ul-li {
		width: 50%;
		height: 40px;
		line-height: 40px;
		float: left;
		text-align: center;
	}
	
	.actives {
		border-bottom: 1px solid #3190e8;
		color: #3190e8;
	}
	
	.content {
		width: 100%;
		overflow: hidden;
	}
	
	.left {
		top: 41px;
		float: left;
		width: 25%;
		height: 100%;
		background: #eee;
	}
	
	.left ul {
		list-style: none;
		font-size: 0.32rem;
	}
	
	.left ul li {
		padding: 15px 5px;
		text-align: center;
	}
	
	.active {
		background: #fff;
		border-left: 2px solid #3190e8;
	}
	
	.right {
		float: left;
		width: 75%;
		height: 100%;
	}
	
	.right ul {
		list-style: none;
	}
	
	.class-title {
		padding: 7px 10px;
		background: #eee;
	}
	
	.item {
		overflow: hidden;
		width: 100%;
		padding: 10px;
		background: #fff;
		border-bottom: 1px solid #eee;
	}
	
	.item_wrap {
		position: relative;
	}
	
	.add {
		position: absolute;
		width: 0.4rem;
		height: 0.4rem;
		text-align: center;
		line-height: 0.36rem;
		font-size: 0.42rem;
		background: #2295ff;
		top: 70%;
		right: 6%;
		color: white;
		border-radius: 50%;
	}
	
	.item-left {
		float: left;
	}
	
	.item-right {
		float: left;
		padding: 0 10px;
	}
	
	.item-img {
		width: 1.5rem;
		height: 1.5rem;
	}
	
	.item-img img {
		width: 100%;
		display: block;
	}
	
	.title {
		width: 2.5rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 0.28rem;
		margin-top: 10px;
	}
	
	.subtitle {
		font-size: 0.18rem;
		margin-top: 10px;
		color: #999;
	}
	
	.price {
		font-size: 0.28rem;
		margin-top: 10px;
		color: red;
	}
	/*************************************************************************/
	
	.footer {
		display: block;
		position: fixed;
		width: 100%;
		z-index: 3;
		bottom: 0px;
		color: #f03c03;
		background: #fff;
		line-height: 35px;
		font-size: 15px;
		border-top: 1px solid #e2e2e2;
	}
	/*.footer .left {
		float: left;
		margin: 5px 10px;
	}
	
	.footer .right {
		float: right;
	}
	.footer .shop_num{
		position: absolute;
		z-index: 9999;
		width:0.4rem;
		height: 0.2rem;
		border: 20%;
		background: red;
	}
	.footer .right .disable {
		background: #dbdbdb;
	}
	
	.footer .xhlbtn {
		display: block;
		text-align: center;
		line-height: 45px;
		background-color: #F03C03;
		padding: 0 15px;
		color: #fff;
		font-weight: bold;
	}*/
	
	.det_footer {
		height: 1.08rem;
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: rgb(61, 61, 63);
		z-index: 9999;
	}
	
	.det_footer .det_car {
		width: 0.95rem;
		height: 0.95rem;
		background: #363636;
		border: 0.13rem solid #444444;
		border-radius: 50%;
		position: absolute;
		top: -0.3rem;
		left: 0.35rem;
		font-family: 'iconfont';
		text-align: center;
		line-height: 0.95rem;
		font-size: 0.55rem;
		color: #5e5e63;
	}
	
	.det_footer .shop_num {
		position: absolute;
		width: 0.5rem;
		height: 0.3rem;
		border-radius: 25%;
		background: red;
		text-align: center;
		line-height: 0.3rem;
		color: white;
		font-size: 0.12rem;
		top: -0.3rem;
		left: 1.05rem;
		display: none;
	}
	
	.det_footer p {
		font-size: 0.08rem;
		color: #999;
		margin: 0.25rem 0 0 1.74rem;
	}
	
	.det_footer span {
		color: white;
		font-size: 0.34rem;
		line-height: 1.08rem;
		position: absolute;
		top: 0;
		right: 0.4rem;
	}
</style>