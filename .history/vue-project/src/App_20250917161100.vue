<script setup>
  import ThongBao from "./components/TrangThai.vue";
</script>

<template>
  <div class="container">
    <ThongBao />
    <h1>Frontend Framework 2025</h1>
    <ThongBao message="Thông báo mới" />
    <TrangThai />
    <Products :products/>
  </div>
</template> 

<style scoped>
h1{
  color: red;
}
</style>