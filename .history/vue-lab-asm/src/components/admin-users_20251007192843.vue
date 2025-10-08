<script setup>
    import {ref, onMounted, reactive} from 'vue';
    import { useRouter } from 'vue-router'
    import axios from 'axios';
 
    const users = ref([]);

    const user = reactive({
        username: '',
        email: '',
        role: ''
    })
    const editingId = ref(null);
    const editProduct = (item) => {
        Object.assign(user, item);
        editingId.value = item.id;
    };
    onMounted(async () => {
        Loadulieu()
    })
    const handleDelete = async (id) => {
        const isConfirm = confirm(`bạn có muốn xoá id = ${id} này không ?`)
        if (isConfirm) {
            const response = await axios.delete(`http://localhost:3001/users/${id}`);
            if (response.status == 200) {
            Loadulieu()
            alert('xoá thành công')
            }

        }
    }
    const handleSubmit = async () => {
        if (user.username.trim() === '') {
            alert('Title không được để trống');
            return;
        }

        if (editingId.value) {
            const response = await axios.put(
                `http://localhost:3001/users/${editingId.value}`,
                { ...user }
            );
            if (response.status === 200) {
                await Loadulieu();
                clearData();
                alert('Đã cập nhật thành công');
            }
        } else {
            const response = await axios.post(
                'http://localhost:3001/users',
                { ...user }
            );
            if (response.status === 201) {
                await Loadulieu();
                clearData();
                alert('Đã thêm thành công');
            }
        }
    };
    const Loadulieu = async () => {
        console.log(`the component is now mounted.`)
        const response = await axios.get('http://localhost:3001/users');
        if (response.status == 200) {
            users.value = response.data
        }
    }
    const clearData = () => {
        Object.assign(user, {
            username: '',
            email: '',
            role: ''
        })
        editingId.value = null;
    }
    const router = useRouter()

    const handleDangXuat = () => {
      localStorage.removeItem("currentUser")
      router.push("/login")
    }
</script>

<template>
    <header class="py-4 bg-white border-bottom mb-4">
    <div class="container d-flex align-items-center justify-content-between">
      <h1 class="h4 mb-0">MyShop</h1>
      <router-link to="/" class="btn btn-primary">Trở lại trang chủ</router-link>
      <button @click="handleDangXuat" class="btn btn-outline-danger">Đăng xuất</button>
    </div>
  </header>

  <main class="container pb-5">
    <div class="row g-4">
      <!-- Products list -->
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
                    <td class="text-end">${{ item.role }}</td>
                    <td class="text-end">
                        <a href="#editForm" @click="editProduct(item)" class="btn btn-sm btn-outline-secondary">Edit</a>
                        <a href="#deleteForm" @click="handleDelete(item.id)" class="btn btn-sm btn-outline-secondary">Delete</a>
                    </td>
                  </tr>
                  <tr v-if="products.length === 0">
                    <td colspan="5" class="text-center text-muted py-3">No products found</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <router-link to="/admin" class="btn btn-primary product">Sản phẩm</router-link>
        <router-link to="/adminCategory" class="btn btn-primary catagory">Danh mục</router-link>
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
                <input type="email" v-model="user.email" class="form-control" id="email" name="email"required>
              </div>
              <div class="mb-3">
                <label for="pImage" class="form-label">Role</label>
                <input type="text" v-model="user.role" class="form-control" id="role" name="role"required>
              </div>

              <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">Save</button>
                <button type="reset" class="btn btn-outline-secondary">Reset</button>
              </div>

              <!-- Optional hidden id field if your backend needs it -->
              <input type="hidden" name="id" value="">
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
</template>

<style scoped>
    body { background-color:#f8f9fa; }
    .product-thumb { width:60px; height:60px; object-fit:cover; border-radius:.5rem; }
    .sticky-col { position: sticky; top: 1rem; }
    .catagory{
      margin-top: 10px;
      margin-left: 10px;
    }
    .product{
        margin-top: 10px;
    }
</style>