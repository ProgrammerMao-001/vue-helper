<template>
  <div>
    <span> 过滤器 {{ demo | pledgeFilter }} </span>
    <br>
    <span> 计算属性 {{ adverseDemo }} </span>
    <br>
    <div ref="demoDiv"></div>
    <el-button type="danger" @click="changeDemo"> change demo</el-button>
    <top-bar></top-bar>
  </div>
</template>

<script>
  import topBar from "../../components/common/topBar";

  export default {
    name: "demo",
    components: {topBar},
    props: {},
    computed: {
      adverseDemo() {
          if (this.demo) {
            return 'this is true.'
          } else {
            return 'this is false.'
          }
      }
    }, // 计算属性
    filters: {
      pledgeFilter(flag) {
        return flag ? '是' : '否';
      },
    }, // 过滤器
    watch: {
      // 监听demo值的变化
      demo: function (newData, oldData) {
        this.$refs.demoDiv.innerHTML = oldData + '变成' + newData;
      }
    }, // 监听器
    data() {
      return {
        demo: true,
      }
    },
    methods: {
      changeDemo() {
        this.demo = !this.demo;
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
