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
        center: [120.07823, 30.34726], // 100m 内偏差的
        zoom: 15,
        label: {
          content: '当前位置',
          offset: [10, 12]
        }
      }
    },
    methods: {
      qwe() {
        let that = this
        var map = new AMap.Map('container', {
          resizeEnable: true
        });
        AMap.plugin('AMap.Geolocation', function () {
          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：5s
            buttonPosition: 'RB',    //定位按钮的停靠位置
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点

          });
          map.addControl(geolocation);
          geolocation.getCurrentPosition(function (status, result) {
            if (status === 'complete') {
              that.onComplete(result)
            } else {
              that.onError(result)
            }
          });
        });
      },

      //解析定位结果
      onComplete(data) {
        // document.getElementById('status').innerHTML='定位成功'
        var str = [];
        str.push('定位结果：' + data.position);
        str.push('定位类别：' + data.location_type);
        if (data.accuracy) {
          str.push('精度：' + data.accuracy + ' 米');
        }//如为IP精确定位结果则没有精度信息
        str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
        // console.log(str)
        // console.log(data.position)
        this.$set(this.center, 0, data.position.lng)
        this.$set(this.center, 1, data.position.lat)
        // alert('定位成功' + str)
        // document.getElementById('result').innerHTML = str.join('<br>');
      },
      //解析定位错误信息
      onError(data) {
        console.log('定位失败')
        console.log(data.message)
        // alert('定位失败' + data.message)
        // document.getElementById('status').innerHTML='定位失败'
        // document.getElementById('result').innerHTML = '失败原因排查信息:'+data.message;
      },

    },
    mounted() {
      this.qwe();
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
