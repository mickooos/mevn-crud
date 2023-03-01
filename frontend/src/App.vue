<template>
  <div id="app">
    <NavBar />
    <div class="auth-wrapper">
      <div class="auth-inner">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: 'App',
  components: {
    NavBar,
  }
}
</script>

<style>
@import "./assets/css/main.css";;
</style>
