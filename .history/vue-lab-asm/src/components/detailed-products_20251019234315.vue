<script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { useStore } from 'vuex'
    import axios from 'axios'

    const router = useRouter()
    const products = ref(null)
    const relatedProducts = ref([])
    const favorites = ref([])
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
    const route = useRoute()

    const showFavoriteDropdown = ref(false)
    onMounted(async () => {
        const id = route.params.id
        const response = await axios.get(`http://localhost:3000/products/${id}`)
        products.value = response.data

        if (products.value.category) {
            const relatedResponse = await axios.get(`http://localhost:3000/products?category=${products.value.category}`)
            relatedProducts.value = relatedResponse.data.filter(item => item.id != products.value.id)
        }
    })
    const store = useStore()

    const addToCart = async (product) => {
        await store.dispatch('addCart', product)
        alert(`Đã thêm ${product.name} vào giỏ hàng!`)
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
                <div class="col-md-7 d-flex flex-column justify-content-center thongtin">
                    <p><strong>Danh mục:</strong> {{ products.category }}</p>
                    <p><strong>Giá:</strong> ${{ products.price }}</p>
                    <p><strong>Số lượng:</strong> {{ products.stock }}</p>
                    <p><strong>Mô tả:</strong> {{ products.description }}</p>
                    <button class="btn btn-success mt-3" @click="addToCart(products)">Thêm vào giỏ hàng</button>
                </div>
            </div>

            <div v-if="relatedProducts.length > 0" class="mt-5">
                <h2 class="mb-4">Sản phẩm liên quan</h2>
                <div class="row g-4">
                    <div v-for="item in relatedProducts" :key="item.id" class="col-6 col-md-3">
                        <div class="card h-100 shadow-sm related-card">
                            <img :src="item.image" :alt="item.name" class="card-img-top related-image" />
                            <div class="card-body d-flex flex-column justify-content-between">
                                <h5 class="card-title">{{ item.name }}</h5>
                                <p class="text-muted mb-2">${{ item.price }}</p>
                                <router-link :to="`/products/${item.id}`" class="btn btn-outline-primary btn-sm mt-auto">
                                Xem chi tiết
                                </router-link>
                            </div>
                        </div>
                    </div>
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
    .thongtin button{
        width: 300px;
    }
</style>