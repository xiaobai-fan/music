<template>
  <div class="header">
    <div class="left">
      <img src="../../assets/img/logo.png" alt="">
    </div>
    <div class="center">
      <div class="buttons">
        <i class="fa fa-angle-left" @click="clickLeft"></i>
        <i class="fa fa-angle-right" @click="clickRight"></i>
      </div>
      <div class="search">
        <div class="search_w">
          <i class="fa fa-search"></i>
          <input type="text" placeholder="请输入内容">
        </div>
      </div>

    </div>
    <div class="right">
<!--      未登录-->
      <el-popover
        width="300"
        trigger="manual"
        v-model="visible"
        v-if="show"
        >
            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="" slot="reference" @click="visible = !visible">
        <div v-if="visible" style="padding: 20px 30px 0px 0px">
          <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="手机号" prop="name">
              <el-input type="text" v-model="ruleForm.name" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit">登录</el-button>
              <el-button @click="resetForm()">取消</el-button>
            </el-form-item>
          </el-form>

        </div>
<!--        </div>-->
      </el-popover>
<!--      登录成功-->
      <el-popover
        width="100"
        trigger="manual"
        v-model="visible"
        v-else
      >
        <img :src="userInfo.avatarUrl" alt="" slot="reference" @click="visible = !visible"/>
        <div class="loginButton" style="text-align: center">
          <el-button size="small  " type="info" class="logout" @click="logout" style="text-align: center"
          >退出登录</el-button
          >
        </div>

      </el-popover>

      <div class="username" slot="reference" @click="visible = !visible" v-if="show">
        {{username}}
        <i class="fa fa-sort-down"></i>
      </div>
      <div class="username" slot="reference" @click="visible = !visible" v-else>
        {{userInfo.nickname}}
        <i class="fa fa-sort-down"></i>
      </div>

    </div>
  </div>
</template>

<script>
import Login from "./Login";
export default {
  name: "Header",
  components: {Login},
  data(){
    return{
      visible: false,
      username:'未登录',
      show:true,
      userInfo:{},
      ruleForm: {
        name: '',
        pass:'',
      },
    }
  },
  created() {

    if(window.localStorage.getItem('userInfo')){
      this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      this.show = false
      this.$store.state.userId = this.userInfo.userId
      this.$store.commit('stateisLogin')
    }
  },
  methods:{
    clickLeft(){
      this.$router.go(-1)
    },
    clickRight(){
      this.$router.go(1)

    },
    //退出登录
    logout(){
        window.localStorage.removeItem('userInfo')
        this.show = true
        this.visible = false
        this.$store.commit('stateisLogin')
        this.$router.go(0)
    },



    submit() {
     this.service('/login/cellphone',{
       phone:this.ruleForm.name,
       password:this.ruleForm.pass,
       withCredentials:true
     })

      .then(result => {
        console.log(result)
        if(result.data.code===200){
          window.localStorage.setItem('userInfo',JSON.stringify(result.data.profile))
          window.localStorage.setItem('token',JSON.stringify(result.data.token))
          this.$router.go(0)
          this.userInfo = result.data.profile
          this.show = false
          this.visible = false
          this.$message('登录成功');

        }else if(result.data.code === 400){
          this.$message('手机号码错误');

        }else if(result.data.code === 502){
          this.$message('密码错误');

        }else{
          this.$message('登录失败,请稍后重试');

        }
      })
      .catch(error => {
        console.log(error)
      })


    },
    resetForm() {
      this.visible = false

    },


  }

}
</script>

<style lang="less" scoped>
.show{
  display: none;
}
.header{
  display: flex;
  align-items: center;
  width:100%;
  height: 60px;
  position: relative;

  .login{
    width: 300px;
    height: 200px;
    background-color: white;
    padding: 30px 30px 0px 0px;
    position: relative;
    top: 160px;
    right: -200px;
    z-index: 100000;
    box-shadow: 0px 0px 10px #eee;
  }
  .login::before{
    content: '';
    border: 12px solid transparent;
    border-bottom-color:white;
    position: absolute;
    top: -24px;
    left: 150px;
  }


.left{
  width: 140px;
  height: 40px;
  margin: 0px 66px 0px 0px;
img{
  width: 100%;
  height: 100%;
}
}
.center{
  display: flex;
  align-items: center;
.buttons{
  display: flex;
i{
  color: white;
  background-color: #E13E3E;
  border-radius: 50%;
  padding: 6px;
  margin: 0 3px;
  text-align: center;
  //font-style: normal;
}
  i::before{
    width: 16px;
    height: 16px;
    display: inline-block;

  }
}
.search{
  //height: 40px;
.search_w{

  position: relative;

i{
  color: white;
  position: absolute;
  left: 6px;
  top: 10px;
}
input{
  background-color: #E13E3E;
  height: 35px;
  border-radius:20px;
  padding-left: 26px;
  outline: 0;
  border: 0px solid #E13E3E;
  color: white;
}

}
}
}

.right{
  position: absolute;
  right: 200px;
  height: 40px;
  display: flex;
  align-items: center;
  img{
    width: 30px;
    height: 30px;
    margin-right: 6px;
    border-radius: 6px;


  }

.username{
  color: #FBD9D9;
  cursor: pointer;
  font-size: 12px;
  user-select: none;
  i{
    transform: translateY(-2px);
  }
}
  .username:hover{
    color: white;
  }
}


}
</style>
