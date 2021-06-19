<template>
<div>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="180px">
        <Aside />

      </el-aside>
      <el-main>
          <router-view></router-view>

      </el-main>
    </el-container>
    <Bottomcard />

  </el-container>
</div>
</template>

<script>
import Header from "./header/Header";
import Aside from "./aside/Aside";
import Container from "./container/Container";
import Bottomcard from '../views/bottomcard/Bottomcard'
export default {
  name: "Home",
  components: {Bottomcard, Container, Aside, Header},
  mounted() {
    // console.log(this.service)
  }
}
</script>

<style lang="less" scoped>
.el-header{
  width: 100%;
  background-color: #EC4141;
  color: #333;

}

.el-aside {
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100vh;
  padding-left: 15px

}

.el-main {
  background-color: white;
  color: #333;
  height: calc(100vh - 120px);
  user-select: none;
  cursor: pointer;
  &::-webkit-scrollbar{
    overflow: hidden;
  }
}

</style>
