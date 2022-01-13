<template>
  <div class="home">
    <!--        <top-bar></top-bar>   -->
    <!--        <side-bar></side-bar>   -->
    <el-container class="layout-container">
      <el-header>
        <top-bar></top-bar>
      </el-header>
      <el-container>
        <el-aside width="300px">
          <side-bar></side-bar>
        </el-aside>
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
    }

  }
</script>

<style scoped>

</style>
