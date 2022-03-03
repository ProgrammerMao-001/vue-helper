<template>
  <div class="public-bgc">
<!--    <span> 仿写：http://192.168.2.106:8080/#/Government/g1/DepartmentChecklist </span>-->
<!--    <span> 双重预防 -> 三张清单管理 -> 检查清单 （绍兴一期 mis7/27） </span>-->
    <div class="center-content">
      <el-button type="warning" icon="el-icon-plus" size="small"> 新增 </el-button>
      <el-button type="danger" icon="el-icon-document-add" size="small"> 导入 </el-button>

      <el-table
        :data="[{ date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }, { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' }]"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "monitor",
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
    },
    mounted() {
    },
  }
</script>

<style lang="scss" scoped>

</style>
