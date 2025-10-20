<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const users = ref([])

const user = reactive({
  username: '',
  email: '',
  role: ''
})
const editingId = ref(null)

// 👉 Lấy currentUser 1 lần duy nhất
const currentUser = ref(null)
onMounted(() => {
  if (typeof localStorage !== 'undefined') {
    const data = localStorage.getItem('currentUser')
    if (data) currentUser.value = JSON.parse(data)
  }
  Loadulieu()
})

const editUser = (item) => {
  Object.assign(user, item)
  editingId.value = item.id
}

const handleDelete = async (id) => {
    if (currentUser.value && currentUser.value.id === id) {
        alert('Bạn không thể xóa tài khoản đang đăng nhập!')
        return
    }


    const userToDelete = users.value.find(u => u.id === id)
    if (userToDelete && (userToDelete.id === 'c771' || userToDelete.username === 'Phongpoor')) {
        alert('Tài khoản tối cao không thể bị xóa!')
        return
    }

    const isConfirm = confirm(`Bạn có chắc muốn xoá ID = ${id} này không ?`)
    if (isConfirm) {
        const response = await axios.delete(`http://localhost:3001/users/${id}`)
        if (response.status === 200) {
        Loadulieu()
        alert('Xoá thành công')
        }
    }
}

const handleSubmit = async () => {
    if (!editingId.value) {
        alert('Chỉ được sửa người dùng hiện có, không thể thêm mới.')
        return
    }

    const response = await axios.put(
        `http://localhost:3001/users/${editingId.value}`,
        { ...user }
    )

    if (response.status === 200) {
        await Loadulieu()
        clearData()
        alert('Cập nhật thành công')
    }
}

const Loadulieu = async () => {
    const response = await axios.get('http://localhost:3001/users')
    if (response.status === 200) {
        users.value = response.data
    }
}

const clearData = () => {
    Object.assign(user, {
        username: '',
        email: '',
        role: ''
    })
    editingId.value = null
}

const router = useRouter()

const handleDangXuat = () => {
    localStorage.removeItem('currentUser')
    router.push('/login')
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
            <router-link to="/" class="btn btn-primary">Trở lại trang chủ</router-link>
          </div>
          <div class="col-4 text-end">
            <router-link to="/thongtincanhan" class="btn btn-success">Tài khoản</router-link>
            <button @click="handleDangXuat" class="btn btn-outline-danger">Đăng xuất</button>
          </div>
        </div>
      </div>
    </header>

    <main class="container pb-5">
        <div class="row g-4">
            <!-- Orders list -->
            <section class="col-lg-12">
                <div class="card shadow-sm">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <span class="fw-semibold">Đơn hàng</span>
                        <small class="text-secondary">Quản lý danh sách đơn hàng</small>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table table-hover align-middle mb-0">
                                <thead class="table-light">
                                <tr>
                                    <th style="width:80px">Mã ĐH</th>
                                    <th>Tên KH</th>
                                    <th style="width:140px">Số điện thoại</th>
                                    <th style="width:140px">Tổng tiền</th>
                                    <th style="width:140px">Trạng thái</th>
                                    <th style="width:220px" class="text-end">Thao tác</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="order in orders" :key="order.id">
                                        <td>{{ order.id }}</td>
                                        <td>{{ order.customerName }}</td>
                                        <td>{{ order.phone }}</td>
                                        <td>{{ formatCurrency(order.total) }}</td>
                                        <td>
                                        <span 
                                            :class="{
                                            'badge bg-secondary': order.status === 'Chờ xác nhận',
                                            'badge bg-warning': order.status === 'Đang giao',
                                            'badge bg-success': order.status === 'Hoàn tất',
                                            'badge bg-danger': order.status === 'Đã hủy'
                                            }"
                                        >
                                            {{ order.status }}
                                        </span>
                                        </td>
                                        <td class="text-end d-flex justify-content-end gap-2">
                                        <button 
                                            class="btn btn-sm btn-outline-primary"
                                            @click="updateStatus(order.id, 'Đang giao')"
                                            v-if="order.status === 'Chờ xác nhận'"
                                        >
                                            Xác nhận
                                        </button>
                                        <button 
                                            class="btn btn-sm btn-outline-success"
                                            @click="updateStatus(order.id, 'Hoàn tất')"
                                            v-if="order.status === 'Đang giao'"
                                        >
                                            Hoàn tất
                                        </button>
                                        <button 
                                            class="btn btn-sm btn-outline-danger"
                                            @click="updateStatus(order.id, 'Đã hủy')"
                                            v-if="order.status !== 'Đã hủy' && order.status !== 'Hoàn tất'"
                                        >
                                            Hủy
                                        </button>
                                        </td>
                                    </tr>
                                    <tr v-if="orders.length === 0">
                                        <td colspan="6" class="text-center text-muted py-3">Không có đơn hàng nào</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
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
.product-thumb {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: .5rem;
}
.sticky-col {
  position: sticky;
  top: 1rem;
}
.catagory {
  margin-top: 10px;
  margin-left: 10px;
}
.product {
  margin-top: 10px;
}
.btn-outline-danger {
  margin-left: 10px;
}
</style>