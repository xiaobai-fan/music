<template>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        router
        :default-active="defaultActive"
      >

        <el-menu-item index="/discover" >
          发现音乐
        </el-menu-item>

        <el-menu-item index="/video">
          视频
        </el-menu-item>
        <el-menu-item index="/friend">朋友</el-menu-item>
        <el-menu-item index="/personal">直播</el-menu-item>
        <el-menu-item index="/personal">私人FM</el-menu-item>
        <el-menu-item-group>
          <template slot="title" >创建的歌单</template>
          <el-menu-item
            v-for="(item,index) in establishList"
            :key="index"
            :index="'/musiclistdeta/'+item.id"
          >{{item.name}}</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title" >收藏的歌单 {{this.$store.state.isLogin}}</template>
          <el-menu-item
            v-for="(item,index) in collectList"
            :key="index"
            :index="'/musiclistdeta/'+item.id"
          >{{item.name}}</el-menu-item>

        </el-menu-item-group>

      </el-menu>

</template>

<script>
export default {
  name: "Aside",
  data(){
    return{
      establishList:[], //创建歌单
      collectList:[],   //收藏歌单
      defaultActive:'',
    }
  },

  created() {
    setTimeout(()=>{
      this.userPlaylist()
    },500)
    this.defaultActive = this.$route.path.split('/')[1]
    // console.log(this.$route.path.split('/')[1])
  },
  methods: {

    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },

    //请求用户歌单
   async userPlaylist(){
      if (!this.$store.state.isLogin) {
        // 说明已经退出登录
        this.$message.error("请先进行登录操作");
        return;
      }

      let timestamp = Date.parse(new Date());

      this.service('/user/playlist',{
        uid:this.$store.state.userId,
        timestamp
      })
      .then(result => {
        // console.log(result)
        result = result.data.playlist;
        let index = result.findIndex((item) => item.ordered === true);
        // console.log(index)
        this.establishList = result.slice(0,index)
        this.collectList = result.slice(index)
        this.establishList[0].name = '我喜欢的音乐'
        // console.log( this.establishList,this.collectList)
        //将歌单上传至vuex
        this.$store.commit('updataEstablishList',this.establishList)
        this.$store.commit('updataCollectList',this.collectList)
      })
      .catch(error => {
        console.log(error)
      })


    },

  }
}
</script>

<style lang="less" scoped>
.el-menu-item-group{
  text-align: left;
}
.el-menu-item{
  height: 40px;
  line-height: 40px;
  text-align: left;
  overflow-wrap: normal;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
