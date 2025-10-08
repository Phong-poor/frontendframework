<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const username = ref('')
    const password = ref('')
    const message = ref('')
    const isSuccess = ref(false)

    const handleDangNhap = () => {
        if (username.value === "") {
            message.value = "username not empty"
        }
        else if (password.value === "") {
            message.value = "password not empty"
        }
        else if (username.value === 'admin' && password.value === '123456') {
            message.value = 'Đăng nhập thành công'
            isSuccess.value = true
            localStorage.setItem('currentUser', JSON.stringify({
                username: 'admin',
                role: 'admin'
            }) )
            router.push('/')
        }
        else if (username.value === 'user' && password.value === '123456') {
            message.value = 'Đăng nhập thành công'
            isSuccess.value = true
            localStorage.setItem('currentUser', JSON.stringify({
                username: 'admin',
                role: 'user'
            }) )
            router.push('/')
        }
        else {
            message.value = 'Đăng nhập thất bại'
            isSuccess.value = false
        }
    }
</script>

<template>
    <form>
        <h2>Đăng nhập</h2>
        <div class="group">
            <label>Username</label>
            <input type="text" v-model="username"><br>
        </div>
        <div class="group">
            <label>Password</label>
            <input type="text" v-model="password">
        </div>
        <button value="đăng nhập">Đăng nhập</button>
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
</style>