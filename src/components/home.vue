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
  import requestServer from '@/utils/request'
  import topBar from "./common/topBar";
  import sideBar from "./common/sideBar";
  import { sideBarList } from '@/api/menuList';

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

      getSideBarList() {
        sideBarList().then((res) => {
          console.log(res)
        })
      }
    },

    created() {
      this.getSideBarList();
    }

  }
</script>

<style scoped>

</style>
