<!-- // todo 这个是侧边栏 -->
<template>
  <div class="side-bar">
    <el-container>
      <el-aside style="background-color: rgb(238, 241, 246)">
        <!-- todo
            参考：https://www.cnblogs.com/sexintercourse/p/12359480.html
            router  // 启用 router 属性
            :default-active = "path"  // 当前激活的菜单绑定"path"
            :default-active="$route.path"
        -->
        <el-menu
          router
          :default-active="pathRoute"
          :unique-opened=true
          style="transition: all 0.2s;"
          :style="{width: `${isCollapse?'53px':'260px'}`}" :collapse="isCollapse"
          :collapse-transition=true
          @select="handleSelect"
          @open="handleMenuOpen"
          class="el-menu-vertical"
          background-color="#2a5eff"
          text-color="#f5f6f8"
          active-text-color="#fff">
          <ele-template :navMenus="totalList"></ele-template>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {sideBarList, sideBarListJianShu} from '../../api/menuList';
  import EleTemplate from "../eleTemplate";
  import router from '@/router/index';

  export default {
    name: 'sideBar',
    props: {
      rowId: {
        type: Boolean,
        default() {
          return false;
        },
      },
    },

    components: {
      EleTemplate
    },

    data() {
      return {
        path: '',
        isCollapse: false,
        totalList: [],
        pathRoute: ''
      }
    },

    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath)
        // console.log('this.$route.path', this.$route.path);
      },
      handleMenuOpen(key, keyPath) {
        // console.log(key, keyPath)
      },

      // todo 渲染侧边栏数据
      getSideBarListJianShu() {
        sideBarListJianShu().then((res) => {
          if (res.data.code === 200) {
            // console.log(res.data, 84);
            this.totalList = res.data.childs;
          } else {
            this.$message.warning('获取侧边栏数据失败，请重试！')
          }
        })
        // console.log('this.$route.path', this.$route.path);
        // console.log('this.$router', this.$router);
      },
    },

    beforeRouteEnter(to, from, next) {
    },

    watch: {
      $route(to, from) {
        this.pathRoute = this.$route.path;
      },
      rowId: function (newValue) {
        this.isCollapse = newValue;
      }
    },

    created() {
      this.getSideBarListJianShu();
      this.$emit('on-response', this.isCollapse);
      this.pathRoute = this.$route.path;
    },
  }
</script>

<style lang="scss" scoped>
  .el-menu-vertical {
    width: 100%;
  }
</style>
