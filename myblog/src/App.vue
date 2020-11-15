<template>
  <div id="app">
	<router-view>
		<index/>
	</router-view>
  </div>
</template>

<script>
//import Login from './components/Login.vue'
//import regist from './components/regist.vue'
//import Article from './components/article.vue'
import index from './components/index.vue'
export default {
  name: 'App',
  components: {
	index,
	//Article,
  //  Login
  //  regist
	
  }
}
</script>

<style>
  html,body{
    height: 100%;
    width: 100%;
  }
#app {
  height: 100%;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
