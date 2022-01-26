<!--
    @description: 树形组件
    @author: 徐泽杭
    @update: 徐泽杭(2021-05-18 17:17:28)
-->

<template>
  <div class="add--user">
    <el-dialog :visible.sync="visible" :before-close="hideDialog" :modal-append-to-body="false" append-to-body width="750px" class="my-dialog-2" title="以下部门和人员可以发起提交">
      <div style="display: flex;justify-content: space-around">
        <!-- @description:  左侧组织架构部分头 -->
        <div style="margin-right: 20px">
          <div>选择：</div>
          <div class="left-body">
            <div style="text-align: center">
              <el-input v-model="input" class="m_input_small" clearable size="small" type="text" />
            </div>

            <div style="padding: 0 10px;">
              <el-button type="text">部门</el-button>
            </div>

            <!-- @description: 左侧组织架构父级 -->

            <div class="table-2">
              <el-table ref="multipleTable" :data="cities" @selection-change="handleSelectionChange" height="100%" style="width: 100%" node-key="id">
                <el-table-column align="center" type="selection" />
                <el-table-column prop="name" label="全选" align="left">
                  <template slot-scope="scope">
                    <i :class="scope.row.icon" class="iconfont icon_color"></i>
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <!-- @description:  左侧组织架构部分尾 -->

        <!-- @description:  右侧组织架构部分头 -->
        <div>
          <div>已选：</div>
          <div class="right-body">
            <div class="inner_body">
              <div v-for="(item, index) in checkedText" :key="item.id" class="right-body_inner">
                <span style="margin-left: 5px">{{ item.name }}</span>
                <i @click="indexDelete(checkedText, index)" class="el-icon-circle-close inner-icon"></i>
              </div>
            </div>
          </div>
        </div>
        <!-- @description:  右侧组织架构部分尾 -->
      </div>

      <div class="footer">
        <el-button @click="close" size="small" round icon="el-icon-close">关闭</el-button>
        <el-button @click="save" size="small" round type="primary" icon="el-icon-finished">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';
import ChangeRadio from '@/components/changeRadio/changeRadio.vue';
import { deptStaffServe } from '@/api/installServer';

@Component({
  components: { ChangeRadio },
})
export default class Tree extends Vue {
  private visible = false;
  private input: any = '';
  private checkedText: any = [];
  private cities: any = []; // 展示可选的数据

  private created() {}

  private mounted() {}

  private getList(val?: any) {
    deptStaffServe
      .getAllDeptStaff({
        name: val ? val : null,
      })
      .then((res: any) => {
        this.cities = res.data.deptList;
      })
      .catch((error: any) => {
        this.$message.error('获取数据失败');
      });
  }

  /**
   * 打开窗口
   */
  private async showDialog(data: any) {
    this.getList();
    if (data) {
      setTimeout(() => {
        data.map((res: any) => {
          this.cities.map((re: any) => {
            if (res.objId === re.id) {
              (this.$refs.multipleTable as any).toggleRowSelection(re, true);
            }
          });
        });
      }, 100);
    }

    this.visible = true;
  }

  /**
   * 关闭窗口
   */
  private hideDialog() {
    this.close();
  }

  /**
   * 【表单】弹窗关闭
   */
  private close() {
    this.visible = false;
    this.checkedText = [];
    (this.$refs.multipleTable as any).clearSelection();
  }

  private save() {
    const ListOne: any = []; // 存储id
    let ListTwo: any = []; // 去重之后的数组
    this.checkedText.map((res: any) => {
      ListOne.push({
        objId: res.id,
        objName: res.name,
        type: 'department',
      });
    });
    ListTwo = this.unique(ListOne);
    this.$emit('getCheckNode', ListTwo);
    this.hideDialog();
  }

  /**
   @description: 选中的值
   @author: cxf
   @update: cxf 2021/7/12 14:04
   **/
  private handleSelectionChange(val: any) {
    this.checkedText = val;
  }

  /**
         @description: 数组去重
         @author: cxf
         @update: cxf 2021/7/26 16:20
         **/
  public unique(arr: any) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] === arr[j] || arr[i] === undefined || arr[j] === undefined) {
          // 第一个等同于第二个，splice方法删除第二个
          arr.splice(j, 1);
          j--;
        }
      }
    }
    return arr;
  }

  /**
   @description: 对已选的数据进行删除
   @author: cxf
   @update: cxf 2021/7/12 15:15
   **/
  private indexDelete(arr: any, index: any) {
    arr.splice(index, 1);
    (this.$refs.multipleTable as any).clearSelection();
    if (arr) {
      arr.forEach((row: any) => {
        (this.$refs.multipleTable as any).toggleRowSelection(row);
      });
    } else {
      (this.$refs.multipleTable as any).clearSelection();
    }
    this.$forceUpdate();
  }

  @Watch('input')
  private searchDept(val: any) {
    this.getList(val);
  }
}
</script>

<style lang="scss" scoped></style>
<style lang="scss">
@import '../../style/variable';

* {
  .my-dialog-2 {
    /**滚动条的宽度*/
    ::-webkit-scrollbar {
      width: 8px;
    }

    /*<!--!/滚动条的轨道*!-->*!*/
    ::-webkit-scrollbar-track {
      background: transparent;
    }

    //滚动条的滑块
    ::-webkit-scrollbar-thumb {
      background: $scrollbar;
      border-radius: 3px;
    }

    .left-body {
      border-radius: 20px;
      background: #f3f6f9;
      padding: 10px;
      width: 320px;
      height: 500px;
      margin-top: 10px;
    }

    .right-body {
      border-radius: 20px;
      background: #f3f6f9;
      padding: 10px;
      width: 320px;
      height: 500px;
      margin-top: 10px;

      .inner_body {
        padding: 10px;
        height: 96%;
        overflow-y: auto;
      }

      .right-body_inner {
        margin: 10px 0;
        line-height: 13px;
        align-items: center;

        .inner-icon {
          float: right;
          cursor: pointer;
        }
      }
    }

    .el-dialog {
      border-radius: 20px;
      background: $secondBackground;

      .el-dialog__body {
        padding-top: 10px;
        padding-bottom: 0;
      }

      .el-dialog__title {
        border-left: 5px solid #4c64fe;
        text-indent: 10px;
        display: inline-block;
        line-height: unset;
        font-size: 16px;
        font-weight: 600;
      }

      .table-2 {
        height: 380px;
        overflow: hidden;

        .el-table::before {
          height: 0;
        }

        .el-table,
        .el-table__expanded-cell {
          background-color: transparent !important;
        }

        .el-table th,
        .el-table tr {
          background-color: transparent !important;
        }

        .el-table tbody tr:hover > td {
          background: transparent;
        }

        .el-button.el-button--mini {
          background: transparent;
          border: none;
        }

        .el-table__body tr,
        .el-table__body td {
          font-size: 14px;
          padding: 0;
          height: 20px !important;
          color: $mainText;
          border: none !important;
        }

        .el-table__header tr,
        .el-table__header th {
          padding: 0;
          height: 20px !important;
          color: $mainText;
          font-size: 14px;
          background-color: transparent !important;
          border: none !important;
        }
      }
    }
  }

  .icon_color {
    color: #4c64fe;
    margin-right: 5px;
  }

  /* 底部按钮区域 */
  .footer {
    height: 80px;
    line-height: 80px;
    max-width: calc(100% - (100% - 1140px) / 2);
    margin: 0 auto;
    text-align: right;
  }
}
</style>
