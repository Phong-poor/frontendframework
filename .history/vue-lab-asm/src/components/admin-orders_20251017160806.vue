<script setup>
import { ref, onMounted } from 'vue'

// ✅ State
const orders = ref([])
const selectedOrder = ref(null)
const modalRef = ref(null)

// 🛠️ Lấy dữ liệu từ file JSON (localStorage hoặc API thật)
onMounted(() => {
    const data = JSON.parse(localStorage.getItem('orders')) || []
    orders.value = data
})

// ✅ Hàm cập nhật trạng thái
function updateStatus(id, newStatus) {
    const order = orders.value.find(o => o.id === id)
    if (order) {
        order.status = newStatus
        localStorage.setItem('orders', JSON.stringify(orders.value))
    }
}

// ✅ Hàm format tiền VND
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}

// ✅ Chuyển status thành tiếng Việt dễ đọc
function getStatusText(status) {
    switch (status) {
        case 'pending': return 'Chờ xác nhận'
        case 'shipping': return 'Đang giao'
        case 'completed': return 'Hoàn tất'
        case 'cancelled': return 'Đã hủy'
        default: return status
    }
}

// ✅ Hàm xem chi tiết đơn hàng (mở modal)
function viewDetail(order) {
    selectedOrder.value = order
    const modal = new bootstrap.Modal(modalRef.value)
    modal.show()
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
    .btn-outline-danger{
        margin-left: 10px;
    }
</style>