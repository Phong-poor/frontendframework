<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// state cho form
const username = ref('')
const avatar =r
const email = ref('')
const phone = ref('')
const birthday = ref('')
const gender = ref('')
const password = ref('')
const confirmPassword = ref('')
const message = ref('')
const isSuccess = ref(false)

const handleDangKy = async () => {
    if (!username.value || !email.value || !phone.value || !birthday.value || !gender.value || !password.value || !confirmPassword.value) {
        message.value = "Vui lòng nhập đầy đủ thông tin!"
        isSuccess.value = false
        return
    }

    if (password.value !== confirmPassword.value) {
        message.value = "Mật khẩu xác nhận không khớp!"
        isSuccess.value = false
        return
    }

    let users = JSON.parse(localStorage.getItem("users")) || []

    const existed = users.find(u => u.username === username.value || u.email === email.value)
    if (existed) {
        message.value = "Tài khoản hoặc email đã tồn tại!"
        isSuccess.value = false
        return
    }

    const newUser = {
        username: username.value,
        email: email.value,
        phone: phone.value,
        birthday: birthday.value,
        gender: gender.value,
        password: password.value,
        role: 'user'
    }

    try {
        const response = await axios.post('http://localhost:3001/users', newUser)
        if (response.status === 201) {
            users.push(newUser)
            localStorage.setItem("users", JSON.stringify(users))

            message.value = "Đăng ký thành công!"
            isSuccess.value = true

            setTimeout(() => {
                router.push("/login")
            }, 1000)
        }
    } catch (error) {
        console.error(error)
        message.value = "Có lỗi khi kết nối server!"
        isSuccess.value = false
    }
}
</script>

<template>
    <form>
        <h2>Đăng ký</h2>
        <div class="group">
            <label>Username</label>
            <input type="text" v-model="username">
        </div>
        <div class="group">
            <label>Email</label>
            <input type="email" v-model="email">
        </div>
        <div class="group">
            <label>Phone</label>
            <input type="number" v-model="phone">
        </div>
        <div class="group">
            <label>Birthday</label>
            <input type="date" v-model="birthday">
        </div>
        <div class="group">
        <label>Gender</label>
            <div class="gender-options">
                <input type="radio" id="male" name="gender" value="Nam" v-model="gender">
                <label for="male">Nam</label>

                <input type="radio" id="female" name="gender" value="Nữ" v-model="gender">
                <label for="female">Nữ</label>
            </div>
        </div>
        <div class="group">
            <label>Password</label>
            <input type="password" v-model="password">
        </div>
        <div class="group">
            <label>Confirm password</label>
            <input type="password" v-model="confirmPassword">
        </div>
        <div class="form-actions">
            <button type="button" @click="handleDangKy">Đăng ký</button>
            <span :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</span>
        </div>
        <p>Bạn đã có tài khoản ? <router-link to="/login" class="link">Đăng nhập ngay</router-link></p>
    </form>
</template>

<style scoped>
    form {
        width: 500px;
        margin: 0 auto;
        border: 2px solid green;
        padding: 20px;
        margin-top: 100px;
        margin-bottom: 30px;
    }

    form .group {
        display: flex;
        align-items: center;
        margin-top: 15px;
    }

    form .group label {
        width: 150px;
        font-weight: 500;
    }

    form .group input {
        flex: 1;
        padding: 8px 16px;
        font-size: 14px;
        border-radius: 6px;
    }
    .gender-options {
        display: flex;
        gap: 10px;
        margin-top: 5px;
    }

    .gender-options input[type="radio"] {
        display: none;
    }

    .gender-options label {
        padding: 8px 16px;
        border: 2px solid #000000;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 500;
    }

    .gender-options label:hover {
        border-color: #007bff;
        color: #007bff;
    }

    .gender-options input[type="radio"]:checked + label {
        background-color: #007bff;
        color: white;
        border-color: #007bff;
    }
    h2 {
        text-align: center;
        margin-bottom: 20px;
    }
    button{
        margin-top: 20px;
        padding: 10px;
        border-radius: 10px;
    }
    form p{
        margin-top: 30px;
        text-align: center;
    }
    form p .link{
        text-decoration: none;
    }
    .form-actions {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }

    .form-actions span {
        margin-top: 10px;
    }
    .success {
        color: green;
        font-weight: bold;
    }
    .error {
        color: red;
        font-weight: bold;
    }
</style>