<script setup>
import { ref } from "vue";
const username=ref("");
const password=ref("");
const message=ref("");
const isSuccsess=ref(true);
const handleDangnhap=()=>{
    if(username.value==="admin" && password.value==="123"){
        message.value="Đăng nhập thành công";
        isSuccsess
    }else{
        message.value="Đăng nhập thất bại";
    }
    alert(message.value);
}
</script>
<template>
    <form action="">
        <input type="text" v-model="username" placeholder="username">
        <input type="text" v-model="password" placeholder="password">
        <input @clic=handleDangnhap() type="button" value="Đăng nhập">
        <span></span>
    </form>
</template>
<style scoped>

</style>