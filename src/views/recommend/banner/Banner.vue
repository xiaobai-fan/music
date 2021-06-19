<template>
<!--  轮播图-->
<div class="banner">
  <template>
    <el-carousel :interval="3000" type="card" height="200px">
      <el-carousel-item v-for="(item,index) in bannerData" :key="index">
        <img :src="item.imageUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </template>
</div>
</template>

<script>
export default {
  name: "Banner",
  props:['bannerData'],

}
</script>

<style lang="less" scoped>
img{
  width: 100%;
  height: 100%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
