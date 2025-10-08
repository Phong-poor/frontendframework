<script setup>

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
    align-items: center; /* cho label và input thẳng hàng theo chiều dọc */
    margin-top: 15px;
}

form .group label {
    width: 120px;       /* cố định chiều rộng cho label */
    font-weight: 500;
}

form .group input {
    flex: 1;            /* input chiếm hết phần còn lại */
    padding: 6px;
    font-size: 14px;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}
</style>