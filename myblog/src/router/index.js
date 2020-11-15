import Vue from 'vue';
import Router from  'vue-router';
import Login from '../components/Login';
import regist from '../components/regist';
import changpsw from '../components/changpsw.vue';
import Article from '../components/article.vue';
import Index from '../components/index.vue'
import tArticle from '../components/tArticle.vue'
Vue.use(Router);

export default new Router({			//路由配置
    routes:[
        {
            path:'/Login',
            name:'Login',
            component: Login
        },
        {
            path:'/regist',
            component: regist
        },
		{
			path:'/changpsw',
			component: changpsw
		},
		{
			path:'/Article',
			name:'Article',
			component: Article
		},
		{
			path:'/tArticle',
			name:'tArticle',
			component: tArticle
		},
		{
			path:'/',
			name:'Index',
			component: Index
		},
    ]
})