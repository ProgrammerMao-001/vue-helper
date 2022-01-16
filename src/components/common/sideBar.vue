<template>
  <div class="side-bar">
    <el-container>
      <el-aside style="background-color: rgb(238, 241, 246)">
        <!--左侧菜单组件-->
        <el-menu
          :default-active="isId"
          @select="handleSelect"
          class="el-menu-vertical"
          background-color="#2a5eff"
          text-color="#f5f6f8"
          active-text-color="#fff">
          <NavMenu :navMenus="totalList"></NavMenu>
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
import NavMenu from "../eleTemplate";

export default {
  name: 'sideBar',

  components: {
    NavMenu
  },

  data() {
    return {
      totalList: [],
      isId: "权限管理"
    }
  },

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    getSideBarListJianShu() {
      sideBarListJianShu().then((res) => {
        if (res.data.code === 200) {
          console.log(res);
          this.totalList = res.data.childs;
        } else {
          this.$message.warning('获取侧边栏数据失败，请重试！')
        }
      })
    },
  },

  beforeRouteEnter(to, from, next) {
    console.log("我从哪里来", to.params.id, from)
    var self = this
    next(vm => {
      vm.isId = to.params.id
    })
  },

  watch: {
    $route(to, from) {
      this.isId = to.params.id
    }

  },

  created() {
    this.getSideBarListJianShu();
  },
}
</script>

<style lang="scss" scoped>
  .el-menu-vertical {
    width: 100%;
  }
</style>
