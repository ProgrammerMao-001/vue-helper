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
              <el-button @click="(isVisible = true), (showText = false)" type="text">部门</el-button>
              <span v-if="showText"> > </span>
              <el-button @click="isVisible = false" v-if="showText" type="text">人员</el-button>
            </div>

            <!-- @description: 左侧组织架构父级 -->

            <div v-show="isVisible" class="table-2">
              <el-table ref="multipleTable" :data="cities" @selection-change="handleSelectionChange" height="100%" style="width: 100%" node-key="id">
                <el-table-column prop="name" label="" align="left">
                  <template slot-scope="scope">
                    <i :class="scope.row.icon" class="iconfont icon_color"></i>
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="right" width="100px">
                  <template slot-scope="scope">
                    <el-button :style="{ color: scope.row.id === isCheckedId ? '#1890FF' : '' }" :id="scope.row.id" :disabled="isClick(scope.row.id)" @click="nextList(scope.row)" size="mini">|<i class="iconfont iconzuzhi" style="margin-left: 2px"></i>下级 </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <!-- @description: 左侧组织架构子级头 -->
            <div v-show="!isVisible" class="table-2">
              <el-table ref="multipleInnerTable" :data="innerCities" @select="selectionRow" @select-all="selectionRowAll" height="100%" style="width: 100%">
                <el-table-column align="center" type="selection" />
                <el-table-column prop="staffName" label="全选" align="left">
                  <template slot-scope="scope">
                    <i :class="scope.row.icon" class="iconfont icon_color"></i>
                    <span>{{ scope.row.staffName }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- @description: 左侧组织架构子级尾 -->
          </div>
        </div>
        <!-- @description:  左侧组织架构部分尾 -->

        <!-- @description:  右侧组织架构部分头 -->
        <div>
          <div>已选：</div>
          <div class="right-body">
            <div class="inner_body">
              <div v-for="(item, index) in checkedText" :key="item.id" class="right-body_inner">
                <i :class="item.icon" class="iconfont icon_color"></i>
                {{ item.name }} {{ item.staffName }}
                <i @click="indexDelete(checkedText, index)" class="el-icon-circle-close inner-icon"></i>
              </div>

              <div v-for="(item, innerIndex) in checkedInnerText" :key="item.staffId" class="right-body_inner">
                <span style="margin-left: 5px">{{ item.res.name }} 人员：{{ item.re.staffName }}</span>
                <i @click="indexInnerDelete(checkedInnerText, innerIndex)" class="el-icon-circle-close inner-icon"></i>
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
  private isVisible = true;
  private input: any = '';
  private showList: any = true;
  private showText: any = false;
  private checkedText: any = [];
  private checkedInnerText: any = [];
  private checkedRoleText: any = [];
  private dataList: any = []; // 暂时代替传入的数据
  private isCheckedId: any = '';

  private cities: any = []; // 展示可选的数据

  // // 角色列表
  // private roleList: any = []; // 展示可选的数据

  private innerCities: any = []; // 展示可选的数据

  // private workType: any = [
  //   {
  //     name: '组织架构',
  //     type: 0,
  //   },
  //   {
  //     name: '角色列表',
  //     type: 1,
  //   },
  // ];

  private arr: any = [];

  private created() {
    // this.getList();
  }

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
    this.dataList = data;
    this.getList();
    const a: any = [];
    setTimeout(() => {
      this.dataList.map((res: any) => {
        this.cities.map((re: any) => {
          if (res.objId === re.id) {
            (this.$refs.multipleTable as any).toggleRowSelection(re, true);
          }
        });
        a.push({
          staffId: res.objId,
          staffName: res.objName,
        });
      });
      this.selectionRowAll(a, undefined);
    }, 100);
    this.visible = true;
  }

  selectionRow(selection: any, row?: any) {
    const selected = selection.length && selection.indexOf(row) !== -1; //为true时选中，为 0 时（false）未选中
    if (selected) {
      this.cities.map((res: any) => {
        res.staffList.map((r: any) => {
          selection.map((re: any) => {
            if (r.staffId === re.staffId) {
              this.arr.push({
                res,
                re,
              });
            }
          });
        });
      });
      this.checkedInnerText = this.unique(this.arr); // 对存储的数组去重后赋值给列表
    } else {
      this.checkedInnerText.forEach((re: any, index: any) => {
        if (row.staffId === re.re.staffId) {
          this.checkedInnerText.splice(index, 1);
        }
      });
    }
  }

  @Watch('checkedInnerText')
  private test(val: any) {
    const arrStroge: any = this.unique(val);
    this.checkedInnerText = arrStroge;
  }

  //表格全选事件
  selectionRowAll(selection: any, row: any) {
    const selected: any = selection.length && selection.indexOf(row) !== -1; //为true时选中，为 0 时（false）未选中
    if (!selected) {
      this.cities.map((res: any) => {
        res.staffList.map((r: any) => {
          selection.map((re: any) => {
            if (r.staffId === re.staffId) {
              this.arr.push({
                res,
                re,
              });
            }
          });
        });
      });
      this.checkedInnerText = this.unique(this.arr); // 对存储的数组去重后赋值给列表
    }
    if (selected === 0) {
      this.checkedInnerText.forEach((re: any, index: any) => {
        this.innerCities.forEach((res: any, innerIndex: any) => {
          if (re.re.staffId === res.staffId) {
            for (let i = 0; i < this.innerCities.length; i++) {
              this.checkedInnerText.splice(index, 1);
            }
          }
        });
      });
    }
  }

  /**
     @description: 判断是否可以点击下级
     @author: cxf
     @update: cxf 2021/7/15 9:35
     **/
  private isClick(id: any) {
    const num: any = this.checkedText.findIndex((item: any) => {
      return item.id === id;
    });

    return num === -1 ? false : true;
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
    this.showText = false;
    this.visible = false;
    this.isVisible = true;
    this.checkedText = [];
    this.checkedInnerText = [];
    this.checkedRoleText = [];
    this.showList = true;
    this.arr = [];
    this.isCheckedId = '';
    (this.$refs.multipleTable as any).clearSelection();
    (this.$refs.multipleInnerTable as any).clearSelection();
    // (this.$refs.multipleRoleTable as any).clearSelection();
    // (this.$refs.workType as any).responseMethod();
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

    this.checkedInnerText.map((re: any) => {
      ListOne.push({
        objId: re.re.staffId,
        objName: re.re.staffName,
        type: 'staff',
      });
    });

    ListTwo = this.uniqueOne(ListOne);

    this.$emit('getCheckChildrenNodeData', ListTwo);
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
        if (arr[i].re.staffId === arr[j].re.staffId || arr[i].re.staffId === undefined || arr[j].re.staffId === undefined) {
          // 第一个等同于第二个，splice方法删除第二个
          arr.splice(j, 1);
          j--;
        }
      }
    }
    return arr;
  }

  /**
     @description: 数组去重
     @author: cxf
     @update: cxf 2021/7/26 16:20
     **/
  public uniqueOne(arr: any) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i].objId === arr[j].objId || arr[i] === undefined || arr[j] === undefined) {
          // 第一个等同于第二个，splice方法删除第二个
          arr.splice(j, 1);
          j--;
        }
      }
    }
    return arr;
  }

  // /**
  //        @description: 下一级选中的值
  //        @author: cxf
  //        @update: cxf 2021/7/12 14:04
  //        **/
  // private handleRoleSelectionChange(val: any) {
  //   this.checkedRoleText = val;
  // }

  // /**
  //        @description: 单选操作
  //        @author: cxf
  //        @update: cxf 2021/7/12 15:11
  //        **/
  // private getCheck(data: any) {
  //   if (data === 0) {
  //     this.showList = true;
  //   }
  //   if (data === 1) {
  //     this.showList = false;
  //   }
  // }

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

  /**
     @description: 对下级已选的数据进行删除
     @author: cxf
     @update: cxf 2021/7/12 15:15
     **/
  private indexInnerDelete(arr: any, index: any) {
    arr.splice(index, 1);
    (this.$refs.multipleInnerTable as any).clearSelection();
    if (arr) {
      arr.forEach((row: any) => {
        (this.$refs.multipleInnerTable as any).toggleRowSelection(row.re);
      });
    } else {
      (this.$refs.multipleInnerTable as any).clearSelection();
    }
    this.$forceUpdate();
  }

  // /**
  //        @description: 对已选的角色数据进行删除
  //        @author: cxf
  //        @update: cxf 2021/7/12 15:15
  //        **/
  // private indexRoleDelete(arr: any, index: any) {
  //   arr.splice(index, 1);
  //   (this.$refs.multipleRoleTable as any).clearSelection();
  //   if (arr) {
  //     arr.forEach((row: any) => {
  //       (this.$refs.multipleRoleTable as any).toggleRowSelection(row);
  //     });
  //   } else {
  //     (this.$refs.multipleRoleTable as any).clearSelection();
  //   }
  //   this.$forceUpdate();
  // }

  private nextList(data: any) {
    this.isCheckedId = data.id;
    setTimeout(() => {
      data.staffList.map((res: any) => {
        this.checkedInnerText.map((re: any) => {
          if (res.staffId === re.re.staffId) {
            (this.$refs.multipleInnerTable as any).toggleRowSelection(re.re, true);
          }
        });
      });
      this.dataList.map((res: any) => {
        this.innerCities.map((re1: any) => {
          if (res.objId === re1.staffId) {
            (this.$refs.multipleInnerTable as any).toggleRowSelection(re1, true);
          }
        });
      });
    }, 100);

    this.showText = true;
    this.innerCities = data.staffList;
    this.isVisible = false;
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
