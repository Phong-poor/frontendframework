<script setup>
    import { ref, onMounted, reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';

    const users = ref([]);
    const orders = ref([]);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

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
        if (String(user.phone).trim() === '') {
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
    const loadOrders = async () => {
        if (!currentUser || !currentUser.id) return;
        try {
            const res = await axios.get(`http://localhost:3000/orders?user_id=${String(currentUser.id)}`);
            orders.value = res.data;
        } catch (err) {
            console.error('Lỗi khi load đơn hàng:', err);
            orders.value = [];
        }
    };
    const handleCancelOrder = async (order) => {
        if (order.status === 'Đã hủy') {
            alert('Đơn hàng này đã được hủy!');
            return;
        }

        const confirmCancel = confirm(`Bạn có chắc muốn hủy đơn hàng #${order.id}?`);
        if (!confirmCancel) return;

        try {
            for (const item of order.items) {
                const productRes = await axios.get(`http://localhost:3000/products/${item.id}`);
                if (productRes.status === 200) {
                    const product = productRes.data;
                    const newStock = product.stock + item.quantity;

                    await axios.put(`http://localhost:3000/products/${item.id}`, {
                        ...product,
                        stock: newStock
                    });
                }
            }
            await axios.patch(`http://localhost:3000/orders/${order.id}`, {
                status: 'Đã hủy'
            });

            // 🔄 Reload danh sách đơn hàng
            await Loadulieu();
            alert(`Đơn hàng #${order.id} đã được hủy thành công`);
        } catch (error) {
            console.error('Lỗi khi hủy đơn hàng:', error);
        }
    };
    const router = useRouter();

    const handleDangXuat = () => {
        localStorage.removeItem('currentUser');
        router.push('/login');
    };

    onMounted(() => {
        Loadulieu();
        loadOrders(); 
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
                    <router-link to="/" class="btn btn-success">Trang chủ</router-link>
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
              <div>
                <h2 class="text-xl font-bold mb-4">Lịch sử đơn hàng</h2>

                <!-- Khi chưa có đơn -->
                <div v-if="orders.length === 0" class="text-gray-500">
                    Bạn chưa có đơn hàng nào.
                </div>

                <!-- Khi có đơn -->
                <div v-else>
                    <table class="min-w-full bg-white border">
                        <thead>
                            <tr class="bg-gray-100 text-left">
                                <th class="px-4 py-2">Mã đơn</th>
                                <th class="px-4 py-2">Tổng tiền</th>
                                <th class="px-4 py-2">Trạng thái</th>
                                <th class="px-4 py-2 text-center">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="order in orders" :key="order.id" class="border-t">
                                <td class="px-4 py-2 font-medium">#{{ order.id }}</td>
                                <td class="px-4 py-2 text-red-600 font-semibold">{{ order.total.toLocaleString() }} đ</td>
                                <td class="px-4 py-2">
                                <span
                                    :class="{
                                    'text-green-600': order.status === 'Đã giao',
                                    'text-yellow-600': order.status === 'Đang xử lý',
                                    'text-red-600': order.status === 'Đã hủy'
                                    }"
                                >
                                    {{ order.status }}
                                </span>
                                </td>
                                <td class="px-4 py-2 text-center">
                                    <button
                                        @click="viewOrderDetail(order)"
                                        class="action-btn btn-detail mr-2"
                                    >
                                        Xem chi tiết
                                    </button>
                                    <button
                                        v-if="order.status !== 'Đã hủy'"
                                        @click="handleCancelOrder(order)"
                                        class="action-btn btn-cancel"
                                    >
                                        Hủy đơn
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- 🪟 Modal chi tiết đơn -->
                <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div class="bg-white w-[600px] rounded-lg shadow-lg p-4 relative">
                        <h3 class="text-lg font-bold mb-4">Chi tiết đơn hàng #{{ selectedOrder.id }}</h3>

                        <table class="w-full border">
                        <thead>
                            <tr class="bg-gray-100 text-left">
                            <th class="px-2 py-1">Sản phẩm</th>
                            <th class="px-2 py-1 text-center">SL</th>
                            <th class="px-2 py-1 text-right">Giá</th>
                            <th class="px-2 py-1 text-right">Tổng</th>
                            </tr>
                        </thead>
                            <tbody>
                                <tr v-for="item in selectedOrder.items" :key="item.id" class="border-t">
                                <td class="px-2 py-1 flex items-center gap-2">
                                    <img :src="item.image" alt="" class="w-10 h-10 object-cover rounded" />
                                    <span>{{ item.name }}</span>
                                </td>
                                <td class="px-2 py-1 text-center">{{ item.quantity }}</td>
                                <td class="px-2 py-1 text-right">{{ item.price}} đ</td>
                                <td class="px-2 py-1 text-right font-semibold">
                                    {{ item.price * item.quantity}} đ
                                </td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="mt-4 flex justify-between font-bold">
                            <span>Tổng cộng:</span>
                            <span class="text-red-600">{{ selectedOrder.total }} đ</span>
                        </div>

                        <button
                        @click="showModal = false"
                        class="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                        >
                        ✖
                        </button>
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
    .btn-outline-danger{
        margin-left: 10px;
    }
    table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 12px 10px;
}

thead tr {
  background-color: #f1f5f9;
}

tbody tr:hover {
  background-color: #f9fafb;
  transition: background 0.2s ease;
}

th {
  text-transform: uppercase;
  font-size: 14px;
  color: #555;
}

td {
  font-size: 15px;
}

.text-red-600 {
  color: #dc2626;
}

.text-yellow-600 {
  color: #ca8a04;
}

.text-green-600 {
  color: #16a34a;
}

/* ✅ Nút thao tác */
button {
  transition: background-color 0.2s ease;
}

button.bg-blue-500:hover {
  background-color: #2563eb;
}

button.bg-red-500:hover {
  background-color: #dc2626;
}

/* ✅ Modal chi tiết đơn hàng */
.fixed {
  position: fixed;
}

.inset-0 {
  inset: 0;
}

.bg-black {
  background-color: rgba(0, 0, 0, 0.6);
}

.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}

.flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.items-center {
  align-items: center;
}

.relative {
  position: relative;
}

.rounded-lg {
  border-radius: 10px;
}

.shadow-lg {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.p-4 {
  padding: 1rem;
}

.text-xl {
  font-size: 1.25rem;
}

/* ✅ Ảnh sản phẩm trong chi tiết đơn */
td img {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
}

/* ✅ Trạng thái đơn */
.order-status {
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
}

.order-status.processing {
  background-color: #fef3c7;
  color: #92400e;
}

.order-status.completed {
  background-color: #d1fae5;
  color: #065f46;
}

.order-status.canceled {
  background-color: #fee2e2;
  color: #991b1b;
}

/* ✅ Khi không có đơn */
.text-gray-500 {
  color: #6b7280;
  font-style: italic;
  text-align: center;
  padding: 20px 0;
}
.action-btn {
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.25s ease, transform 0.15s ease;
  border: none;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ✅ Nút xem chi tiết */
.btn-detail {
  background-color: #3b82f6; /* xanh dương */
}

.btn-detail:hover:not(:disabled) {
  background-color: #2563eb;
  transform: translateY(-1px);
}

/* ❌ Nút hủy đơn */
.btn-cancel {
  background-color: #ef4444; /* đỏ */
}

.btn-cancel:hover:not(:disabled) {
  background-color: #dc2626;
  transform: translateY(-1px);
}
.btn-detail{
    margin-right: 10px;
}
</style>