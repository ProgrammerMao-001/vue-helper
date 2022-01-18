<template>
  <div class="home">
    <el-container>
      <el-aside
        style="animation-fill-mode: forwards;height: 100%;transition: all 0.4s;"
        :style="{width: `${isCollapse2?'53px':'300px'}`}" height="100%">
<!--      <el-aside :width="isCollapse2 ? '60px' : '300px'" height="100%">-->
        <div class="aside-header">
          <i :style="{ display: isCollapse2?'none':'' }" class="el-icon-s-platform"></i>
          <span :style="{ display: isCollapse2?'none':'' }"> xxx system </span>
          <i :style="{ lineHeight: isCollapse2?'60px':'' }" class="el-icon-s-fold" @click="changeIsCollapse"></i>
        </div>
        <side-bar :rowId="isCollapse2" @on-response="receiveData"></side-bar>
      </el-aside>
      <el-container>
        <el-header>
          <top-bar></top-bar>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

    <div class="test">
    </div>
  </div>
</template>

<script>
  import topBar from "./common/topBar";
  import sideBar from "./common/sideBar";
  import router from '@/router/index';

  export default {
    name: 'Home',
    components: {
      topBar,
      sideBar,
    },

    computed: {

    },

    filters: {

    },

    data: function () {
      return {
        isCollapse2: '',
      }
    },
    methods: {
      // async test() {
      //   const data = await requestServer.test();
      //   console.log(data)
      // }

      receiveData(data) {
        this.isCollapse2 = data;
      },

      /**
       * todo 点击展开/折叠
       */
      changeIsCollapse() {
        this.isCollapse2 = !this.isCollapse2;
        // console.log('isCollapse2', this.isCollapse2);
      },
    },

   async created() {
      await this.receiveData();
      // console.log(this.isCollapse2, 55);
    }

  }
</script>

<style lang="scss" scoped>
  .aside-header {
    /*width: 300px;*/
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
      cursor: pointer;
      color: #fff;
      font-size: 20px;
    }
  }
</style>
