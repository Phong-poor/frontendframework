<script setup>
import { ref, onMounted, inject, computed, reactive, watch } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const cart = computed(() => store.getters.cartItems)
const cartTotal = computed(() => store.getters.cartTotal)

onMounted(() => {
  store.dispatch('loadCart')

  const userData = JSON.parse(localStorage.getItem('currentUser') || '{}')
  if (userData) {
    orderInfo.name = userData.name || ''
    orderInfo.sdt = userData.phone || ''
    orderInfo.address = userData.address || ''
    orderInfo.email = userData.email || ''
  }
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

const orderInfo = reactive({
    name: "",
    sdt: "",
    address: "",
    email: "",
    total: 0,
    items: [],
    pay_type: "cod"
})

watch(orderInfo, (current) => {
    console.log('Current value of count:', current)
})

const clearData = () => {
  orderInfo.name = '';
  orderInfo.sdt = '';
  orderInfo.address = '';
  orderInfo.email = '';
  orderInfo.total = 0;
  orderInfo.items = [];
  orderInfo.pay_type = 'cod';
};

const handleRemove = (id) => {
  // TODO: hook this into your Vuex store (e.g., commit/dispatch) if available
  console.log('remove item id:', id);
};

const handleSubmit = async (e) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
  const payload = {
    name: orderInfo.name,
    sdt: orderInfo.sdt,
    address: orderInfo.address,
    email: orderInfo.email,
    pay_type: orderInfo.pay_type,
    items: cart.value.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    })),
    total: cartTotal.value,
    created_at: Date.now(),
    status: 'pending',
    user_id: currentUser ? currentUser.id : null
  }

  const response = await axios.post('http://localhost:3000/orders', payload);
  if (response.status == 201) {
    clearData()
    alert('Đã mua hàng thành công')
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
                              <div class="d-flex align-items-center">
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
            <p class="fw-bold text-end">Tổng cộng: ${{ (cartTotal).toFixed(2) }}</p>
            <div class="container">
              <h1 class="h4 mb-3">Thanh toán</h1>
                <div class="row g-4">
                  <!-- Left: Checkout form -->
                  <div class="col-lg-8">
                    <div class="card shadow-sm">
                      <div class="card-body p-4">
                        <form id="checkoutForm" class="needs-validation" novalidate @submit.prevent="handleSubmit">
                          <!-- 1) Contact info -->
                          <p class="form-section-title mb-2">1) Thông tin liên hệ</p>
                          <div class="row g-3">
                            <div class="col-md-6">
                              <label class="form-label">Họ và tên</label>
                              <input type="text" class="form-control" v-model="orderInfo.name" required placeholder="Nguyễn Văn A" />
                              <div class="invalid-feedback">Vui lòng nhập họ và tên.</div>
                            </div>
                            <div class="col-md-6">
                              <label class="form-label">Email</label>
                              <input type="email" class="form-control" v-model="orderInfo.email" required placeholder="ban@email.com" />
                              <div class="invalid-feedback">Email chưa hợp lệ.</div>
                            </div>
                            <div class="col-md-6">
                              <label class="form-label">Số điện thoại</label>
                              <input type="tel" class="form-control" v-model="orderInfo.sdt" required placeholder="09xxxxxxxx" />
                              <div class="invalid-feedback">Vui lòng nhập số điện thoại.</div>
                            </div>
                          </div>

                          <hr class="my-4" />

                          <!-- 2) Shipping address -->
                          <p class="form-section-title mb-2">2) Địa chỉ giao hàng</p>
                          <div class="row g-3">
                            <div class="col-12">
                              <label class="form-label">Địa chỉ</label>
                              <input type="text" v-model="orderInfo.address" class="form-control" required placeholder="Số nhà, đường, phường/xã" />
                              <div class="invalid-feedback">Vui lòng nhập địa chỉ.</div>
                            </div>
                          </div>

                          <hr class="my-4" />

                          <!-- 3) Payment method -->
                          <p class="form-section-title mb-2">3) Phương thức thanh toán</p>
                          <div class="row g-3">
                            <div class="col-12">
                              <div class="form-check">
                                <input class="form-check-input" v-model="orderInfo.pay_type" type="radio" value="cod" name="payment" id="payCOD" checked />
                                <label class="form-check-label" for="payCOD">Thanh toán khi nhận hàng (COD)</label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" v-model="orderInfo.pay_type" type="radio" value="vnpay" name="payment" id="payCard" />
                                <label class="form-check-label" for="payCard">Thẻ VNPAY</label>
                              </div>
                            </div>
                          </div>

                          <button type="submit" class="btn btn-primary mt-3">Thanh toán</button>
                        </form>
                      </div>
                    </div>
                  </div>

                  <!-- Right: Cart summary -->
                  <div class="col-lg-4">
                    <div class="card shadow-sm">
                      <div class="card-body p-3">
                        <h6 class="mb-3">Giỏ hàng</h6>
                        <table class="table table-sm align-middle">
                          <thead>
                            <tr>
                              <th scope="col">Tên</th>
                              <th scope="col" class="text-center">SL</th>
                              <th scope="col" class="text-end">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in cart" :key="item.id">
                              <td>{{ item.name }}</td>
                              <td class="text-center">{{ cart.quantity }}</td>
                              <td class="text-end">
                                <button class="btn btn-sm btn-danger" @click="handleRemove(cart.id)">Xoá</button>
                              </td>
                            </tr>
                          </tbody>
                    </table>
                    <div class="d-flex justify-content-between">
                      <strong>Tổng:</strong>
                      <strong>{{ totalCart }}</strong>
                    </div>
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
  table td:nth-child(6),
  table th:nth-child(6) {
    width: 180px;
  }
</style>