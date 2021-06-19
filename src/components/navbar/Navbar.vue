<template>
<div class="nav">
  <div class="navbar">
    <div class="barItem" v-for="(item,index) in navbar" :key="index" @click="clickbar(item)">{{item.name}}</div>
  </div>
</div>
</template>

<script>
export default {
  name: "Navbar",
  props:['navbar'],
  methods:{
    clickbar(item){
      this.$router.push(item.path)
    }
  }

}
</script>

<style lang="less" scoped>
.nav{
  .navbar{
    height: 40px;
    display: flex;
    align-items: center;
    .barItem{
      margin: 0px 10px;
      padding-bottom: 6px;
      cursor: pointer;
    }
    .active{
      border-bottom: 3px solid red;

    }
  }
}

</style>
