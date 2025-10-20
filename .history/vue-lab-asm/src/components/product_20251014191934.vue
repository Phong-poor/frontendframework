<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const products = ref([])
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

const goToAdmin = () => {
  if (currentUser && currentUser.role === "admin") {
    router.push("/admin");
  } else {
    alert("Bạn cần tài khoản Admin để truy cập!");
    router.push("/login");
  }
};
const Loadulieu = async () => {
  const response = await axios.get('http://localhost:3000/products')
  if (response.status == 200) {
    products.value = response.data
  }
}

onMounted(() => {
  Loadulieu()
})

const handleDangXuat = () => {
  localStorage.removeItem("currentUser")
  router.push("/login")
}

const handleTaiKhoan = () =>{
  
}
</script>

<template>
  <div class="page-wrapper">
    <!-- Header -->
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
            <button class="btn btn-success">Tài khoản</button>
            <button @click="handleDangXuat" class="btn btn-outline-danger">Đăng xuất</button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main: Products -->
    <main class="container pb-5">
      <div class="row g-4">
        <section class="col-12">
          <div class="card shadow-sm">
            <div class="card-header d-flex justify-content-between align-items-center">
              <span class="fw-semibold">Danh sách sản phẩm</span>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                  <thead class="table-light">
                    <tr>
                      <th style="width:80px">Hình ảnh</th>
                      <th>Tên sản phẩm</th>
                      <th>Số lượng</th>
                      <th style="width:140px">Danh mục</th>
                      <th style="width:120px" class="text-end">Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in products" :key="item.id">
                      <td>
                        <img class="product-thumb" :src="item.image" :alt="item.title" />
                      </td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.stock }}</td>
                      <td><span class="badge text-bg-dark">{{ item.category }}</span></td>
                      <td class="text-end">${{ item.price }}</td>
                    </tr>
                    <tr v-if="products.length === 0">
                      <td colspan="4" class="text-center text-muted py-3">Không có sản phẩm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Footer -->
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
.btn-outline-danger{
  margin-left: 10px;
}
.product-thumb {
  width:60px;
  height:60px;
  object-fit:cover;
  border-radius:.5rem;
}
</style>