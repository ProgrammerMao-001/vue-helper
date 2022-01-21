<template>
  <div class="amap-page-container">
    <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
    <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="12" :plugin="plugin" :events="events" class="amap-demo">
      <el-amap-marker v-if="!!marker" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
    </el-amap>
  </div>
</template>
<script>
  import VueAMap from 'vue-amap'
  const amapManager = new VueAMap.AMapManager();
  let Geocoder;
  export default {
    name:'VueMaps',
    data(){
      return{
        amapManager,
        searchOption: {
          city: '全国',
          citylimit: false
        },
        marker:{
          position: [121.329402, 31.228667],
          events: {
            click: (e) => {
              console.log('点击maker',e)
              this.marker = null
            },
            dragend: (e) => {
              console.log('---event---: dragend',e)
              this.marker.position = [e.lnglat.lng, e.lnglat.lat];
            }
          },
          visible: true,
          draggable: false,
          template: '<span>1</span>',
        },
        center: [121.59996, 31.197646],
        events: {
          init: (o) => {
            o.getCity(result => {
              console.log(result)
            })
          },
          'click': (e) => {
            console.log(e)
            if(!!this.marker){
              this.marker.position = [e.lnglat.lng, e.lnglat.lat]
            }else{
              this.marker={
                position: [e.lnglat.lng, e.lnglat.lat],
                events: {
                  click: (e) => {
                    console.log('点击maker',e)
                    this.marker = null
                  },
                  dragend: (e) => {
                    console.log('---event---: dragend',e)
                    this.marker.position = [e.lnglat.lng, e.lnglat.lat];
                  }
                },
                visible: true,
                draggable: false,
                template: '<span>1</span>',
              }
            }
            Geocoder.getAddress([e.lnglat.lng, e.lnglat.lat], function (status, result) { //根据坐标获取位置
              if (status === "complete" && result.info === "OK") {
                document.querySelector(".search-box-wrapper input").value=result.regeocode.formattedAddress
              }
            });
          }
        },
        // 当前地图需要的拓展插件需在该内容下放置  Geocoder为通过坐标获取地址信息
        plugin: [{
          pName: 'Geocoder',
          events: {
            init(o) {
              Geocoder = o
            }
          },
        }
        ]
      }
    },
    methods: {
      //搜索地址 查询结果
      onSearchResult(pois) {
        console.log(pois)
        if(!!pois.length){
          this.marker.position=[pois[0].lng, pois[0].lat]
          this.center = [pois[0].lng, pois[0].lat]
        }
      }
    }
  }
</script>
<style>
  .search-box{
    border: 1px solid #ccc;
    width: 100%;
  }
  .search-box-wrapper{
    width: 100%;
  }
  .amap-page-container{
    width: 500px;
    height: 500px;
    z-index: 999;
  }
  .amap-demo {
    height: 300px;
  }
</style>
