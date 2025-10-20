<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const cart = computed(() => store.getters.cartItems)
const cartTotal = computed(() => store.getters.cartTotal)

const removeItem = (id) => {
    store.commit('REMOVE_FROM_CART', id)
}
const handleDangXuat = () => {
    localStorage.removeItem("currentUser")
    router.push("/login")
}
const goToAdmin = () => {
    if (currentUser && currentUser.role === "admin") {
        router.push("/admin");
    } else {
        alert("Bạn cần tài khoản Admin để truy cập!");
        router.push("/login");
    }
};
const goToUser = () => {
    const user = localStorage.getItem('currentUser')
    if (!user) {
        alert("Bạn cần đăng nhập để truy cập!");
    }else{
        router.push("/thongtincanhan")
    }
};
</script>

<template>
    <main class="page-wrapper">
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
        <div class="container mt-4">
            <h2>🛒 Giỏ hàng của bạn</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Tổng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in cart" :key="item.id">
                            <td>{{ item.name }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ item.price }}</td>
                            <td>{{ item.price * item.quantity }}</td>
                            <td><button class="btn btn-sm btn-danger" @click="removeItem(item.id)">Xóa</button></td>
                        </tr>
                    </tbody>
                </table>
            <p class="fw-bold text-end">Tổng cộng: ${{ cartTotal }}</p>
        </div>
    </main>
</template>
<style scoped>
    
</style>