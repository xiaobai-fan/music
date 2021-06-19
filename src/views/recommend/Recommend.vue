<template>
<div class="recommend">
<!--  轮播图组件-->
  <Banner :bannerData="bannerData"/>

<!--  推荐歌单-->
  <div class="recommendMusicList">
    <h3>
      推荐歌单
      <i class="fa fa-angle-right"></i>
    </h3>
    <div class="listCard">
      <div class="listItem" v-for="(item,index) in MusicLists" @click="MusicListItem(item.id)">
        <div class="img">
          <img :src="item.picUrl" alt="">
        </div>
        <div class="title">
          {{item.name}}
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import Banner from "./banner/Banner";
export default {
  name: "Recommend",
  data(){
    return{
      //轮播图数据
      bannerData:[],
      //推荐歌单数据
      MusicLists:[]
    }
  },
  created() {
    this.bannerDate()
    this.MusicList()
  },
  methods:{
    //请求轮播图数据
      async bannerDate(){
        if(this.bannerData.length===0){
          const result = await this.service('/banner')
          // console.log(result)
          this.bannerData = result.data.banners
        }
      },
    //请求推荐歌单数据
    async MusicList(){

        if(this.MusicLists.length===0){
          const result = await this.service('/personalized?limit=20')
          // console.log(result)
          this.MusicLists = result.data.result
        }

    },
    MusicListItem(id){
        // this.$router.push({name:'musiclistdeta',params:{id:id}})
      // if(!this.$store.state.isLogin){
      //   this.$message.error('请先进行登记操作')
      //   return
      // }
      this.$router.push({ name: 'musiclistdeta', params: { id } });

      // console.log(id)
    }
  },
  components: {Banner}
}
</script>

<style lang="less" scoped>
.recommend{
  padding-left: 10px;
  &&::-webkit-scrollbar{
    overflow: hidden;
  }
  .recommendMusicList{

    i{
      font-size: 22px;
    }
    .listCard{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .listItem{
        width: 206px;
        margin: 10px 0px;
        .img{
          width: 206px;
          height: 206px;
          border-radius: 6px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .title{
          word-break: break-all;
          font-size: 14px;
        }
      }
    }

  }
}
</style>
