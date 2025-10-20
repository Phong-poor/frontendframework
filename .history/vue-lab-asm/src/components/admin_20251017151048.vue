<script setup>
    import {ref, onMounted, reactive} from 'vue';
    import { useRouter } from 'vue-router'
    import axios from 'axios';
 
    const products = ref([]);
    const categories = ref([]);

    const product = reactive({
        title: '',
        price: '',
        category: '',
        image: '',
        description: ''
    })
    const editingId = ref(null);
    const editProduct = (item) => {
        Object.assign(product, item);
        editingId.value = item.id;
    };
    onMounted(async () => {
        Loadulieu()
        loadCategories()
    })
    const handleDelete = async (id) => {
        const isConfirm = confirm(`bạn có muốn xoá id = ${id} này không ?`)
        if (isConfirm) {
            const response = await axios.delete(`http://localhost:3000/products/${id}`);
            if (response.status == 200) {
            Loadulieu()
            alert('xoá thành công')
            }

        }
    }
    const handleSubmit = async () => {
        if (product.name.trim() === '') {
            alert('Title không được để trống');
            return;
        }

        if (editingId.value) {
            const response = await axios.put(
                `http://localhost:3000/products/${editingId.value}`,
                { ...product }
            );
            if (response.status === 200) {
                await Loadulieu();
                clearData();
                alert('Đã cập nhật thành công');
            }
        } else {
            const response = await axios.post(
                'http://localhost:3000/products',
                { ...product }
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
        const response = await axios.get('http://localhost:3000/products');
        if (response.status == 200) {
            products.value = response.data
        }
    }
    const loadCategories = async () => {
        console.log(`the component is now mounted.`)
        const response = await axios.get('http://localhost:3000/categories');
        if (response.status == 200) {
            categories.value = response.data
        }
    }
    const clearData = () => {
        Object.assign(product, {
            name: '',
            time: '',
            category: '',
            image: '',
            description: ''
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
        <!-- Products list -->
        <section class="col-lg-8">
          <div class="card shadow-sm">
            <div class="card-header d-flex justify-content-between align-items-center">
              <span class="fw-semibold">Products</span>
              <small class="text-secondary">Simple static list</small>
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
                      <th style="width:120px" class="text-end">Hành động</th>
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
          <router-link to="/adminCategory" class="btn btn-primary catagory">Danh mục</router-link>
          <router-link to="/adminUsers" class="btn btn-primary users">Tài khoản</router-link>
        </section>
        

        <!-- Edit form -->
        <aside class="col-lg-4">
          <div class="card shadow-sm sticky-col" id="editForm">
            <div class="card-header">Edit Product</div>
            <div class="card-body">
              <form action="#" method="post" @submit.prevent="handleSubmit">
                <div class="mb-3">
                  <label for="pTitle" class="form-label">Title</label>
                  <input type="text" v-model="product.name" class="form-control" id="pTitle" name="title" placeholder="Product title" required>
                </div>
                <div class="mb-3">
                  <label for="pPrice" class="form-label">Price (USD)</label>
                  <input type="number" v-model="product.price" class="form-control" id="pPrice" name="price" step="0.01" min="0" placeholder="0.00" required>
                </div>
                <div class="mb-3">
                  <label for="pPrice" class="form-label">Số lượng</label>
                  <input type="number" v-model="product.stock" class="form-control" id="pPrice" name="price" min="1" placeholder="0" required>
                </div>
                <div class="mb-3">
                  <label for="pCategory" class="form-label">Category</label>
                  <select id="pCategory" v-model="product.category" class="form-select" name="category" required>
                    <option value="" disabled selected>Choose...</option>
                    <option  v-for="item in categories" :key="item.id" :value="item.tenDM">{{ item.tenDM }}</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="pImage" class="form-label">Image URL</label>
                  <input type="url" v-model="product.image" class="form-control" id="pImage" name="image" placeholder="https://example.com/image.jpg" required>
                </div>
                <div class="mb-3">
                  <label for="pDesc" class="form-label">Description</label>
                  <textarea id="pDesc" v-model="product.description" class="form-control" name="description" rows="3" placeholder="Short product description" required></textarea>
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
    .product-thumb { width:60px; height:60px; object-fit:cover; border-radius:.5rem; }
    .sticky-col { position: sticky; top: 1rem; }
    .catagory{
      margin-top: 10px;
    }
    .users{
      margin-top: 10px;
      margin-left: 10px;
    }
    .btn-outline-danger{
      margin-left: 10px;
    }
</style>