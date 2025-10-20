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
                    <router-link to="/" class="btn btn-primary">Trở lại trang chủ</router-link>
                    </div>
                    <div class="col-4 text-end">
                    <router-link to="/thongtincanhan" class="btn btn-success">Tài khoản</router-link>
                    <button @click="handleDangXuat" class="btn btn-outline-danger">Đăng xuất</button>
                    </div>
                </div>
            </div>
      </header>
    </div>
</template>

<style scoped>

</style>