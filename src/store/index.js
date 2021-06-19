import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0,
    //用户id
    userId:'',
    //登录状态
    isLogin:false,
    //创建的歌单
    establishList:[],
    //收藏的歌单
    collectList:[],
    //音乐url id
    musicId:'',
    //当前播放歌单
    musicList:[],
    //当前播放歌单id
    musicListId:'',
    //播放状态
    isPlay:false,
    //音乐加载状态
    isMusicLoad:false,

  },
  mutations: {
    increment (state) {
      state.count++
    },
    //更新登记状态
    stateisLogin(state){
      state.isLogin = !state.isLogin
    },
    //更新创建歌单
    updataEstablishList(state,establishList){
      state.establishList = establishList
    },
    //更新收藏歌单
    updataCollectList(state,collectList){
      this.collectList = collectList
    },
    //更新音乐url id
    updataMusicId(state,musicId){
      state.musicId = musicId
    },
    //更新当前播放歌单
    updataMusicList(state,musicList){
      // if(state.musicListId !== musicListId){
        state.musicList = musicList

        //    state.musicListId = play.musicListId
      //  state.musicList = play.musicList
      // //
      // }
      // let musicList = play.musicList.slice(0)
      // state.musicList = musicList
    },
    // //更新当前播放歌单id
    updataMusicListId(state,musicListId){
      if(state.musicListId !== musicListId) {

        state.musicListId = musicListId
      }
    },
    //修改播放状态
    changePlayState(state,isPlay){
      state.isPlay = isPlay
    },
    //更新音乐加载状态
    updataisMusicLoad(state,isMusicLoad){
      state.isMusicLoad = isMusicLoad
    }

  }
})
export default store
