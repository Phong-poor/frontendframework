<script setup>
  import Lab1 from "./components/Lab1.vue";
  import Lab2 from "./components/Lab2.vue";
  import product from "./components/product.vue";
  import Dangnhap from "./components/Dangnhap.vue";

  import { onMounted } from 'vue'
import axios from 'axios'

onMounted(async () => {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"))
  if (currentUser) {
    try {
      const res = await axios.get(`http://localhost:3001/users/${currentUser.id}`)
      if (res.status === 200) {
        // cập nhật localStorage theo dữ liệu mới nhất từ server
        localStorage.setItem("currentUser", JSON.stringify(res.data))
      }
    } catch (err) {
      console.error("Không lấy được user:", err)
    }
  }
})
</script>

<template>
  <!--<product />-->
  <!--<Lab1 />-->
  <!--<Lab2 /> -->
  <RouterView></RouterView>
</template>

<style scoped>

</style>