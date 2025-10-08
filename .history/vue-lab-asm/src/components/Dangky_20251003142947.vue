<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()

    // state cho form
    const username = ref('')
    const email = ref('')
    const phone = ref('')
    const birthday = ref('')
    const gender = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const message = ref('')
    const isSuccess = ref(false)

    const handleDangKy = () => {
        // 1. Kiểm tra dữ liệu
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

        // 2. Lấy users cũ trong localStorage (nếu có)
        let users = JSON.parse(localStorage.getItem("users")) || []

        // 3. Kiểm tra trùng username/email
        const existed = users.find(u => u.username === username.value || u.email === email.value)
        if (existed) {
            message.value = "Tài khoản hoặc email đã tồn tại!"
            isSuccess.value = false
            return
        }

        // 4. Lưu user mới
        const newUser = {
            username: username.value,
            email: email.value,
            phone: phone.value,
            birthday: birthday.value,
            gender: gender.value,
            password: password.value
        }

        users.push(newUser)
        localStorage.setItem("users", JSON.stringify(users))

        message.value = "Đăng ký thành công!"
        isSuccess.value = true

        // 5. Chuyển hướng sang trang đăng nhập sau 1s
        setTimeout(() => {
            router.push("/login")
        }, 1000)
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
        <button type="button">Đăng ký</button>
        <br><br>
        <p>Bạn đã có tài khoản ? <router-link to>Đăng nhập ngay</router-link></p>
        <br><br>
        <span :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</span>
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
        margin-left: 175px;
        margin-top: 20px;
        padding: 10px;
        border-radius: 10px;
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