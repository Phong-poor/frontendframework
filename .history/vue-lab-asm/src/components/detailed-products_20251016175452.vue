<script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { useStore } from 'vuex'
    import axios from 'axios'

    const router = useRouter()
    const products = ref(null)
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
    const route = useRoute()

    onMounted(async () => {
        const id = route.params.id
        const response = await axios.get(`http://localhost:3000/products/${id}`)
        products.value = response.data
    })
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
    const handleDangXuat = () => {
        localStorage.removeItem("currentUser")
        router.push("/login")
    }
    const goBack = () => {
        router.push('/')
    }
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
        <main class="container py-4" v-if="products">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h1 class="mb-0">{{ products.name }}</h1>
                <button class="btn btn-secondary" @click="goBack">← Quay lại</button>
            </div>
            
            <div class="row">
                <div class="col-md-5">
                    <img :src="products.image" alt="" class="img-fluid rounded shadow-sm product-image"/>
                </div>
                <div class="col-md-3 d-flex flex-column justify-content-center">
                    <p><strong>Danh mục:</strong> {{ products.category }}</p>
                    <p><strong>Giá:</strong> ${{ products.price }}</p>
                    <p><strong>Số lượng:</strong> {{ products.stock }}</p>
                    <p><strong>Mô tả:</strong> {{ products.description }}</p>
                    <button class="btn btn-success mt-3" @click="addToCart(products)">Thêm vào giỏ hàng</button>
                </div>
            </div>
        </main>
        <footer class="py-4 bg-dark text-white">
            <div class="container d-flex flex-wrap justify-content-between align-items-center gap-3">
                <span>© <span id="year">2025</span> MyShop</span>
                <a class="btn btn-outline-light btn-sm" href="#top">Back to top</a>
            </div>
        </footer>
    </div>
</template>

<style scoped>
    .page-wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    main {
        flex: 1;
    }

    body {
        background-color: #f8f9fa;
        margin: 0;
    }
    .btn-outline-danger, .btn-success{
        margin-left: 10px;
    }
</style>