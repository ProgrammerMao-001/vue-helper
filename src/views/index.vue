<template>
  <div style="width: 100%;height: 100%">
    <el-amap
      id="container"
      :center='center'
      :zoom='zoom'
    >
<!--      :events="events"-->
      <el-amap-marker
        :position="center"
        :label="label"
      ></el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
  export default {
    name: "index",
    components: {},
    data() {
      return {
        center: [116.397428, 39.90923],
        zoom: 15,
        label: {
          content: '自定义标题',
          offset: [10, 12]
        }
      }
    },
    methods: {
      // 初始化地图
      initMap(map) {
        var map = new AMap.Map("container", {
          zoomEnable: true, //是否禁止缩放
          zoom: 12, //缩放比例
          dragEnable: false,//禁止拖动
          cursor: 'hand' // 鼠标在地图上的表现形式，小手
        });
        // 初始化工具条
        map.plugin(["AMap.ToolBar"], function () {
          map.addControl(new AMap.ToolBar());
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  #container {
    /*width: 300px;*/
    /*height: 180px;*/
    width: 100%;
    height: 100%
  }
</style>
