<template>
  <div class="public-bgc">
    <!--    <span> 仿写：http://192.168.2.106:8080/#/Government/g1/DepartmentChecklist </span>-->
    <!--    <span> 双重预防 -> 三张清单管理 -> 检查清单 （绍兴一期 mis7/27） </span>-->
    <div class="center-contain">
      <div class="center-box">
        <el-form :inline="true" ref="searchForm" :model="searchForm" label-width="100px">
          <el-form-item label="隐患类型：">
            <el-select size="small" v-model="searchForm.hiddenDangerType">
              <el-option
                v-for="item in hiddenDangerTypeList"
                :key="item.entIndustry"
                :label="item.entIndustry"
                :value="item.entIndustry">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="隐患级别：">
            <el-select size="small" v-model="searchForm.hiddenDangerLevel">
              <el-option
                v-for="item in hiddenDangerLevelList"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button size="small" type="primary" @click="onSearchForm"> 查询</el-button>
            <el-button size="small" @click="onReset"> 重置</el-button>
          </el-form-item>
        </el-form>
        <el-button type="warning" icon="el-icon-plus" size="small" @click="onAdd"> 新增</el-button>
        <el-button type="danger" icon="el-icon-document-add" size="small" @click="onImport"> 导入</el-button>
        <el-table
          border
          ref="multipleTable"
          tooltip-effect="dark"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            align="center"
            label="工矿领域企业安全隐患分类"
          >
            <el-table-column
              align="center"
              prop="hiddenDangerType"
              label="行业">
            </el-table-column>
            <el-table-column
              align="center"
              prop="entType"
              label="类型">
            </el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="hiddenDangerContent"
              label="检查清单">
            </el-table-column>
            <el-table-column
              align="center"
              prop="keyPlacesLinks"
              label="重点场所环节">
            </el-table-column>
            <el-table-column
              align="center"
              prop="riskFactorClassification"
              label="危险有害因素分类">
            </el-table-column>
            <el-table-column
              align="center"
              prop="hiddenDangerLevelGeneralCategory"
              label="隐患类型（大类）">
            </el-table-column>
            <el-table-column
              align="center"
              prop="hiddenDangerLevelSubclass"
              label="隐患类型（小类）">
            </el-table-column>
            <el-table-column
              align="center"
              prop="hiddenDangerLevel"
              label="隐患等级">
            </el-table-column>
            <el-table-column
              align="center"
              prop="mainAccidentTypes"
              label="主要事故类型">
            </el-table-column>
            <el-table-column
              align="center"
              prop="rectificationTimeLimit"
              label="整改时限">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.rectificationTimeLimit === '0' || scope.row.rectificationTimeLimit === 0">立即整改</span>
                <span v-else>{{scope.row.rectificationTimeLimit ? scope.row.rectificationTimeLimit + '天' : ''}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="keyWord"
              label="关键词">
            </el-table-column>
            <el-table-column
              align="center"
              prop="legalBasis"
              show-overflow-tooltip
              label="法律依据">
            </el-table-column>
            <el-table-column
              align="center"
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClickDetails(scope.row)"
                           style="margin-right: 10px">详情
                </el-button>
                <el-button type="text" size="small" @click="handleClickAdd('edit', scope.row)"
                           style="margin-right: 10px">编辑
                </el-button>
                <el-button type="text" size="small"
                           @click="handleTableDeleteBtnClick(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div>
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[10, 20, 30, 40, 50, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="searchForm.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getTypeChecklist } from "../../../api/earlyWarning-monitor";
  export default {
    name: "monitor",
    components: {},
    props: {},
    computed: {},
    filters: {},
    watch: {},
    data() {
      return {
        tableData: [],
        searchForm: {
          total: 0,
          pageNo: 1,
          pageSize: 10,
          hiddenDangerType: '', // 隐患类型
          hiddenDangerLevel: '', // 隐患级别
        },
        hiddenDangerTypeList: [],
        hiddenDangerLevelList: [
          {
            name: '一般隐患',
          },
          {
            name: '较大隐患',
          },
          {
            name: '重大隐患',
          }
        ],
      }
    },
    methods: {
      onSearchForm() {
        console.log('查询')
      },
      onReset() {
        console.log('重置')
      },
      onAdd() {
        console.log('新增')
      },
      onImport() {
        console.log('导入')
      },
      handleClickDetails() {
        console.log('详情')
      },
      handleClickAdd() {
        console.log('编辑')
      },
      handleTableDeleteBtnClick() {
        console.log('删除')
      },
      handleSizeChange(pageSize) {
        this.searchForm.pageNo = 1;
        this.searchForm.pageSize = pageSize;
        this.getData();
      },
      handleCurrentChange(pageNo) {
        this.searchForm.pageNo = pageNo;
        this.getData();
      },
      getData() {
        console.log('getData');
      },
      getTypeChecklist() {
        getTypeChecklist().then((res) => {
          this.hiddenDangerTypeList = res.data.data;
        })
      },
    },
    created() {

    },
    mounted() {
      this.getTypeChecklist()
    },

  }
</script>

<style lang="scss" scoped>

</style>
