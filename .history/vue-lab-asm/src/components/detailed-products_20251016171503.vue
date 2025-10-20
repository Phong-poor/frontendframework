<script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import axios from 'axios'

    const router = useRouter()
    const products = ref(null)
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

    onMounted(async () => {
  const id = route.params.id
  const response = await axios.get(`http://localhost:3000/products/${id}`)
  product.value = response.data
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

        <footer class="py-4 bg-dark text-white">
            <div class="container d-flex flex-wrap justify-content-between align-items-center gap-3">
                <span>© <span id="year">2025</span> MyShop</span>
                <a class="btn btn-outline-light btn-sm" href="#top">Back to top</a>
            </div>
        </footer>
    </div>
</template>

<style scoped>

</style>