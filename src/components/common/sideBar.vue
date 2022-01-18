<template>
  <div class="side-bar">
    <el-container>
      <el-aside style="background-color: rgb(238, 241, 246)">
        <!--左侧菜单组件-->

        <!--:default-active="isId"-->
        <el-menu
          :default-active="$route.path"
          style="transition: all 0.2s;"
          :style="{width: `${isCollapse?'53px':'300px'}`}"  :collapse="isCollapse"
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
      isCollapse: false,
      totalList: [],
      isId: "权限管理"
    }
  },

  methods: {
    handleSelect(key, keyPath) {
      console.log('handleSelect')
      console.log(key, keyPath)
    },
    handleMenuOpen(key, keyPath) {
      console.log('handleMenuOpen')
      console.log(key, keyPath)
    },
    getSideBarListJianShu() {
      sideBarListJianShu().then((res) => {
        if (res.data.code === 200) {
          // console.log(res);
          this.totalList = res.data.childs;
        } else {
          this.$message.warning('获取侧边栏数据失败，请重试！')
        }
      })
    },
  },

  beforeRouteEnter(to, from, next) {
    console.log("我从哪里来", to.params.id, from)
    console.log(to, from, next);
    var self = this
    next(vm => {
      vm.isId = to.params.id
    })
  },

  watch: {
    $route(to, from) {
      this.isId = to.params.id
    },
    rowId: function (newValue) {
      this.isCollapse = newValue;
    }
  },

  created() {
    // console.log(this.$route.path, 93)
    // console.log(this.$router.options, 94)
    this.getSideBarListJianShu();
    this.$emit('on-response', this.isCollapse);
  },
}
</script>

<style lang="scss" scoped>
  .el-menu-vertical {
    width: 100%;
  }
</style>
