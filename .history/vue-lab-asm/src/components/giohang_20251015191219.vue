<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const cart = computed(() => store.getters.cartItems)
const cartTotal = computed(() => store.getters.cartTotal)

onMounted(() => {
  store.dispatch('loadCart')
})

const removeItem = (id) => {
  store.commit('REMOVE_FROM_CART', id)
}

const handleDangXuat = () => {
  localStorage.removeItem("currentUser")
  router.push("/login")
}

const goToAdmin = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  if (currentUser && currentUser.role === "admin") {
    router.push("/admin");
  } else {
    alert("Bạn cần tài khoản Admin để truy cập!");
    router.push("/login");
  }
}
const giamSoLuong = (item) => {
  if (item.quantity > 1) {
    store.commit('UPDATE_CART_ITEM', { id: item.id, quantity: item.quantity - 1 });
  } else {
    alert("Số lượng tối thiểu là 1!");
  }
};

const tangSoLuong = (item) => {
  const max = item.stock || 10; // ví dụ tồn kho mặc định là 10
  if (item.quantity < max) {
    store.commit('UPDATE_CART_ITEM', { id: item.id, quantity: item.quantity + 1 });
  } else {
    alert(`Chỉ còn ${max} sản phẩm trong kho!`);
  }
};
const nhapSoLuong = (item) => {
  const max = item.stock || 10;
  if (item.quantity < 1) {
    alert("Số lượng tối thiểu là 1!");
    item.quantity = 1;
  } else if (item.quantity > max) {
    alert(`Chỉ còn ${max} sản phẩm trong kho!`);
    item.quantity = max;
  }
  store.commit('UPDATE_CART_ITEM', { id: item.id, quantity: item.quantity });
};
const goToUser = () => {
  const user = localStorage.getItem('currentUser')
  if (!user) {
    alert("Bạn cần đăng nhập để truy cập!");
  } else {
    router.push("/thongtincanhan")
  }
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
                        <router-link to="/" class="btn btn-success">Trang chủ</router-link>
                        <button class="btn btn-success" @click="goToUser">Tài khoản</button>
                        <button @click="handleDangXuat" class="btn btn-outline-danger">Đăng xuất</button>
                    </div>
                </div>
            </div>
        </header>
        <main class="container mt-4">
            <h2>Giỏ hàng của bạn</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Tổng</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in cart" :key="item.id">
                            <td><img class="product-thumb" :src="item.image" :alt="item.title" /></td>
                            <td>{{ item.name }}</td>
                            <td>      
                              <div class="d-flex justify-content-center align-items-center">
                                <button class="btn btn-sm btn-outline-secondary me-2" @click="giamSoLuong(item)">-</button>
                                <input type="number" v-model.number="item.quantity" @change="nhapSoLuong(item)" class="form-control text-center" min="1" style="width:70px;"/>
                                <button class="btn btn-sm btn-outline-secondary ms-2" @click="tangSoLuong(item)">+</button>
                              </div>
                            </td>
                            <td>{{ item.price }}</td>
                            <td>{{ (item.price * item.quantity).toFixed(2) }}</td>
                            <td><button class="btn btn-sm btn-danger" @click="removeItem(item.id)">Xóa</button></td>
                        </tr>
                    </tbody>
                </table>
            <p class="fw-bold text-end">Tổng cộng: ${{ (cartTotal).toF }}</p>
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
.product-thumb {
  width:60px;
  height:60px;
  object-fit:cover;
  border-radius:.5rem;
}
.table td, 
.table th {
  vertical-align: middle !important;
}
</style>