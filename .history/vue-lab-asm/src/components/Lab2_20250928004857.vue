<script setup>
import { ref } from 'vue'
const username = ref('')
const password = ref('')
const message = ref('')
const isSuccess = ref(false)

const handleDangNhap = () => {
    if (username.value === "") {
        message.value = "Username không được để trống"
    }
    else if (password.value === "") {
        message.value = "Password không được để trống"
    }
    else if (username.value === 'admin' && password.value === '123456') {
        message.value = 'Đăng nhập thành công'
        isSuccess.value = true
    } else {
        message.value = 'Đăng nhập thất bại'
        isSuccess.value = false
    }
}
const handleXuLyDiemTrungBinh = () => {
    if(diem.value == ""){
        message.value = "Chưa có thông tin"
    }
    else if(diem.value > 0 && diem.value < 5){
        message.value = "Xếp loại giỏi"
    }
    else if(diem.value >= 5 && diem.value < 6.4){
        message.value = "Xếp loại trung bình"
    }
    else if(diem.value >= 6.5 && diem.value < 5){
        message.value = "Xếp loại giỏi"
    }
}
</script>
<template>
    <form>
        <h2>Đăng nhập</h2>
        <input type="text" v-model="username" placeholder="Username" />
        <input type="password" v-model="password" placeholder="Password" />
        <input @click="handleDangNhap" type="button" value="đăng nhập" />
        <span :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</span>
    </form>

    <form>
        <h2>Nhập số điểm</h2>
        <input type="text" v-model="diem" placeholder="Nhập số điểm">
    </form>
</template>
<style scoped>
form {
    width: 500px;
    margin: 0 auto;
    border: 2px solid green;
    padding: 20px;
    margin-top: 100px;
}
form input {
    width: 100%;
    display: block;
    margin-top: 20px;
    padding: 10px;
}
h2{
    text-align: center;
}
.success {
    color: green;
}

.error {
    color: red;
}
</style>