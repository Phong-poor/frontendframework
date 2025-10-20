<script setup>
    import {ref, onMounted, reactive} from 'vue';
    import { useRouter } from 'vue-router'
    import axios from 'axios';
 
    const users = ref([]);

    const user = reactive({
        username: '',
        email: '',
        phone: '',
        birthday: '',
        gender: ''
    })
    const editingId = ref(null);
    const editProduct = (item) => {
        Object.assign(user, item);
        editingId.value = item.id;
    };
    onMounted(async () => {
        Loadulieu()
        loadCategories()
    })
    const handleSubmit = async () => {
        if (users.username.trim() === '') {
            alert('Tên khách hàng không được để trống');
            return;
        }
        if (users.email.trim() === '') {
            alert('Email không được để trống');
            return;
        }
        if (users.phone.trim() === '') {
            alert('Số điện thoại không được để trống');
            return;
        }
        if (users.gender.trim() === '') {
            alert('Giới tính không được để trống');
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
                'http://localhost:3001/user',
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
              <div class="container py-5">
                    <div class="row justify-content-center">
                    <!-- Khung thông tin -->
                        <div class="col-md-10 col-lg-8">
                            <div class="card shadow-lg border-0 rounded-4">
                                <div class="card-body p-4">
                                    <h3 class="mb-4 text-center text-success fw-bold">Thông Tin Người Dùng</h3>

                                    <div class="row g-4 align-items-center">
                                    <!-- Ảnh đại diện -->
                                    <div class="col-md-4 text-center">
                                        <div class="avatar-wrapper mb-3">
                                        <img
                                            :src="user.avatar || defaultAvatar"
                                            alt="Ảnh đại diện"
                                            class="rounded-circle shadow"
                                            width="150"
                                            height="150"
                                        />
                                        </div>
                                        <div>
                                        <input
                                            type="file"
                                            @change="handleAvatarUpload"
                                            class="form-control form-control-sm"
                                            accept="image/*"
                                        />
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <form @submit.prevent="updateUser">
                                            <div class="mb-3">
                                                <label class="form-label">Họ tên</label>
                                                <input v-model="user.name" type="text" class="form-control" />
                                            </div>

                                            <div class="mb-3">
                                                <label class="form-label">Email</label>
                                                <input v-model="user.email" type="email" class="form-control" disabled />
                                            </div>

                                            <div class="mb-3">
                                                <label class="form-label">Số điện thoại</label>
                                                <input v-model="user.phone" type="text" class="form-control" />
                                            </div>

                                            <div class="mb-3">
                                                <label class="form-label">Địa chỉ</label>
                                                <input v-model="user.address" type="text" class="form-control" />
                                            </div>

                                            <div class="text-end">
                                                <button type="submit" class="btn btn-success px-4">Cập nhật</button>
                                            </div>
                                        </form>
                                    </div>
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
    .product-thumb {
        width:60px;
        height:60px;
        object-fit:cover;
        border-radius:.5rem;
    }
</style>