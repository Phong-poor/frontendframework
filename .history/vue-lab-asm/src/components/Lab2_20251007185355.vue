<script setup>
import { ref, reactive } from 'vue'
const username = ref('')
const password = ref('')
const message = ref('')
const diem = ref('')
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
const handleXuLyDiemTrungBinh = () => {
    if(diem.value == ""){
        notification.value = "Chưa có thông tin"
    }
    else if(diem.value > 0 && diem.value < 5){
        notification.value = "Xếp loại yếu"
    }
    else if(diem.value >= 5 && diem.value < 6.5){
        notification.value = "Xếp loại trung bình"
    }
    else if(diem.value >= 6.5 && diem.value < 8){
        notification.value = "Xếp loại khá"
    }
    else if(diem.value >= 8 && diem.value < 9){
        notification.value = "Xếp loại giỏi"
    }
    else if(diem.value >= 9 && diem.value <= 10){
        notification.value = "Xếp loại xuất xắc"
    }
    else if(diem.value > 10){
        notification.value = "Điểm trung bình phải nhỏ hơn 10"
    }
}

const quantity = ref(0)

const increase = () => quantity.value++
const decrease = () => {
  if (quantity.value > 0) quantity.value--
}

const user = reactive({
    name: '',
    age: null,
    email: ''
})

const updateInfo = () => {
    if (!user.name || !user.email || user.age <= 0) {
        alert('Vui lòng nhập thông tin hợp lệ!')
        return
    }
    alert('Cập nhật thành công!')
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
        <input type="number" v-model="diem" @input="handleXuLyDiemTrungBinh"  placeholder="Nhập số điểm">
        <span>{{ notification }}</span>
    </form>

    <div class="Giohang">
        <h2>Giỏ hàng</h2>
        <p>Số lượng sản phẩm: {{ quantity }}</p>
        <div class="button">
            <button @click="decrease">-</button>
            <button @click="increase">+</button>
        </div>
    </div>

    <div class="thongtinnguoidung">
        <h2>Thông tin người dùng</h2>
        <form @submit.prevent="updateInfo">
            <input v-model="user.name" placeholder="Tên" />
            <input v-model.number="user.age" type="number" placeholder="Tuổi" />
            <input v-model="user.email" type="email" placeholder="Email" />
            <button type="submit">Cập nhật</button>
        </form>
        <div class="thongtin">
            <p>Tên: {{ user.name }}</p>
            <p>Tuổi: {{ user.age }}</p>
            <p>Email: {{ user.email }}</p>
        </div>
    </div>
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
form h2{
    text-align: center;
}
.success {
    color: green;
}

.error {
    color: red;
}
.Giohang{
    border: 2px solid black;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    width: 500px;
}
.Giohang h2{
    text-align: center;
}
.Giohang p{
    text-align: center;
}
.Giohang button{
    width: 50px;
    margin-right: 10px;
}
.Giohang .button{
    display: flex;
    justify-content: center;
}
.thongtinnguoidung h2{
    text-align: center;
}
.thongtinnguoidung .thongtin{
    ma
}
</style>