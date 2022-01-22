<template>
  <div>
    <span> 角色管理 </span>
  </div>
</template>

<script>
  import {roleTableAll, DataAll, getRoleData} from "../../../api/system";

  export default {
    name: "role",
    components: {},
    props: {},
    computed: {},
    filters: {},
    watch: {},
    data() {
      return {}
    },
    methods: {},
    created() {
      DataAll(
        10, 88
      )
        .then((res) => {
        console.log(res)
      });

      getRoleData().then((res)=>{
        console.log(res)
      })
    },
    mounted() {
    },
  }
</script>

<style lang="scss" scoped>

</style>
