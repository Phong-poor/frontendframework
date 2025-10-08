<script setup>
import {ref} from 'vue'
const message = ref("Bạn chưa có tin nhắn")
const dem = ref(0)

const changeMessage = () => {
    message.value = "Đã đổi thông tin"
}
const handleTang = () => {
    dem.value++
}
const handleGiam = () => {
    dem.value--
}
</script>
<template>
    <h1>Hiển thị tin nhắn</h1>
    <p>{{ message }}</p>
    <p class="dem">{{ dem }}</p>
    <button @click="changeMessage">Thay đổi thông tin</button>
    <button @click="handleTang">Tăng số</button>
    <button @click="handleGiam">Giảm số</button>
</template>
<style scoped>
.dem{
    font-size: 40px;
    
}
</style>