<template>
  <div class="home">
    <el-container>
      <el-aside width="300px" height="100%">
        <div class="aside-header">
          <i class="el-icon-s-platform"></i>
          <span> xxx system </span>
          <i class="el-icon-s-fold"></i>
        </div>
        <side-bar></side-bar>
      </el-aside>
      <el-container>
        <el-header>
          <top-bar></top-bar>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>

    <div class="test">
    </div>
  </div>
</template>

<script>
  import topBar from "./common/topBar";
  import sideBar from "./common/sideBar";

  export default {
    name: 'Home',
    components: {
      topBar,
      sideBar,
    },
    data: function () {
      return {}
    },
    methods: {
      // async test() {
      //   const data = await requestServer.test();
      //   console.log(data)
      // }


    },


  }
</script>

<style lang="scss" scoped>
  .aside-header {
    width: 300px;
    height: 60px;
    text-align: center;

    .el-icon-s-platform {
      color: #fff;
      font-size: 32px;
      line-height: 60px;
      margin-left: 5px;
    }

    span {
      padding: 0 28px 0 23px;
      font-size: 28px;
      color: #fff;
      line-height: 60px;
    }

    .el-icon-s-fold {
      color: #fff;
      font-size: 20px;
    }

  }
</style>
