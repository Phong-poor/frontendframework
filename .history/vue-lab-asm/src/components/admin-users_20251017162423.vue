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
        users.value = users.value.filter(u => u.id !== id)
        localStorage.setItem('users', JSON.stringify(users.value))
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
        <!-- Users list -->
        <section class="col-lg-8">
          <div class="card shadow-sm">
            <div class="card-header d-flex justify-content-between align-items-center">
              <span class="fw-semibold">Users</span>
              <small class="text-secondary">Simple static list</small>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                  <thead class="table-light">
                    <tr>
                      <th style="width:80px">Id</th>
                      <th>Name</th>
                      <th style="width:140px">Email</th>
                      <th style="width:120px" class="text-end">Role</th>
                      <th style="width:120px" class="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in users" :key="item.id">
                      <td>{{ item.id }}</td>
                      <td>{{ item.username }}</td>
                      <td><span class="badge text-bg-dark">{{ item.email }}</span></td>
                      <td class="text-end">{{ item.role }}</td>
                      <td class="text-end">
                        <a href="#editForm" @click="editUser(item)" class="btn btn-sm btn-outline-secondary">Edit</a>
                        <a
                          v-if="!(item.id === 'c771' || item.username === 'Phongpoor' || item.id === currentUser?.id)"
                          href="#deleteForm"
                          @click="handleDelete(item.id)"
                          class="btn btn-sm btn-outline-secondary"
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                    <tr v-if="users.length === 0">
                      <td colspan="5" class="text-center text-muted py-3">No users found</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <router-link to="/admin" class="btn btn-primary product">Sản phẩm</router-link>
          <router-link to="/adminCategory" class="btn btn-primary catagory">Danh mục</router-link>
          <router-link to="/adminOrders" class="btn btn-primary catagory">Đơn hàng</router-link>
        </section>

        <!-- Edit form -->
        <aside class="col-lg-4">
          <div class="card shadow-sm sticky-col" id="editForm">
            <div class="card-header">Edit Users</div>
            <div class="card-body">
              <form action="#" method="post" @submit.prevent="handleSubmit">
                <div class="mb-3">
                  <label for="pTitle" class="form-label">Username</label>
                  <input type="text" v-model="user.username" class="form-control" id="username" name="username" required>
                </div>
                <div class="mb-3">
                  <label for="pPrice" class="form-label">Email</label>
                  <input type="email" v-model="user.email" class="form-control" id="email" name="email" required>
                </div>
                <div class="mb-3">
                  <label for="pImage" class="form-label">Role</label>
                  <select v-model="user.role" class="form-select" id="role" name="role" required>
                    <option value="" disabled>-- Chọn vai trò --</option>
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                  </select>
                </div>
                <div class="d-flex gap-2">
                  <button type="submit" class="btn btn-primary">Save</button>
                  <button type="reset" class="btn btn-outline-secondary">Reset</button>
                </div>
              </form>
            </div>
          </div>
        </aside>
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