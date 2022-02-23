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
        <div>
          <el-input
            size="small"
            placeholder="输入名称或邮箱搜索"
            v-model="searchInput"
            clearable>
          </el-input>

          <date-range-picker></date-range-picker>

          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

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
        searchInput: '',
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
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
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

      & :first-child {

      }
    }
  }
</style>
