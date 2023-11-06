<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <div class="auth-wrapper">
      <div class="auth-inner">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style>
@import './assets/css/main.css';
</style>
