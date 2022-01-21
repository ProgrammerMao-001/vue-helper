<!-- // todo 这个是 历史记录栏，可新增和删除 -->
<template>
  <div class="tabs-view-container">
    <router-link class="tags-view-item"
                 :class="isActive(tag) ? 'active' : '' "
                 v-for="(tag, index) in visitedTabsView"
                 :to="tag.path" :key="index"
    >
      <el-tag
        v-if="tag.name==='study-code'"
        :disable-transitions="false"
        @close.prevent.stop="handleClose(tag)"
        effect="plain">
        {{tag.name}}
      </el-tag>
      <el-tag
        v-else
        closable
        :disable-transitions="false"
        @close.prevent.stop="handleClose(tag)"
        effect="plain">
        {{tag.name}}
      </el-tag>
    </router-link>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: "historyPage",
    data() {
      return {}
    },
    created() {
      this.addTabsView()
    },
    computed: {
      ...mapGetters([
        'visitedTabsView'
      ])
    },
    methods: {
      ...mapActions([
        'addVisitedTabsView',
        'delVisitedTabsView'
      ]),
      addTabsView() {
        const route = this.generateRoute()
        if (!route) {
          return false
        }
        this.addVisitedTabsView(this.generateRoute())
      },
      generateRoute() {
        if (this.$route.name) {
          return this.$route
        }
        return false
      },
      isActive(route) {
        return route.path === this.$route.path || route.name === this.$route.name
      },
      handleClose(tag) {
        this.delVisitedTabsView(tag).then((tags) => {
          // 如果关闭的是当前显示的页面，就去到前一个 tab-view 页面
          if (this.isActive(tag)) {
            const lastTag = tags.slice(-1)[0]
            // 前一个 tab-view 页面存在，就跳；不存在就到首页
            if (lastTag) {
              this.$router.push(lastTag.path)
            } else {
              this.$router.push('/')
            }
          }
        })
      }
    },
    watch: {
      $route() {
        // console.log(this.$route)
        this.addTabsView()
      }
    }
  }
</script>

<style lang="scss" scoped>

  //滚动条的宽度
  ::-webkit-scrollbar {
    width: 2px;
    height: 2px;
  }
</style>
