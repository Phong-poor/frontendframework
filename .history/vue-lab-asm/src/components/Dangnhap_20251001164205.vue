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
form .group{
    display: flex;
    justify-content: space;
    margin-top: 10px;
}
form input{
    width: 300px;
    padding: 5px;
}
h2{
    text-align: center;
}
</style>