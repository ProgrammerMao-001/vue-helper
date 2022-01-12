<template>
  <div id="app">
<!--    <router-view/>-->
    <router-view v-wechat-title='$route.meta.title'/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
  *{
    margin: 0;
    padding: 0;
  }
</style>
