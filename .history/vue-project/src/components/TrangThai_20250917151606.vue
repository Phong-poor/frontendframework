<script setup>
import {ref} from 'vue'
const message = ref("Bạn chưa có tin nhắn")
const dem = ref(0)
const tuoi = ref(0)

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
    <p v-if="tuoi<12">Học cấp 1</p>
    <p v-else-if="tuoi<16">Học cấp 2</p>
    <p v-else-if="tuoi<19">Học cấp 3</p>
    <p v-else>Đã tốt nghiệp</p>
</template>
<style scoped>
.dem{
    font-size: 40px;
    font-weight: bold;
    color: red;
    text-align: center;
}
</style>