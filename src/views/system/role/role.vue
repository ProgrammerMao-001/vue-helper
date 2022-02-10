<template>
  <div style="width: 100%;height: 100%;background-color: #fff">
    <el-row>
      <el-col :span="6">
        <el-input
          style="width: 60%"
          size="small"
          v-model="filterText"
          placeholder="输入部门名称搜索"></el-input>
        <p></p>
        <el-tree
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          ref="tree">
        </el-tree>
      </el-col>

      <el-col :span="18" style="border: 1px solid blue">
        <div class="search-container">
          <el-row>
            <el-col class="public-border" :span="7">
              <el-input size="small" v-model="name" placeholder="输入名称或邮箱搜索"></el-input>
            </el-col>
            <el-col class="public-border" :span="7">
              <date-range-picker v-model="createTime" class="date-item" />
            </el-col>
            <el-col class="public-border" :span="4">10</el-col>
            <el-col class="public-border" :span="3">10</el-col>
            <el-col class="public-border" :span="3">10</el-col>
          </el-row>
        </div>
        <div class="button-group"></div>
        <div class="table-content"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {roleTableAll, DataAll, getRoleData} from '../../../api/system'
  import dateRangePicker from '../../../components/DateRangePicker/dateRangePicker'
  export default {
    name: 'role',
    components: {
      dateRangePicker,
    },
    props: {},
    computed: {},
    filters: {},
    watch: {
      filterText (val) {
        this.$refs.tree.filter(val)
      }
    },
    data () {
      return {
        filterText: '', // 部门名称
        data: [
          {
            id: 1,
            label: '一级 1',
            children: [{
              id: 4,
              label: '二级 1-1',
              children: [{
                id: 9,
                label: '三级 1-1-1'
              }, {
                id: 10,
                label: '三级 1-1-2'
              }]
            }]
          }, {
            id: 2,
            label: '一级 2',
            children: [{
              id: 5,
              label: '二级 2-1'
            }, {
              id: 6,
              label: '二级 2-2'
            }]
          }, {
            id: 3,
            label: '一级 3',
            children: [{
              id: 7,
              label: '二级 3-1'
            }, {
              id: 8,
              label: '二级 3-2'
            }]
          }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        name: '', // 名称或邮箱
        createTime: '',
      }
    },
    methods: {
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      dataAll () {
        DataAll(
          10, 88
        )
          .then((res) => {
            console.log(res)
          })
      },
      getRole () {
        getRoleData().then((res) => {
          console.log(res)
        })
      },
    },
    created () {
      // this.dataAll()
      // this.getRole()
    },
    mounted () {
    },
  }
</script>

<style lang="scss" scoped>
  /*.date-item {*/
  /*  display: inline-block;*/
  /*  vertical-align: middle;*/
  /*  margin-bottom: 10px;*/
  /*  height: 30.5px !important;*/
  /*  width: 230px !important;*/
  /*}*/
</style>
