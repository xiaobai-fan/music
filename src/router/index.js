import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect:'/discover',
      children:[
        {
          path:'/discover',
          name:'discover',
          component:()=>import('../components/container/Container'),
          redirect:'/discover/recommend',
          children:[
            {
              path:'/discover/recommend',
              component:()=>import('../views/recommend/Recommend')
            },
            {
              path:'/discover/song',
              component:()=>import('../views/song/Song')
            },
            {
              path:'/discover/ranking',
              component:()=>import('../components/ranking/Ranking')
            },
            {
              path:'/discover/singer',
              component:()=>import('../components/singer/Singer')
            }
          ]
        },
        {
          path:'/video',
          name:'video',
          component:()=>import('../components/video/Video')
        },
        {
          path:'/musiclistdeta/:id',
          name:'musiclistdeta',
          component:()=>import('../views/musiclistdeta/Musiclistdeta')
        },
        {
          path:'/friend',
          component:()=>import('../components/friend/Friend')
        },
        {
          path:'/personal',
          component:()=>import('../components/Personal/Personal')

        }
      ]
    },

  ]
})
