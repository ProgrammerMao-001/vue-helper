<!-- // todo 这个是顶部栏 -->
<template>
  <div class="top-bar">
    <div class="top-bar-left">
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="输入关键字查询"
        @select="handleSelect">
        <i
          class="el-icon-search"
          slot="prefix">
        </i>
      </el-autocomplete>
    </div>

    <div class="top-bar-right">
      <i class="el-icon-setting font-style"></i>
      <i class="el-icon-message font-style"></i>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <span style="color: #333"> {{ userName }} </span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <div class="head-pic"></div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="backIndex" icon="el-icon-position"> 返回主页</el-dropdown-item>
          <el-dropdown-item command="editLogin" icon="el-icon-back" divided> 退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import {topBarSearch} from "../../api/menuList";

  export default {
    name: "topBar",
    data() {
      return {
        userName: "UserName",
        restaurants: [],
        state: '',
        timeout: null
      };
    },
    methods: {
      loadAll() {
        topBarSearch().then((res) => {
          if (res.status === 200) {
            this.restaurants = res.data;
          } else {
            this.$message.warning('获取顶部搜索栏数据失败，请重试！')
          }
        })
      },
      /*
      * todo 这些都是 elementUi里面的
      * todo 得改 querySearchAsync、createStateFilter、handleSelect
      * */
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      handleCommand(command) {
        if (command === 'backIndex') {
          this.$message.success('返回主页成功！')
          this.$router.push('/home')
        } else {
          this.$message.success('成功退出账号！')
        }
      },
    },
    mounted() {
      this.loadAll();
    }
  }
</script>

<style lang="scss" scoped>
  .top-bar {
    .top-bar-left {
      float: left;
    }

    .top-bar-right {
      margin-top: 4px;
      float: right;

      .font-style {
        font-size: 18px !important;
        cursor: pointer;
        &:hover {
          color: #2a5eff !important;
        }
        &:nth-child(2) {
          padding: 0 60px 0 12px;
        }
      }

      .el-dropdown {
        position: relative;
        .head-pic {
          position: absolute;
          top: 10px;
          margin-left: -40px;
          float: left;
          width: 32px;
          height: 32px;
          border-radius: 50px;
          background-image: url('../../assets/img/headPic.jpg');
          background-size: 100%;
        }
      }
    }
  }
  /*.el-dropdown-menu__item {*/
  /*  border: 1px solid red;*/

  /*}*/
</style>
