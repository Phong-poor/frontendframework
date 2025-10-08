<script setup>
import { ref } from "vue";
const username=ref("");
const password=ref("");
const message=ref("");
const isSuccsess=ref(true);
const handleDangnhap=()=>{
    if(username.value === ""){
        message.value = "Username not empty";
    }
    if(password.value === ""){
        message.value = "Password not empty";
    }
    if(username.value==="admin" && password.value==="123"){
        message.value="Đăng nhập thành công";
        isSuccsess.value = true;
    }else{
        message.value="Đăng nhập thất bại";
        isSuccsess.value = false;
    }
    alert(message.value);
}
</script>
<template>
    <form action="">
        <input type="text" v-model="username" placeholder="username"><br><br>
        <input type="text" v-model="password" placeholder="password"><br><br>
        <input @clic=handleDangnhap() type="button" value="Đăng nhập">
        <span :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</span>
    </form>
</template>
<style scoped>
form {
    width: 500px;
    margin: 0 auto;
    border: 2px solid green;
    padding: 20px;
}
form input {
    width: 100%;
    display: block;
    margin-top: 20px;
}

.success {
    color: green;
}

.error {
    color: red;
}
</style>