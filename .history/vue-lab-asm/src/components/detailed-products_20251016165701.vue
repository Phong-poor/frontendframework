<script setup>

</script>

<template>
    <div class="page-wrapper">
        <header class="py-4 bg-white border-bottom mb-4">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-4">
                <h1 class="h4 mb-0">MyShop</h1>
            </div>
            <div class="col-4 text-center">
                <button class="btn btn-primary" @click="goToAdmin">Quản lý</button>
            </div>
            <div class="col-4 text-end">
                <router-link to="/giohang" class="btn btn-success">Giỏ hàng</router-link>
                <button class="btn btn-success" @click="goToUser">Tài khoản</button>
                <button @click="handleDangXuat" class="btn btn-outline-danger">Đăng xuất</button>
            </div>
            </div>
        </div>
        </header>
    </div>
</template>

<style scoped>

</style>