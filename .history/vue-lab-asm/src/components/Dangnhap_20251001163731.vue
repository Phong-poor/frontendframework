<script setup>

</script>

<template>
    <form>
        <h2>Đăng nhập</h2>
        <label>Username</label>
        <input type="text" v-model="username">
        <label>Password</label>
        <input type="text" v-model="password">
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
</style>