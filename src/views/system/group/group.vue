<template>
  <div>
    <span> 分组管理 </span>
    <el-button class="filter_button" size="medium" @click="download">模板下载</el-button>

  </div>
</template>

<script>
  export default {
    name: "group",
    components: {},
    props: {},
    computed: {},
    filters: {},
    watch: {},
    data() {
      return {}
    },
    methods: {
      // 模板下载
      download() {
        // window.location.href = `${location.origin}/file/事故数据导入模板.xls`;
      }
    },
    created() {
    },
    mounted() {
    },
  }
</script>

<style lang="scss" scoped>

</style>
