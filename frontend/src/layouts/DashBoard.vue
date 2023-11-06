<template>
  <div class="dashboard">
    <RouterView name="nav" />
    <body>
      <RouterView />
    </body>
    <RouterView name="foo" />
  </div>
</template>

<script setup></script>

<style scoped></style>
