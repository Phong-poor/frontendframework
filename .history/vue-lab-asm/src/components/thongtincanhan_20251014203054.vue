<script setup>
    import { ref, onMounted, reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';

    const users = ref([]);
    const router = useRouter();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    // Dữ liệu người dùng hiển thị ra form
    const user = reactive({
        id: '',
        username: '',
        email: '',
        phone: '',
        birthday: '',
        gender: '',
        avatar: ''
    });

    const editingId = ref(null);
    const editUser = (item) => {
        Object.assign(user, item);
        editingId.value = item.id;
    };
    const Loadulieu = async () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser || !currentUser.id) {
            router.push('/login');
            return;
        }

        const response = await axios.get(`http://localhost:3001/users/${currentUser.id}`);
        if (response.status === 200) {
            Object.assign(user, response.data);
        }
    };


    const handleSubmit = async () => {
        if (user.username.trim() === '') {
            alert('Tên khách hàng không được để trống');
            return;
        }
        if (user.email.trim() === '') {
            alert('Email không được để trống');
            return;
        }
        if (user.phone.trim() === '') {
            alert('Số điện thoại không được để trống');
            return;
        }
        if (user.gender.trim() === '') {
            alert('Giới tính không được để trống');
            return;
        }

        const response = await axios.put(
            `http://localhost:3001/users/${user.id}`,
            { ...user }
        );
        if (response.status === 200) {
            await Loadulieu();
            alert('Đã cập nhật thông tin thành công');
        }
    };
    const defaultAvatar = 'https://cdn2.fptshop.com.vn/small/avatar_trang_1_cd729c335b.jpg';
    const handleAvatarUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            // Lưu base64 của ảnh vào user.avatar
            user.avatar = e.target.result;

            try {
            // Cập nhật dữ liệu trong json-server
            const response = await axios.put(
                `http://localhost:3001/users/${user.id}`,
                { ...user }
            );
            if (response.status === 200) {
                alert('Ảnh đại diện đã được cập nhật!');
            }
            } catch (error) {
            console.error('Lỗi khi cập nhật avatar:', error);
            }
        };
        reader.readAsDataURL(file); // chuyển file → base64
    };
    const goToAdmin = () => {
        if (currentUser && currentUser.role === "admin") {
            router.push("/admin");
        } else {
            alert("Bạn cần tài khoản Admin để truy cập!");
            router.push("/login");
        }
    };
    const router = useRouter();
        const handleDangXuat = () => {
        localStorage.removeItem('currentUser');
        router.push('/login');
    };

    onMounted(() => {
        Loadulieu();
    });
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
                        <div class="col-md-10 col-lg-8">
                            <div class="card shadow-lg border-0 rounded-4">
                                <div class="card-body p-4">
                                    <h3 class="mb-4 text-center text-success fw-bold">Thông Tin Người Dùng</h3>
                                    <div class="row g-4 align-items-center">
                                        <div class="col-md-4 text-center">
                                            <div class="avatar-wrapper mb-3">
                                                <img :src="user.avatar || defaultAvatar" alt="Ảnh đại diện" class="rounded-circle shadow" width="150" height="150"/>
                                            </div>
                                            <div>
                                                <input type="file" @change="handleAvatarUpload" class="form-control form-control-sm" accept="image/*"/>
                                            </div>
                                        </div>
                                        <div class="col-md-8">
                                            <form @submit.prevent="handleSubmit">
                                                <div class="mb-3">
                                                    <label class="form-label">Họ tên</label>
                                                    <input v-model="user.username" type="text" class="form-control" />
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">Email</label>
                                                    <input v-model="user.email" type="email" class="form-control" disabled />
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">Số điện thoại</label>
                                                    <input v-model="user.phone" type="number" class="form-control" />
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">Giới tính</label>
                                                    <input v-model="user.gender" type="text" class="form-control" />
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">Ngày sinh</label>
                                                    <input v-model="user.birthday" type="date" class="form-control" />
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