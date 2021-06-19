<script src="../../router/index.js"></script>
<script src="../../store/index.js"></script>
<template>
<div>
  <div class="musiclistdeta">
    <!--  歌单信息-->
    <div class="listInfo">
      <!--    歌单封面-->
      <div class="left" v-if="musicListDetail.coverImgUrl">
        <img :src="musicListDetail.coverImgUrl" alt="">
      </div>
      <div class="right">
        <!--      歌单标题-->
        <div class="title">
          <div class="titleTag">歌单</div>
          <div class="titleContent">
            <h3>{{musicListDetail.name}}</h3>
          </div>
        </div>
        <!--      用户信息-->
        <div class="user" >
          <div class="user_img" v-if="musicListDetail.creator">
            <img :src="musicListDetail.creator.avatarUrl" alt="">
          </div>
          <div class="userName" v-if="musicListDetail.creator">{{musicListDetail.creator.nickname}}</div>
          <div class="creatime">{{  timeData(musicListDetail.createTime)}}</div>
        </div>
        <!--      操作按钮-->
        <div class="buttons">
          <div class="buttonItem" @click="playAll">
            <i class="fa fa-play"></i>
            <span>播放全部</span>
          </div>
          <div class="buttonItem">
            <i></i>
            <span>收藏</span>
          </div>
          <div class="buttonItem">
            <i></i>
            <span>分享</span>
          </div>
        </div>

        <div class="tags">
          标签：
          <div class="tagsItem"  v-for="item in musicListDetail.tags"> {{ item }} </div>

        </div>

        <div class="other">
          <div class="musicNum">歌曲：{{musicListDetail.trackCount}}</div>
          <div class="palyCount">播放: {{musicListDetail.playCount}}</div>
        </div>

        <div class="brief">简介 : {{musicListDetail.description}}</div>
      </div>
    </div>
  </div>

  <template>
    <el-tabs value="first"  @tab-click="handleClick" class="tabs">
      <el-tab-pane label="歌曲列表" name="first">
        <template>
          <el-table
            :data="musicListDetail.tracks"
            size="mini"
            highlight-current-row
            stripe
            lazy
            style="width: 100%"
            @row-dblclick="dblclick"
          >
<!--            :default-sort = "{prop: 'date', order: 'descending'}"-->
          >
            <el-table-column
              type="index"
              :index="indexMethod">

            </el-table-column>
            <el-table-column width="100">
              <template slot-scope="scope">
                <i class="fa fa-heart-o"></i>
                <i class="fa fa-download"></i>
              </template>
            </el-table-column>

            <el-table-column
              prop="name"
              label="音乐标题"
              sortable
              width="420"

            >

            </el-table-column>
            <el-table-column
              prop="ar[0].name"
              label="歌手"
              sortable
              width="200">
            </el-table-column>
            <el-table-column
              prop="al.name"
              label="专辑"
              >
            </el-table-column>
            <el-table-column
              prop="dt"
              label="时长"
              >
            </el-table-column>
          </el-table>
        </template>
      </el-tab-pane>
      <el-tab-pane label="评论" name="second">
        加载中{{handleMusicTime(229799)}}
      </el-tab-pane>
      <el-tab-pane label="收藏" name="third" >
        加载中
      </el-tab-pane>
    </el-tabs>
  </template>

</div>

</template>

<script>
export default {
  name: "Musiclistdeta",
  data(){
    return{
      //歌单详情
      musicListDetail:{},
      // 歌曲列表
      MusicTime:{}
    }
  },
  created() {
      this.musiclistdeta()
  },
  mounted() {
    setTimeout(()=>{
      this.loadMore()
    },500)

  },
  methods: {
    aply() {
      // console.log('111')
      this.$refs.musicaply.play()
      // let audio = document.querySelector('audio')
      // audio.play()

    },
    //获取歌单详情
    async musiclistdeta() {

      const result = await this.service(`playlist/detail?id=${this.$route.params.id}`)
      console.log(result)
      this.musicListDetail = result.data.playlist
      this.MusicTime = result.data.playlist.tracks
      for (let key in this.MusicTime) {
        this.MusicTime[key].dt = this.handleMusicTime(this.MusicTime[key].dt)
      }
      // console.log(this.musicListDetail)

      // console.log(this.musicListDetail.trackIds.slice(20))
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },

    // 歌曲下标
    indexMethod(index) {
      index += 1;

      if (index < 10) {
        return index = '0' + index
      } else {
        return index
      }


    },
    //歌单创建时间
    timeData(value) {
      let date = new Date(value)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let dater = date.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (dater < 10) {
        dater = '0' + dater
      }
      let time = year + '-' + month + '-' + dater
      return time


    },
    //歌曲播放时间
    handleMusicTime(value) {
      let date = new Date(value)
      let minu = date.getMinutes()
      let sec = date.getSeconds()
      if (minu < 20) {
        minu = '0' + minu
      }
      if (sec < 10) {
        sec = '0' + sec
      }
      let times = minu + ':' + sec
      return times
    },
    //获取音乐详情
    async getMusicListDetail(ids) {
      let result = await this.service('/song/detail', {ids})
      // console.log(result)
      result.data.songs.forEach((item, index) => {
        result.data.songs[index].dt = this.handleMusicTime(result.data.songs[index].dt)
      })
      this.MusicTime.push(...result.data.songs)
    },
    //加载所以音乐
    loadMore() {
      let arr = this.musicListDetail.trackIds.slice(20)
      // console.log(this.musicListDetail.trackIds)
      let ids = ''
      arr.forEach((item, index) => {
        ids += item.id + ','
      })
      ids = ids.slice(0, ids.length - 1)
      this.getMusicListDetail(ids)
    },
    //表格某一行被双击的时
    dblclick(row) {
      // console.log(row)
      this.$store.commit('updataMusicId', row.id)
      // console.log(this.musicListDetail.id, this.$store.state.musicListId, this.MusicTime)
      // this.$store.commit('changePlayState',true)
      if (this.musicListDetail.id !== this.$store.state.musicListId) {
        //   // this.$store.commit('updataMusicList',{
        //   //   musicList:this.musicListDetail.track,
        //   //   musicListId:this.musicListDetail.id
        //   // })
        this.$store.commit('updataMusicList', this.MusicTime)
        this.$store.commit('updataMusicListId', this.musicListDetail.id)
        // }
      }

    },
    //播放全部
    playAll(){
      this.$store.commit('updataMusicId',this.musicListDetail.tracks[0].id )
      this.$store.commit('updataMusicList', this.MusicTime)
      this.$store.commit('updataMusicListId', this.musicListDetail.id)


    }

  }
}
</script>

<style lang="less" scoped>

i{
  padding: 0px 3px;
  opacity: .6;
}

.listInfo {
  width: 100%;
  display: flex;
  .left{
    width: 186px;
    height: 186px;
    margin-right: 10px;
    img{
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }
  .right{
    .title{
      display: flex;
      .titleTag{
        font-size: 12px;
        color: #E13E3E;
        border: 1px solid #E13E3E;
        padding: 4px;
        margin-right: 10px;
      }

    }
    .user{
      display: flex;
      height: 40px;
      align-items: center;
      .user_img{
        width: 28px;
        height: 28px;
        margin-right: 10px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;

        }
      }
      .userName{
        margin-right: 10px;
      }
    }

    .buttons{
      display: flex;
      margin-bottom: 10px;
      .buttonItem:nth-child(1){
        background-color: #E13E3E;
        color: white;
      }
      .buttonItem{
        color: #E0E0E0;
        padding: 6px 15px;
        border: 1px solid #eee;
        margin-right: 10px;
        border-radius: 16px;

        i{
          color: white;
        }
      }
    }

    .tags{
      font-size: 14px;
      display: flex;
      font-weight: 100;

      .tagsItem{
          color: #507DAF;
          font-size: 14px;
          margin-right: 5px;
      }
    }

    .other{
      .musicNum{
        font-size: 14px;
        font-weight: 100;
      }
      .palyCount{
        font-size: 14px;
        font-weight: 100;

      }
    }

    .brief{
      width: 300px;
      height: 20px;
      font-size: 14px;
      font-weight: 100;
      white-space:nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

}




/deep/.el-tabs__active-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: #E13E3E;
  z-index: 1;
}
/deep/.el-tabs__item.is-active{
  color: #E13E3E;
}
/deep/.el-tabs__nav-wrap::after{
  content: '';
  height: 0;
}
/deep/.el-tabs__item{
  color: black;
}
</style>
