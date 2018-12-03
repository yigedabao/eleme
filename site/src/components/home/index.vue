<template>
	<div id="app">
		<div class="header">
			<div class="header_top">
				<i class="el-icon-location"></i><span>正义路北京市人民医院</span>
			</div>
			<div class="header_bottom">
				<el-button class="search" type="primary" icon="el-icon-search">搜索饿了么商家、商品名称</el-button>
				</el-input>
			</div>
		</div>
		<shopType></shopType>
		<advs></advs>
		<tabulate></tabulate>
		<div class="footer">
			<ul>
				<li><span>&#xe722;</span>首页</li>
				<li><span>&#xe663;</span>发现</li>
				<li><span>&#xe63c;</span>订单</li>
				<li><span>&#xe612;</span>我的</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import shopType from "./shopType";
	import advs from "./advs";
	import tabulate from "./tabulate";
	$(window).scroll(function() {
	let sTop = $(window).scrollTop();
	if(sTop > 40) {
		$(".header_bottom").css("position", "fixed");
		$(".header_bottom").css("top", "0");
		$(".header_bottom").css("z-index", "9999");
		$(".header_bottom").css("width", "100%");
	} else {
		$(".header_bottom").css("position", "");
	}

})
	
	export default {
		name: "Home",
		methods: {
		},
		components: {
			shopType,
			advs,
			tabulate
		},
		mounted(){
		}
	}
</script>

<style>
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
	
	.header {
		box-sizing: border-box;
		background-image: linear-gradient(90deg, #0af, #0085ff);
	}
	
	.header .header_top {
		font-weight: 600;
		font-size: 0.34rem;
		box-sizing: border-box;
		padding: 0.26rem 0.37rem 0;
		color: white;
	}
	
	.header .header_bottom {
		box-sizing: border-box;
		padding: 0.2rem 0.37rem;
		background-image: linear-gradient(90deg, #0af, #0085ff);
	}
	
	.search {
		width: 100%;
		background: #fff;
		color: #999;
		text-align: center;
		line-height: 0.32rem;
	}
	
	.footer {
		background: white;
		z-index: 9999;
		width: 100%;
		position: fixed;
		bottom: 0;
		font-family: 'iconfont';
		color: #8e8e93;
		border-top: 1px solid #EAEAEA;
	}
	
	.footer ul {
		display: flex;
		box-sizing: border-box;
		padding-bottom: 0.18rem;
	}
	
	.footer ul li {
		width: 25%;
		text-align: center;
		font-size: 0.22rem;
	}
	
	.footer ul li:nth-of-type(1) span {
		display: block;
		font-size: 0.8rem;
		margin-top: 0.06rem;
		margin-bottom: -0.2rem;
	}
	
	.footer ul li:nth-of-type(2) span {
		display: block;
		font-size: 0.5rem;
		margin-top: 0.22rem;
		margin-bottom: -0.02rem;
	}
	
	.footer ul li span {
		display: block;
		font-size: 0.4rem;
		margin-top: 0.3rem;
	}
</style>