import Vue from 'vue';
import Router from 'vue-router';
import adminLog from "@/components/damin/adminLog";
import addAdmin from "@/components/damin/addAdmin";
import shopType from "@/components/shop/shopType";
import shopManage from "@/components/shop/shopManage";
import goodsType from "@/components/goods/goodsType";
import goodsList from "@/components/goods/goodsList";
import advList from "@/components/advs/advList";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'adminLog',
      component: adminLog
    },{
    	path:'/addAdmin',
    	name:'addAdmin',
    	component:addAdmin
    },{
    	path:'/shopType',
    	name:'shopType',
    	component:shopType
    },{
    	path:'/shopManage',
    	name:'shopManage',
    	component:shopManage
    },{
    	path:'/goodsType',
    	name:'goodsType',
    	component:goodsType
    },{
    	path:'/goodsList',
    	name:'goodsList',
    	component:goodsList
    },{
    	path:'/advList',
    	name:'advList',
    	component:advList
    }
  ]
})
