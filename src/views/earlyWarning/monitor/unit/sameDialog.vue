<!-- 详情、编辑、新增页面的弹窗 -->
<template>
  <el-dialog
    ref="sameDialog"
    :title="onChangeTitle"
    :visible.sync="dialogVisible"
    width="80%"
  >
    <div class="sameDialog-class">
      <el-form ref="form" :model="formData" label-width="180px">
        <el-row>
          <el-col :span="12">
            <el-form-item v-show="title!=='detail'" size="small" label="行业">
              <el-select v-model="formData.hiddenDangerType" placeholder="请选择行业">
                <el-option
                  v-for="item in hiddenDangerTypeList"
                  :key="item.entIndustry"
                  :label="item.entIndustry"
                  :value="item.entIndustry">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item v-show="title==='detail'" label="行业">
              <div class="font-class"> {{ formData.hiddenDangerType }}</div>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item v-show="title!=='detail'" size="small" label="类型">
              <el-select v-model="formData.entType" placeholder="请选择类型">
                <el-option
                  v-for="item in entTypeList"
                  :key="item.entIndustry"
                  :label="item.entIndustry"
                  :value="item.entIndustry">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item v-show="title==='detail'" label="类型">
              <div class="font-class"> {{ formData.entType }}</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item v-show="title!=='detail'" size="small" label="重点场所环节">
              <el-input v-model="formData.keyPlacesLinks" placeholder="请填写重点场所环节"></el-input>
            </el-form-item>

            <el-form-item v-show="title==='detail'" label="重点场所环节">
              <div class="font-class"> {{ formData.keyPlacesLinks }}</div>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item v-show="title!=='detail'" size="small" label="危险有害因素分类">
              <el-input v-model="formData.riskFactorClassification" placeholder="请填写危险有害因素分类"></el-input>
            </el-form-item>

            <el-form-item v-show="title==='detail'" label="危险有害因素分类">
              <div class="font-class"> {{ formData.riskFactorClassification }}</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item v-show="title!=='detail'" size="small" label="隐患类型（大类）">
              <el-input v-model="formData.hiddenDangerLevelGeneralCategory" placeholder="请填写隐患类型（大类）"></el-input>
            </el-form-item>

            <el-form-item v-show="title==='detail'" label="隐患类型（大类）">
              <div class="font-class"> {{ formData.hiddenDangerLevelGeneralCategory }}</div>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item v-show="title!=='detail'" size="small" label="隐患类型（小类）">
              <el-input v-model="formData.hiddenDangerLevelSubclass" placeholder="请填写隐患类型（小类）"></el-input>
            </el-form-item>

            <el-form-item v-show="title==='detail'" label="隐患类型（小类）">
              <div class="font-class"> {{ formData.hiddenDangerLevelSubclass }}</div>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="12">
            <el-form-item v-show="title!=='detail'" size="small" label="隐患等级">
              <el-select v-model="formData.hiddenDangerLevel" placeholder="请选择隐患等级">
                <el-option
                  v-for="item in hiddenDangerLevelList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item v-show="title==='detail'" label="隐患等级">
              <div class="font-class"> {{ formData.hiddenDangerLevel }}</div>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item v-show="title!=='detail'" size="small" label="主要事故类型">
              <el-input v-model="formData.mainAccidentTypes" placeholder="请填写主要事故类型"></el-input>
            </el-form-item>

            <el-form-item v-show="title==='detail'" label="主要事故类型">
              <div class="font-class"> {{ formData.mainAccidentTypes }}</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item v-show="title!=='detail'" label="整改时限" size="small">
              <el-select v-model="formData.rectificationTimeLimit" placeholder="请选择整改时限">
                <el-option
                  v-for="item in rectificationTimeLimitList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item v-show="title==='detail'" label="整改时限">
              <div class="font-class"> {{ formData.rectificationTimeLimit }}</div>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item v-show="title!=='detail'" label="关键词" size="small">
              <el-input v-model="formData.keyWord" placeholder="请填写关键词"></el-input>
            </el-form-item>

            <el-form-item v-show="title==='detail'" label="关键词">
              <div class="font-class"> {{ formData.keyWord }}</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item v-show="title!=='detail'" label="检查清单" size="small">
              <el-input type="textarea" v-model="formData.hiddenDangerContent" placeholder="请填写检查清单"></el-input>
            </el-form-item>

            <el-form-item v-show="title==='detail'" label="检查清单">
              <div class="font-class"> {{ formData.hiddenDangerContent }}</div>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item v-show="title!=='detail'" label="法律依据" size="small">
              <el-input type="textarea" v-model="formData.legalBasis" placeholder="请填写法律依据"></el-input>
            </el-form-item>

            <el-form-item v-show="title==='detail'" label="法律依据">
              <div class="font-class"> {{ formData.legalBasis }}</div>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button v-show="title !== 'detail'" type="primary" size="small" @click="handleClose(title)"> 确 定 </el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {getDetail, getIndustry, getTypeChecklist, pcAdd, pcUpdate} from "../../../../api/earlyWarning-monitor";

  export default {
    name: "sameDialog",
    props: {
      rowId: {
        type: Object,
        required: true,
        // default: () => {
        //   return ''
        // }
      }
    },
    computed: {
      onChangeTitle() {
        return this.title === 'edit' ? '编辑' : this.title === 'add' ? '新增' : '详情';
      }
    },
    data() {
      return {
        title: '',
        dialogVisible: false,
        formData: {
          hiddenDangerType: '', // 行业
          entType: '', // 类型
          keyPlacesLinks: '', // 重点场所环节
          riskFactorClassification: '', // 危险有害因素分类
          hiddenDangerLevelGeneralCategory: '', // 隐患类型（大类）
          hiddenDangerLevelSubclass: '', // 隐患类型（小类）
          mainAccidentTypes: '', // 主要事故类型
          hiddenDangerLevel: '', // 隐患等级
          keyWord: '', // 关键词
          rectificationTimeLimit: '', // 整改时限
          hiddenDangerContent: '', // 检查清单
          legalBasis: '', // 法律依据
        },
        hiddenDangerTypeList: [],
        entTypeList: [],
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
        rectificationTimeLimitList: [
          {
            value: '3',
            label: '3天',
          },
          {
            value: '7',
            label: '7天',
          },
          {
            value: '15',
            label: '15天',
          },
          {
            value: '30',
            label: '30天',
          },
          {
            value: '90',
            label: '90天',
          },
          {
            value: '120',
            label: '120天',
          },
          {
            value: '180',
            label: '180天',
          },
          {
            value: '270',
            label: '270天',
          },
          {
            value: '360',
            label: '360天',
          },
        ],
      }
    },
    methods: {
      showDialog() {
        this.getHiddenDangerTypeList();
        this.getEntTypeList();
        // console.log(this.rowId);
        this.dialogVisible = true;
        this.title = this.rowId.type;
        if (this.title === 'add') {
          this.formData = {
            hiddenDangerType: '', // 行业
            entType: '', // 类型
            keyPlacesLinks: '', // 重点场所环节
            riskFactorClassification: '', // 危险有害因素分类
            hiddenDangerLevelGeneralCategory: '', // 隐患类型（大类）
            hiddenDangerLevelSubclass: '', // 隐患类型（小类）
            mainAccidentTypes: '', // 主要事故类型
            hiddenDangerLevel: '', // 隐患等级
            keyWord: '', // 关键词
            rectificationTimeLimit: '', // 整改时限
            hiddenDangerContent: '', // 检查清单
            legalBasis: '', // 法律依据
          };
        } else {
          this.getDetail();
          // this.formData = this.rowId.data; // 静态的
        }
      },
      handleClose(type) {
        if (type === 'add') {
          pcAdd(this.formData).then((res) => {
            if (res.data.code === '200') {
              this.$message.success('添加成功！');
              this.$emit('getData');
            } else {
              this.$message.warning(res.data.code);
            }
          })
        } else if (type === 'edit') {
          pcUpdate(this.formData).then((res) => {
            if (res.data.code === '200') {
              this.$message.success('编辑成功！');
              this.$emit('getData');
            } else {
              this.$message.error('编辑失败！');
            }
            console.log(res)
          })
        }
        this.dialogVisible = false;
      },
      getHiddenDangerTypeList() {
        getIndustry().then((res) => {
          if (res.data.code === '200') {
            this.hiddenDangerTypeList = res.data.data;
          } else {
            this.$message.warning('获取行业数据失败！')
          }
        })
      },
      getEntTypeList() {
        getTypeChecklist().then((res) => {
          if (res.data.code === '200') {
            this.entTypeList = res.data.data
          } else {
            this.$message.warning('获取隐患类型数据失败！')
          }
        })
      },
      getDetail() {
        getDetail(this.rowId.data.id).then((res) => {
          this.formData = res.data.data;
        })
      },
    },
    created() {
    },
    mounted() {
    },
  }
</script>

<style lang="scss" scoped>
  .sameDialog-class {
    .el-select {
      width: 100% !important;
    }

    .font-class {
      color: #909399;
    }
  }
</style>
