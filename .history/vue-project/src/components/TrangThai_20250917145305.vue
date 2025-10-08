<script setup>
import {ref} from 'vue'
const message = ref("Bạn chưa có tin nhắn")
const dem = ref()
</script>
<template>
    <h1>Hiển thị tin nhắn</h1>
    <p>{{ message }}</p>
</template>