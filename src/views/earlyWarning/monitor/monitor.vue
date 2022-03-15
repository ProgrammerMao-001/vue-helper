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
        <div class="button-group">
          <el-button type="warning" icon="el-icon-plus" size="small" @click="handleJumpToSameDialog('add', null)"> 新增
          </el-button>
          <el-button type="danger" icon="el-icon-document-add" size="small" @click="onImport"> 导入</el-button>
        </div>
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
              header-align="center"
              align="center"
              type="index"
              :index="indexMethod"
              width="50px"
              label="序号"
            >
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              prop=""
              label="columnLabel"
            >
              <template slot-scope="scope">
                {{ (searchForm.pageNo - 1) * searchForm.pageSize + scope.$index + 1 }}
              </template>
            </el-table-column>
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
              width="148px"
              align="center"
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleJumpToSameDialog('detail', scope.row)"
                           style="margin-right: 5px">详情
                </el-button>
                <el-button type="text" size="small" @click="handleJumpToSameDialog('edit', scope.row)"
                           style="margin-right: 5px">编辑
                </el-button>
                <el-button type="text" size="small"
                           @click="handleTableDeleteBtnClick(scope.row.id)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination-class">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="searchForm.pageNo"
            :page-sizes="[10, 20, 30, 40, 50, 100]"
            :page-size="searchForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <same-dialog ref="sameDialog" :rowId="rowId" @getData="getPcList"/>
    <!-- 1.todo ref：为了在父组件中注册弹窗 -->
    <!-- 2.todo rowId：为了传一行的值给弹窗  -->
    <!-- 3.todo @getData: 自定义getData事件，将父组件的getPcList()传给子组件，子组件用this.$emit接收 -->
  </div>
</template>

<script>
  import {getPcList, getTypeChecklist, pcDelete} from "../../../api/earlyWarning-monitor";
  import sameDialog from "./unit/sameDialog";

  export default {
    name: "monitor",
    components: {sameDialog},
    props: {},
    computed: {},
    filters: {},
    watch: {},
    data() {
      return {
        rowId: {}, // 父组件传给弹窗的数据
        total: 0,
        tableData: [],
        searchForm: {
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
        this.searchForm.pageNo = 1;
        this.searchForm.pageSize = 10;
        this.getPcList();
      },
      onReset() {
        this.searchForm = {
          hiddenDangerType: '',
          hiddenDangerLevel: '',
        }
        this.searchForm.pageNo = 1;
        this.searchForm.pageSize = 10;
        this.getPcList();
        console.log(this.searchForm.pageNo, this.searchForm.pageSize)
      },
      onImport() {
        console.log('导入')
      },
      handleTableDeleteBtnClick(data) {
        this.$confirm('此操作将永久删除该行数据，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          pcDelete(data).then((res) => {
            console.log(res)
            if (res.data.code === '200') {
              this.$message.success('删除成功！');
              this.getPcList();
            } else {
              this.$message.error('删除失败！');
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
      handleSizeChange(pageSize) {
        this.searchForm.pageSize = pageSize;
        // this.searchForm.pageNo = 2;
        this.getPcList();
      },
      handleCurrentChange(pageNo) {
        this.searchForm.pageNo = pageNo;
        this.getPcList();
      },
      getTypeChecklist() {
        getTypeChecklist(

        ).then((res) => {
          this.hiddenDangerTypeList = res.data.data;
        })
      },
      getPcList() {
        getPcList(
          {
            pageNo: this.searchForm.pageNo,
            pageSize: this.searchForm.pageSize,
            hiddenDangerType: this.searchForm.hiddenDangerType ? this.searchForm.hiddenDangerType : null,
            hiddenDangerLevel: this.searchForm.hiddenDangerLevel ? this.searchForm.hiddenDangerLevel : null,
            // ...this.searchForm
          }
        ).then((res) => {
          if (res.data.code === '200') {
            this.tableData = res.data.data;
            this.total = res.data.page.total
          } else {
            this.$message.warning('获取数据失败！');
          }
        })
      },
      //序号Index 翻页递增  pageNo 当前页, pageSize 当前页显示条数
      indexMethod(index) {
        return (this.searchForm.pageNo - 1) * this.searchForm.pageSize + index + 1;
      },
      handleJumpToSameDialog(type, data) {
        // console.log(type, data)
        this.$set(this.rowId, 'type', type);
        this.$set(this.rowId, 'data', data);
        // console.log(this.rowId)
        const sameDialog = 'sameDialog';
        const sameDialogComponent = this.$refs[sameDialog];
        sameDialogComponent.showDialog();
      },
    },
    created() {
    },
    mounted() {
      this.getTypeChecklist()
      this.getPcList()
    },
  }
</script>

<style lang="scss" scoped>
  .pagination-class {
    float: right;
    padding: 20px 0;
  }

  .button-group {
    padding: 0 0 20px 18px;
  }
</style>
