<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'

    const router = useRouter()
    const username = ref('')
    const password = ref('')
    const message = ref('')
    const isSuccess = ref(false)

    const handleDangNhap = async (e) => {
        e.preventDefault() // tránh reload trang

        if (!username.value) {
            message.value = "Username không được để trống"
            isSuccess.value = false
            return
        }
        if (!password.value) {
            message.value = "Password không được để trống"
            isSuccess.value = false
            return
        }

        try {
            const res = await axios.get(`http://localhost:3001/users?username=${username.value}&password=${password.value}`)
            
            if (res.data.length > 0) {
            const user = res.data[0]

            message.value = "Đăng nhập thành công"
            isSuccess.value = true

            localStorage.setItem("currentUser", JSON.stringify(user))

            router.push("/home")
            } else {
            message.value = "Sai username hoặc password"
            isSuccess.value = false
            }
        } catch (err) {
            console.error(err)
            message.value = "Có lỗi khi đăng nhập"
            isSuccess.value = false
        }
    }
</script>

<template>
    <form>
        <h2>Đăng nhập</h2>
        <div class="group">
            <label>Username</label>
            <input type="text" v-model="username">
        </div>
        <div class="group">
            <label>Password</label>
            <input type="password" v-model="password">
        </div>
        <button value="đăng nhập" @click="handleDangNhap">Đăng nhập</button>
        <p>Bạn chưa có tài khoản ? <router-link to="/signup" class="link">Đăng ký ngay</router-link></p><br>
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
    width: 120px;
    font-weight: 500;
}

form .group input {
    flex: 1;
    padding: 6px;
    font-size: 14px;
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
form p{
    margin-top: 30px;
    text-align: center;
}
form p .link{
    text-decoration: none;
}
.success {
    color: green;
}
.error {
    color: red;
}
</style>