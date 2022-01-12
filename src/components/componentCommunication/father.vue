<template>
  <div class="father">
    father
    <el-button type="primary">buttonCont</el-button>
  </div>
</template>

<script>
    export default {
      name: "father",
      data() {
        const validatePassword = (rule, value, callback) => {
          if (value.length < 2) {
            callback(new Error('密码不能少于6位'))
          } else {
            callback()
          }
        }
        return {

        }
      },
      created() {},
      mounted() {},
      methods: {},
    }
</script>

<style scoped>

</style>
