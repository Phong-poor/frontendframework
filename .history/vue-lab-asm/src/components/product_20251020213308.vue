<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'

const router = useRouter()
const products = ref([])
const searchQuery = ref("")
const favorites = ref([])
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

const showFavoriteDropdown = ref(false)
const viewProduct = (id) => {
  router.push(`/detailed-products/${id}`)
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
const Loadulieu = async () => {
  const response = await axios.get('http://localhost:3000/products')
  if (response.status == 200) {
    products.value = response.data
  }
}
const LoadFavorite = async () => {
  const res = await axios.get('http://localhost:3000/product-favorite')
  if (res.status === 200) {
    favorites.value = res.data
  }
}
onMounted(() => {
  Loadulieu()
  LoadFavorite()
})
const store = useStore()

const addToCart = async (product) => {
  if (product.stock <= 0) {
    alert("Sản phẩm đã hết hàng!");
    return;
  }
  await store.dispatch('addCart', product)
  alert(`Đã thêm ${product.name} vào giỏ hàng!`)
}
const addToFavorite = async (product) => {
  if (!currentUser) {
    alert("Bạn cần đăng nhập để sử dụng tính năng này!");
    router.push("/login");
    return;
  }

  const exists = favorites.value.find(fav => fav.id === product.id);
  if (exists) {
    alert(`Sản phẩm "${product.name}" đã có trong danh sách yêu thích!`);
    return;
  }

  try {
    const res = await axios.post('http://localhost:3000/product-favorite', product);
    if (res.status === 201) {
      favorites.value.push(product);
      alert(`Đã thêm "${product.name}" vào yêu thích ❤️`);
    }
  } catch (error) {
    console.error("Lỗi khi thêm yêu thích:", error);
  }
};
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
const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  return products.value.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
const handleDangXuat = () => {
  localStorage.removeItem("currentUser")
  router.push("/login")
}
</script>

<template>
  <div class="page-wrapper">
    <!-- Header -->
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

    <!-- Main: Products -->
    <main class="container pb-5">
      <div class="row g-4">
        <section class="col-12">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="fw-semibold fs-5">Danh sách sản phẩm</span>
            <input type="text" class="form-control" placeholder="Tìm kiếm sản phẩm..." v-model="searchQuery" style="width: 250px;"
            />
          </div>
          <div class="card shadow-sm">
            <div class="card-header d-flex justify-content-between align-items-center">
              <span class="fw-semibold">Danh sách sản phẩm</span>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                  <thead class="table-light">
                    <tr>
                      <th style="width:100px">Hình ảnh</th>
                      <th>Tên sản phẩm</th>
                      <th>Số lượng</th>
                      <th style="width:140px">Danh mục</th>
                      <th>Giá</th>
                      <th style="width:120px" class="text-end">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in filteredProducts" :key="item.id">
                      <td>
                        <img class="product-thumb" :src="item.image" :alt="item.title" />
                      </td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.stock }}</td>
                      <td><span class="badge text-bg-dark">{{ item.category }}</span></td>
                      <td>${{ item.price }}</td>
                      <td class="text-end">
                        <button class="btn btn-sm " @click="addToFavorite(item)">❤️</button>
                        <button 
                          @click="addToCart(item)" 
                          :disabled="item.stock <= 0" 
                          :class="{ 'opacity-50 cursor-not-allowed': item.stock <= 0 }"
                        >
                          {{ product.stock <= 0 ? 'Hết hàng' : 'Thêm vào giỏ' }}
                        </button>
                        <button class="btn btn-sm btn-primary me-2" @click="viewProduct(item.id)">Xem</button>
                      </td>
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

.product-thumb {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 0.5rem;
}
table td:nth-child(6),
table th:nth-child(6) {
  width: 280px;
}
table td:nth-child(6) button {
  margin-left: 8px;
}

/* ❤️ Dropdown */
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