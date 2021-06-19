<template>
<div class="bottomCard">
  <audio
    id="audio"
    autoplay
    ref="audioPlayer"
    @play="changePlay(true)"
    @pause="changePlay(false)"
    @ended="changeMusic('next')"
    :src="musicUrl"
    @timeupdate="timeupdate"
  >


  </audio>
  <div class="left">
    <div class="left_img">
      <img :src="MusicListItem.al.picUrl" alt=""  v-if="MusicListItem.al">
      <img src="../../assets/img/test.jpg" alt="" v-else>
    </div>
    <div class="musicInfo">
      <div class="music_name" v-if="MusicListItem.name">{{MusicListItem.name}}</div>
      <div class="song" v-if="MusicListItem.name">{{MusicListItem.ar[0].name}}</div>
    </div>
  </div>
  <div class="center">
    <div class="button">
      <span><i class="fa fa-random"></i></span>
      <span @click="changeMusic('pic')"><i class="fa fa-step-backward" ></i></span>
      <span @click="changePlayState">
        <i class="fa fa-pause" v-if="this.$store.state.isPlay"></i>
        <i class="fa fa-play" v-else></i>
      </span>
      <span @click="changeMusic('next')"><i class="fa fa-step-forward"></i></span>
      <span><i class="fa fa-heart-o"></i></span>
    </div>
    <div class="slider_bar">
      <span class="slider_left">00:00</span>
      <el-slider
        v-model="value1"
        style="width: 300px"
        :show-tooltip="false"
        :max="this.strTime"
      ></el-slider>
      <span class="slider_right">{{  total }}</span>

    </div>
  </div>
  <div class="right">
    <div class="tone">
      标准音质
    </div>
    <div class="sound">
      <i class="fa fa-volume-up"></i>
      <el-slider
        v-model="value2"
        style="width: 60px"
        :show-tooltip="false"
      ></el-slider>
    </div>
    <div class="list" @click="drawer = true">
      <i class="fa fa-list-ul"></i>
    </div>
  </div>
  <el-drawer
    :visible.sync="drawer"
    :with-header="false"
    size="400px"
  >
    <h3>当前播放</h3>
    <div class="table-bar">
      <div class="left">总共{{this.$store.state.musicList.length}}首</div>
      <div class="center">收藏全部</div>
      <div class="right">清空列表</div>
    </div>
    <template>
      <el-table
        :data="this.$store.state.musicList"
        style="width: 100%"
        lazy
        highlight-current-row
        stripe
        size="mini"
      >
        <el-table-column
          prop="name"

          width="180">
        </el-table-column>
        <el-table-column
          prop="ar[0].name"
          width="120">
        </el-table-column>
        <el-table-column
          prop="dt"
        >
        </el-table-column>
      </el-table>
    </template>

  </el-drawer>
</div>
</template>

<script>
export default {
  name: "BottomCard",
  data(){
    return{
      value1:0,
      value2:0,
      drawer: false,
      step:true,
      musicUrl:'',
      MusicListIndex:0,
      MusicListItem: {},
      currentTime:0,
      strTime:0,
      total:'00:00'
    }
  },
  created() {

  },
  mounted() {

  },
  watch:{
    "$store.state.musicId"(id){
      // console.log(id)
      this.getMusicDetail(id)
      this.getMusicListIndex()


    },
    //监听播放状态

    "$store.state.isPlay"(isPlay){
      // console.log(isPlay)
      if(isPlay){
        this.playMusic()
      }else {
        this.pauseMusic()
      }
    },
    // "$store.state.musicList"(list){
    //   console.log(list)
    //   this.getMusicList(list)
    // }
  },
  methods:{
    //请求歌单列表
    // async getMusicList(list) {
    //   let result = await this.service('/playlist/detail',{id:list})
    //   console.log(result)
    // },
    //请求歌曲url
     async getMusicDetail(id){
       //歌曲加载状态
      this.$store.commit('updataisMusicLoad',true)
      let result = await this.service('/song/url',{id,br: 320000  })
       // console.log(result)
       if(result.data.data[0].url == null){
         this.$message.error('改歌曲暂无版权,将为你播放下一首')
         this.changeMusic('next')

       }
       this.musicUrl = result.data.data[0].url

       this.$store.commit('updataisMusicLoad',false)


     },
    //点击播放回调
    changePlayState(){
      !this.$store.state.isPlay ? this.playMusic() : this.pauseMusic();
    },
    //播放音乐
    playMusic(){
      this.$refs.audioPlayer.play()
      // document.getElementById('audio').play()
    },
    //暂停音乐
    pauseMusic(){
      this.$refs.audioPlayer.pause()
      // document.getElementById('audio').pause()

    },
    // audio开始或暂停播放的回调  在vuex中改变状态
    changePlay(state){
      this.$store.commit('changePlayState',state)
    },
    changeMusic(type,id){
        if(type==='pic'){
          let picIndex = this.MusicListIndex

          let picIndexs = picIndex -1 >0 ? picIndex-1 : this.$store.state.musicList.length -1
          this.$store.commit('updataMusicId',this.$store.state.musicList[picIndexs].id)
        } else if(type==='next'){
          let picIndex = this.MusicListIndex
          let picIndexs = picIndex + 1 <this.$store.state.musicList.length ? picIndex+1 : 0
          this.$store.commit('updataMusicId',this.$store.state.musicList[picIndexs].id)

        }
    },
    //获取歌曲index
    getMusicListIndex() {
       this.$store.state.musicList.forEach((item,index)=>{
         if(item.id === this.$store.state.musicId){
           this.MusicListIndex = index
           this.MusicListItem = item
           this.total = item.dt
           this.strTime = this.strMax(item.dt)
           // console.log(this.MusicListIndex)
         }


      })
    },
    //当前播放位置
    timeupdate(){
       let time = this.$refs.audioPlayer.currentTime
      time = Math.floor(time)
      this.value1 = time
      // console.log(this.$refs.audioPlayer.currentTime)
      // console.log(time,this.MusicListItem.dt,this.strTime)
    },
    strMax(value){
       let str1 = value.slice(0,2)
       let str2 = value.slice(3)
       let str = parseInt((str1 * 60)) + parseInt(str2)
       return str
    }


  },
}
</script>

<style lang="less" scoped>
.bottomCard{
  width: 100%;
  height: 70px;
  background-color: white;
  border: 2px solid #eee;
  box-shadow: 0px 0px 10px #eee;
  z-index: 1000000;
  position: fixed;
  left: 0;
  bottom:0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left{
    display: flex;
    align-items: center;
    margin-left:10px;
    .left_img{
      width:48px;
      height: 48px;
      margin-right: 10px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .musicInfo{
      width: 80px;
      font-size: 12px;
      .music_name{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
      }
      .song{

      }
    }
  }
  .center{
    display: flex;
    flex-direction: column;
    align-items: center;
    .button{
      display: flex;
      align-items: center;
      span{
        display: inline-block;
        width: 50px;
        text-align: center;
        i{
          font-size: 20px;
          opacity: .8;
        }
      }
    }
    .slider_bar{
      height: 10px;
      display: flex;
      align-items: center;
      margin-top: 15px;
      /deep/.el-slider__button{
        width: 4px;
        height: 4px;
        border-color: #E13E3E;
        background-color: #E13E3E;
      }
      /deep/.el-slider__bar{
        height: 4px;
        background-color: #E13E3E;
      }
      /deep/.el-slider__runway{
        height: 4px;
      }
      span{
        font-size: 12px;
        margin: 0 5px;
      }
    }

  }

  .right{
    display: flex;
    align-items: center;
    margin-right: 20px;
    .tone{
      width: 60px;
      height: 20px;
      line-height: 20px;
      border: 1px solid black;
      font-size: 12px;
      text-align: center;
      margin-right: 10px;
    }
    .sound{
      /deep/.el-slider__button{
        width: 4px;
        height: 4px;
        border-color: #E13E3E;
        background-color: #E13E3E;
      }
      /deep/.el-slider__bar{
        height: 4px;
        background-color: #E13E3E;
      }
      /deep/.el-slider__runway{
        height: 4px;
      }

      display: flex;
      align-items: center;
      margin-right: 10px;
      i{
        font-size: 20px;
        margin-right: 10px;
        opacity: .8;
      }
    }
    .list{
      i{
        font-size: 20px;
        opacity: .8;
      }
    }
  }
  /deep/.el-drawer.rtl{
    height: calc(100vh - 135px) ;
    position: fixed;
    top: 60px;
  }
  /deep/.el-table__header-wrapper{
    display: none;
  }
  h3{
    margin: 10px 15px;
  }
  .table-bar{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin: 10px;
    .left{
      color: #ccc;
    }
    .center{
      margin-left: 120px ;
    }
    .right{
      color: blue;
    }
  }
/deep/.el-table .cell{
  width: 300px;
}
}
</style>
