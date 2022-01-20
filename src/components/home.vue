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
          <keep-alive>
            <div class="content">
              <router-view></router-view>
            </div>
          </keep-alive>
          <!-- 面包屑 start -->
          <div class="bottom-bread">
            <!--            <el-breadcrumb separator-class="el-icon-arrow-right">-->
            <!--              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
            <!--              <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
            <!--            </el-breadcrumb>-->

            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">
                <i class="el-icon-s-home" style="margin-right: 5px;"></i>首页
              </el-breadcrumb-item>
              <el-breadcrumb-item v-show="item.meta.title !== ''" v-for="item in breadcrumbList" :key="item.name" :to="{ path: item.path }">
                {{item.meta.title}}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 面包屑 end -->
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
      // username() {
      //   return this.$route.params.username
      // }
    },

    watch: {
      $route() {
        this.getBreadcrumb();
      }
    },

    filters: {},

    data: function () {
      return {
        isCollapse2: '',
        breadcrumbList: [], // 展示面包屑的数组
      }
    },

    methods: {
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

      getBreadcrumb() {
        // this.$route.matched.filter((item,index,self) => {
        //   if(item.meta.title){
        //       const title = item.meta.title;
        //       this.breadcrumbList.push(title);
        //   }
        // });
        this.breadcrumbList = this.$route.matched;
        // console.log(this.breadcrumbList)
        console.log(this.$route.matched);
      }
    },

    async created() {
      await this.receiveData();
      this.breadcrumbList = this.$route.matched;
      // console.log(this.breadcrumbList)
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
