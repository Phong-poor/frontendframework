<script setup>
import Sidebar from "./components/Sidebar.vue";
import MainContent from "./components/MainContent.vue";
</script>

<template>
  <div class="cv-container">
    <Sidebar />
    <MainContent />
  </div>
</template>
<style>
template{
  margin: 0;
}
.cv-container {
  display: flex;
  font-family: Arial, sans-serif;
  background: #f4f4f4;
  min-height: 100vh;
}
</style>