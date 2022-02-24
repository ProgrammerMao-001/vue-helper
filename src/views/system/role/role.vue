<template>
  <div class="public-bgc">
    <div class="center-contain">
      <div class="left-content">
        <div>
          <el-input
            size="small"
            placeholder="输入部门名称搜索"
            v-model="filterText">
          </el-input>

          <el-tree
            style="margin-top: 15px;"
            class="filter-tree"
            :data="deptTreeData"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            ref="deptTree">
          </el-tree>
        </div>
      </div>

      <div class="right-content public-border">
        <el-form :model="searchForm" ref="searchForm" :inline="true">
          <el-form-item style="width: 180px;" size="small" label="">
            <el-input v-model="searchForm.blurry" placeholder="请输入名称或者邮箱搜索"></el-input>
          </el-form-item>
          <dateRangePicker style="width: 280px;" v-model="searchForm.createTime"/>
          <el-form-item style="width: 100px;margin-left: 10px;" size="small" label="">
            <el-select v-model="searchForm.enable" placeholder="状态">
              <el-option label="激活" value="true"></el-option>
              <el-option label="锁定" value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small">
            <el-button type="success" icon="el-icon-search" @click="submit"> 搜索</el-button>
            <el-button type="warning" icon="el-icon-refresh-left" @click="reset"> 重置</el-button>
          </el-form-item>
        </el-form>
        <div class="button-group">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {roleTableAll, DataAll, getRoleData} from '@/api/system'
  import dateRangePicker from '@/components/DateRangePicker/dateRangePicker'

  export default {
    name: 'role',
    components: {
      dateRangePicker,
    },
    props: {},
    computed: {},
    filters: {},
    watch: {
      filterText(val) {
        this.$refs.deptTree.filter(val);
      }
    },
    data() {
      return {
        filterText: '',
        deptTreeData: [
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
        searchForm: {
          blurry: '',
          enable: '',
          createTime: '',
        }
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      submit() {
        console.log(this.searchForm);
      },
      reset() {
        this.searchForm = {};
      }
    },
    created() {
    },
    mounted() {
    },
  }
</script>

<style lang="scss" scoped>
  .public-bgc {
    .left-content {
      float: left;
      width: 20%;
      height: 100%;

      div {
        width: 90%;
        margin: 0 auto;
      }
    }

    .right-content {
      float: right;
      width: calc(80% - 10px);
      height: 100%;

      .button-group {
        width: 100%;
      }
    }
  }
</style>
