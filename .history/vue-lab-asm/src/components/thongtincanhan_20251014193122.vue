<script setup>
        import {ref, onMounted, reactive} from 'vue';
    import { useRouter } from 'vue-router'
    import axios from 'axios';
 
    const products = ref([]);
    const categories = ref([]);

    const product = reactive({
        name: '',
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
            alert('Tên sản phẩm không được để trống');
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
            <button class="btn btn-primary" @click="goToAdmin">Quản lý</button>
          </div>
          <div class="col-4 text-end">
            <router-link to="/thongtincanhan" class="btn btn-success">Tài khoản</router-link>
            <button @click="handleDangXuat" class="btn btn-outline-danger">Đăng xuất</button>
          </div>
        </div>
      </div>
    </header>
        <main class="container pb-5">

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
</style>