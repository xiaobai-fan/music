<template>
  <div>
    <Navbar :navbar="navbar"/>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Navbar from "../navbar/Navbar";
export default {
  name: "Container",
  data(){
    return{
      navbar:[
        {name:'个性推荐',path:'/discover/recommend'},
        {name:'歌单',path:'/discover/song'},
        {name:'排行榜',path:'/discover/ranking'},
        {name:'歌手',path:'/discover/singer'}
      ]
    }
  },
  components: {Navbar}
}
</script>

<style scoped>

</style>
