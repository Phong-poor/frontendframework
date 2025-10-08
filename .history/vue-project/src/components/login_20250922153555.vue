<script setup>
import { ref } from "vue";
const username=ref("");
const password=ref("");
const message=ref("");
const isSuccsess=ref(true);
const handleDangnhap=()=>{
    if(username.value === "")
    if(username.value==="admin" && password.value==="123"){
        message.value="Đăng nhập thành công";
        isSuccsess.value = true;
    }else{
        message.value="Đăng nhập thất bại";
        isSuccsess.value = true;
    }
    alert(message.value);
}
</script>
<template>
    <form action="">
        <input type="text" v-model="username" placeholder="username">
        <input type="text" v-model="password" placeholder="password">
        <input @clic=handleDangnhap() type="button" value="Đăng nhập">
        <span :class="{}"></span>
    </form>
</template>
<style scoped>

</style>