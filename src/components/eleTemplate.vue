<!-- // todo 公共的side-bare组件，具体使用在 sideBar.vue中 -->
<template>
  <div class="navMenu">

    <label v-for="navMenu in navMenus">
<!--      <router-link :to="{ name: 'elc', params: {id:navMenu.entity.name} }">-->
<!--        <el-menu-item v-if="navMenu.childs==null&&navMenu.entity&&navMenu.entity.state==='ENABLE'"-->
<!--                      :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name"-->
<!--                      :route="navMenu.entity.path">-->
<!--          <i style="color: #f5f6f8" :class="navMenu.entity.icon"></i>-->
<!--          <span slot="title">{{navMenu.entity.alias}}</span>-->
<!--        </el-menu-item>-->
<!--      </router-link>-->
      <!-- todo 注：:index="navMenu.entity.path" 为  :default-active="pathRoute" 获取对应的路由    -->

      <el-menu-item v-if="navMenu.childs==null&&navMenu.entity&&navMenu.entity.state==='ENABLE'"
                    :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.path"
                    :route="navMenu.entity.path">
        <i style="color: #f5f6f8" :class="navMenu.entity.icon"></i>
        <span slot="title">{{navMenu.entity.alias}}</span>
      </el-menu-item>

      <el-submenu v-if="navMenu.childs&&navMenu.entity&&navMenu.entity.state==='ENABLE'"
                  :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.path">
        <template slot="title">
          <i style="color: #f5f6f8" :class="navMenu.entity.icon"></i>
          <span> {{navMenu.entity.alias}}</span>
        </template>
        <NavMenu :navMenus="navMenu.childs"></NavMenu>
      </el-submenu>
    </label>

  </div>
</template>

<script>
  export default {
    name: 'NavMenu',
    props: ['navMenus'],
    data() {
      return {}
    },
    methods: {},
    created() {
    }
  }
</script>

<style lang="scss" scoped>
  a {
    text-decoration: none
  }
</style>


