<script setup>
import { ref } from 'vue'
const username = ref('')
const password = ref('')
const message = ref('')
const notification = ref('')
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
watch(diem, (newVal) => {
  if (newVal === "") {
    notification.value = "Chưa có thông tin"
  } else if (newVal > 0 && newVal < 5) {
    notification.value = "Xếp loại yếu"
  } else if (newVal >= 5 && newVal < 6.5) {
    notification.value = "Xếp loại trung bình"
  } else if (newVal >= 6.5 && newVal < 8) {
    notification.value = "Xếp loại khá"
  } else if (newVal >= 8 && newVal < 9) {
    notification.value = "Xếp loại giỏi"
  } else if (newVal >= 9 && newVal <= 10) {
    notification.value = "Xếp loại xuất sắc"
  } else if (newVal > 10) {
    notification.value = "Điểm trung bình phải nhỏ hơn 10"
  }
})
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
        <input @click="handleXuLyDiemTrungBinh" type="button" value="đăng nhập" />
        <span>{{ notification }}</span>
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