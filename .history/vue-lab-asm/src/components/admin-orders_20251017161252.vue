<script setup>
import { ref, onMounted } from 'vue'

// ✅ State
const orders = ref([])
const selectedOrder = ref(null)
const modalRef = ref(null)

// 🛠️ Lấy dữ liệu từ file JSON (localStorage hoặc API thật)
onMounted(async () => {
    try {
        const res = await fetch('http://localhost:3000/orders')
        if (!res.ok) throw new Error('Failed to fetch orders')
        orders.value = await res.json()
    } catch (err) {
        console.error('Lỗi khi tải đơn hàng:', err)
    }
})

// ✅ Hàm cập nhật trạng thái
function updateStatus(id, newStatus) {
    const order = orders.value.find(o => o.id === id)
    if (order) {
        order.status = newStatus
        localStorage.setItem('orders', JSON.stringify(orders.value))
    }
}

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
            <div class="row g-4">
            <!-- Orders list -->
                <section class="col-lg-12">
                    <div class="card shadow-sm">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <span class="fw-semibold">Quản lý đơn hàng</span>
                            <small class="text-secondary">Dữ liệu lấy từ product.json</small>
                        </div>
                        <div class="card-body p-0">
                            <div class="table-responsive">
                                <table class="table table-hover align-middle mb-0">
                                    <thead class="table-light">
                                        <tr>
                                            <th style="width:100px">Mã ĐH</th>
                                            <th>Tên KH</th>
                                            <th>SĐT</th>
                                            <th>Địa chỉ</th>
                                            <th>Thanh toán</th>
                                            <th>Tổng tiền</th>
                                            <th>Trạng thái</th>
                                            <th style="width:260px" class="text-end">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="order in orders" :key="order.id">
                                            <td>{{ order.id }}</td>
                                            <td>{{ order.username }}</td>
                                            <td>{{ order.sdt }}</td>
                                            <td>{{ order.address }}</td>
                                            <td>
                                            <span class="badge text-bg-dark text-uppercase">
                                                {{ order.pay_type }}
                                            </span>
                                            </td>
                                            <td>{{ formatCurrency(order.total) }}</td>
                                            <td>
                                            <span 
                                                :class="{
                                                'badge bg-secondary': order.status === 'pending',
                                                'badge bg-warning': order.status === 'shipping',
                                                'badge bg-success': order.status === 'completed',
                                                'badge bg-danger': order.status === 'cancelled'
                                                }"
                                            >
                                                {{ getStatusText(order.status) }}
                                            </span>
                                            </td>
                                            <td class="text-end d-flex justify-content-end gap-2">
                                            <button 
                                                v-if="order.status === 'pending'"
                                                class="btn btn-sm btn-outline-primary"
                                                @click="updateStatus(order.id, 'shipping')"
                                            >
                                                Xác nhận
                                            </button>
                                            <button 
                                                v-if="order.status === 'shipping'"
                                                class="btn btn-sm btn-outline-success"
                                                @click="updateStatus(order.id, 'completed')"
                                            >
                                                Hoàn tất
                                            </button>
                                            <button 
                                                v-if="order.status !== 'cancelled' && order.status !== 'completed'"
                                                class="btn btn-sm btn-outline-danger"
                                                @click="updateStatus(order.id, 'cancelled')"
                                            >
                                                Hủy
                                            </button>
                                            <button 
                                                class="btn btn-sm btn-outline-secondary"
                                                @click="viewDetail(order)"
                                            >
                                                Xem
                                            </button>
                                            </td>
                                        </tr>
                                        <tr v-if="orders.length === 0">
                                            <td colspan="8" class="text-center text-muted py-3">Không có đơn hàng nào</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
                    <div 
                        class="modal fade" 
                        id="orderDetailModal" 
                        tabindex="-1" 
                        aria-labelledby="orderDetailModalLabel" 
                        aria-hidden="true"
                        ref="modalRef"
                    >
                        <div class="modal-dialog modal-lg modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="orderDetailModalLabel">
                                Chi tiết đơn hàng #{{ selectedOrder?.id }}
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                            <p><strong>Tên KH:</strong> {{ selectedOrder?.username }}</p>
                            <p><strong>Địa chỉ:</strong> {{ selectedOrder?.address }}</p>
                            <p><strong>Thanh toán:</strong> {{ selectedOrder?.pay_type }}</p>
                            <p><strong>Trạng thái:</strong> {{ getStatusText(selectedOrder?.status) }}</p>
                            <table class="table table-sm">
                                <thead>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Giá</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="item in selectedOrder?.items || []" :key="item.id">
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.quantity }}</td>
                                    <td>{{ formatCurrency(item.price) }}</td>
                                </tr>
                                </tbody>
                            </table>
                            <p class="mt-2"><strong>Tổng:</strong> {{ selectedOrder?.total }}</p>
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
    .btn-outline-danger{
        margin-left: 10px;
    }
</style>