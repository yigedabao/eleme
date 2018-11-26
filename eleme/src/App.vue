<template>
	<el-container style="height: 100%;">
		<el-header>
			<el-row>
				<el-col :span="8" class="logo" :style="{width:isCollapse?'64px':'240px'}">
					<i>{{isCollapse?"饿":"饿了么管理系统"}}</i>
				</el-col>
				<el-col class="tool" :span="8">
					<i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" @click="isCollapse=!isCollapse"></i>
				</el-col>
				<el-col class="admin-info" :span="8">
					<el-dropdown>
						<span class="el-dropdown-link">
               	<span>{{$store.state.admin.adminName}}</span><img src="../build/elogo.jpg">
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item><span  @click="dialogFormVisible=true">修改密码</span></el-dropdown-item>
							<el-dropdown-item><span @click="$store.commit('OUT_LOGIN')">退出登陆</span></el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col> 
			</el-row>
			<changepassword :dialogFormVisible.sync="dialogFormVisible"></changepassword>
		</el-header>
		<el-container style="height: 100%;">
			<!--************************aside*****************************-->
			<el-aside :style="{width:isCollapse?'64px':'240px'}">
				<el-col :span="8" style="height:100%">
					<el-menu default-active="2" style="height:100%" :style="{width:isCollapse?'64px':'240px'}" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :collapse-transition="false" :collapse="isCollapse">
						<el-submenu index="1">
							<template slot="title">
								<i class="el-icon-menu"></i>
								<span>管理员管理</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="1-1" @click="$router.push('/addAdmin')">添加管理员</el-menu-item>
								<el-menu-item index="1-2" @click="$router.push('/')">查看管理员日志</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-menu-item index="2" @click="$router.push('/shopType')">
							<i class="el-icon-menu"></i>
							<span slot="title">店铺类别管理</span>
						</el-menu-item>
						<el-menu-item index="3" @click="$router.push('/shopManage')">
							<i class="el-icon-menu"></i>
							<span slot="title" >店铺管理</span>
						</el-menu-item>
						<el-menu-item index="4" @click="$router.push('/goodsType')">
							<i class="el-icon-menu"></i>
							<span slot="title" >商品类别管理</span>
						</el-menu-item>
						<el-menu-item index="5" @click="$router.push('/goodsList')">
							<i class="el-icon-menu"></i>
							<span slot="title">商品信息管理</span>
						</el-menu-item>
					</el-menu>
				</el-col>
				</el-row>
			</el-aside>

			<!--*******************main**********************-->
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>
<script>
	import changepassword from "./components/damin/changepassword"
	export default {
		name: 'App',
		data() {
			return {
				isCollapse: false,
				dialogFormVisible:false
			}
		},
//		methods:{
//			fn(v){
//              dialogFormVisible=v;
//          }
//		}
		components:{
            changepassword
        },
	}
</script>

<style>
	* {
		padding: 0;
		margin: 0;
	}
	
	html,
	body {
		height: 100%;
	}
	
	.el-header {
		padding: 0;
		height: 60px;
		background: #545c64;
	}
	
	.logo {
		line-height: 60px;
		text-align: center;
		width: 240px;
		height: 100%;
		border-right: 1px solid rgba(238, 241, 146, 0.3);
		border-bottom: 1px solid rgba(238, 241, 146, 0.3);
	}
	
	.logo i {
		font-size: 22px;
		font-weight: 600;
		color: #fff;
	}
	
	.tool {
		font-size: 30px;
		color: #fff;
		line-height: 60px;
	}
	
	.el-aside {
		overflow: hidden;
		box-sizing: border-box;
	}
	/*.el-menu-vertical-demo {
		width: 240px;
	}*/
	/*.el-menu-item,.el-submenu{
		border:1px solid rgba(238, 241, 146, 0.3);
		margin-bottom:-1px ;
	} */
	
	.admin-info {
		float: right;
		padding-right: 20px;
		text-align: right;
		vertical-align: middle;
	}
	
	.admin-info .el-dropdown {
		vertical-align: middle;
	}
	
	.admin-info span {
		color: #fff;
		line-height: 60px;
	}
	
	.admin-info img {
		width: 40px;
		height: 40px;
		border-radius: 20%;
		margin-left: 20px;
		vertical-align: middle;
	}
	
	.el-table th,
	.el-table td {
		text-align: center;
	}
</style>