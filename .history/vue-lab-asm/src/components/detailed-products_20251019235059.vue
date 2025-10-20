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
    const LoadFavorite = async () => {
        const res = await axios.get('http://localhost:3000/product-favorite')
        if (res.status === 200) {
            favorites.value = res.data
        }
    }
    const viewProduct = (id) => {
        router.push(`/products/${id}`);
    };
    onMounted(async () => {
        const id = route.params.id
        const response = await axios.get(`http://localhost:3000/products/${id}`)
        products.value = response.data

        if (products.value.category) {
            const relatedResponse = await axios.get(`http://localhost:3000/products?category=${products.value.category}`)
            relatedProducts.value = relatedResponse.data.filter(item => item.id != products.value.id)
        }
        await LoadFavorite()
    })
    const store = useStore()

    const addToCart = async (product) => {
        await store.dispatch('addCart', product)
        alert(`Đã thêm ${product.name} vào giỏ hàng!`)
    }
    const addToFavorite = async (product) => {
        const exists = favorites.value.find(fav => fav.id === product.id)
        if (exists) {
            alert(`Sản phẩm "${product.name}" đã có trong danh sách yêu thích!`)
            return
        }

        try {
            const res = await axios.post('http://localhost:3000/product-favorite', product)
            if (res.status === 201) {
            favorites.value.push(product)
            alert(`Đã thêm "${product.name}" vào yêu thích ❤️`)
            }
        } catch (error) {
            console.error("Lỗi khi thêm yêu thích:", error)
        }
    }
    const removeFavorite = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/product-favorite/${id}`)
            favorites.value = favorites.value.filter(f => f.id !== id)
        } catch (error) {
            console.error("Lỗi khi xóa yêu thích:", error)
        }
    }
    const toggleFavoriteDropdown = () => {
        showFavoriteDropdown.value = !showFavoriteDropdown.value
    }

    const closeDropdownOutside = (e) => {
        const dropdown = document.querySelector('.favorite-dropdown')
        if (dropdown && !dropdown.contains(e.target)) {
            showFavoriteDropdown.value = false
        }
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
        <header class="py-4 bg-white border-bottom mb-4 position-relative">
            <div class="container">
                <div class="row align-items-center">
                <div class="col-4">
                    <h1 class="h4 mb-0">MyShop</h1>
                </div>

                <div class="col-4 text-center">
                    <button class="btn btn-primary" @click="goToAdmin">Quản lý</button>
                </div>

                <div class="col-4 d-flex justify-content-end align-items-center gap-2">
                    <!-- ❤️ Dropdown yêu thích (click toggle) -->
                    <div class="favorite-dropdown">
                    <button
                        class="btn btn-outline-danger position-relative"
                        @click="toggleFavoriteDropdown"
                    >
                        ❤️ Yêu thích
                        <span v-if="favorites.length" class="favorite-count">
                        {{ favorites.length }}
                        </span>
                    </button>

                    <div v-if="showFavoriteDropdown" class="dropdown-menu-custom shadow" @click.stop>
                        <template v-if="favorites.length > 0">
                        <div
                            v-for="item in favorites"
                            :key="item.id"
                            class="dropdown-item d-flex justify-content-between align-items-center"
                        >
                            <div
                            class="d-flex align-items-center gap-2 cursor-pointer"
                            @click="viewProduct(item.id)"
                            >
                            <img :src="item.image" class="fav-thumb" />
                            <span class="text-truncate">{{ item.name }}</span>
                            </div>
                            <button
                            class="btn btn-sm btn-outline-danger"
                            @click.stop="removeFavorite(item.id)"
                            >
                            ✕
                            </button>
                        </div>
                        </template>
                        <div v-else class="text-center text-muted p-2">Chưa có sản phẩm</div>
                    </div>
                    </div>

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
                    <div class="group">
                        <button class="btn btn-success mt-3" @click="addToCart(products)">Thêm vào giỏ hàng</button>
                        <button class="btn mt-3" @click="addToFavorite(products)">❤️</button>
                    </div>
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
.favorite-dropdown {
  position: relative;
}
.favorite-count {
  position: absolute;
  top: -5px;
  right: -8px;
  background: red;
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 50%;
}
.dropdown-menu-custom {
  position: absolute;
  top: 120%;
  right: 0;
  background: #fff;
  width: 280px;
  border-radius: 0.5rem;
  overflow: hidden;
  z-index: 1000;
}
.dropdown-item {
  padding: 8px 10px;
  border-bottom: 1px solid #eee;
}
.dropdown-item:last-child {
  border-bottom: none;
}
.dropdown-item:hover {
  background-color: #f5f5f5;
}
.fav-thumb {
  width: 35px;
  height: 35px;
  object-fit: cover;
  border-radius: 0.25rem;
}
.cursor-pointer {
  cursor: pointer;
}
</style>