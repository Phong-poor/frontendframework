<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const products = ref([])
const topProducts = ref([])
const lowStockProducts = ref([])
const orders = ref([])
const customerStats = ref([]);

const chartRef = ref(null)
let chartInstance = null

const stockThreshold = 10

const calculateSalesData = () => {
    products.value.forEach(product => {
        product.sold = 0
        product.successOrders = 0
        product.cancelledOrders = 0
    })

    orders.value.forEach(order => {
        order.items.forEach(item => {
            const product = products.value.find(p => p.id === item.id)
            if (product) {
                if (order.status === 'completed' || order.status === 'shipping') {
                    product.sold += item.quantity
                    product.successOrders += item.quantity
                } else if (order.status === 'Đã hủy') {
                    product.cancelledOrders += item.quantity
                }
            }
        })
    })
}
const calculateCustomerStats = () => {
    const statsMap = {}

    orders.value.forEach(order => {
        if (order.status === 'completed' || order.status === 'shipping') {
            const customer = order.username || 'Khách vãng lai'

            let totalOrder = 0
            order.items.forEach(item => {
                const product = products.value.find(p => p.id === item.id)
                if (product) {
                    totalOrder += product.price * item.quantity
                }
            })

            if (!statsMap[customer]) {
                statsMap[customer] = 0
            }
            statsMap[customer] += totalOrder
        }
    })

    customerStats.value = Object.entries(statsMap).map(([customer, total]) => ({
        customer,
        total
    }))
}
const fetchData = async () => {
    const [productsRes, ordersRes] = await Promise.all([
        axios.get('http://localhost:3000/products'),
        axios.get('http://localhost:3000/orders')
    ])

    products.value = productsRes.data
    orders.value = ordersRes.data

    calculateSalesData()
    calculateCustomerStats()

    topProducts.value = [...products.value]
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 5)


    lowStockProducts.value = products.value.filter(p => p.stock <= stockThreshold)

    renderChart()
}

const renderChart = () => {
    const labels = products.value.map(p => p.name)
    const successData = products.value.map(p => p.successOrders * p.price)
    const cancelData = products.value.map(p => p.cancelledOrders * p.price)

    if (chartInstance) chartInstance.destroy()

    chartInstance = new Chart(chartRef.value, {
        type: 'bar',
        data: {
        labels: labels,
        datasets: [
            {
                label: 'Thành công',
                data: successData,
                backgroundColor: '#16a34a'
            },
            {
                label: 'Đã hủy',
                data: cancelData,
                backgroundColor: '#dc2626'
            }
        ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                tooltip: {
                callbacks: {
                    label: (context) => {
                    const value = context.parsed.y
                    return `${context.dataset.label}: $${value.toLocaleString('en-US')}`
                    }
                }
            }
        },
        scales: {
            x: {
            title: {
                display: true,
                text: 'Sản phẩm'
            },
            stacked: false
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Tổng tiền (USD)'
                },
            ticks: {
                callback: (value) => `$${value.toLocaleString('en-US')}`
            }
            }
        }
        }
    })
}

onMounted(() => {
  fetchData()
})
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
            <router-link to="/adminCategory" class="btn btn-primary catagory">Danh mục</router-link>
            <router-link to="/adminUsers" class="btn btn-primary users">Tài khoản</router-link>
            <router-link to="/adminOrders" class="btn btn-primary users">Đơn hàng</router-link>
            <router-link to="/admin" class="btn btn-primary users">Sản phẩm</router-link>
            <div class="p-4 space-y-10">
                <h1 class="text-2xl font-bold mb-6">Bảng Thống Kê Sản Phẩm</h1>
                <section>
                    <h2 class="text-xl font-semibold mb-3"> Top 5 sản phẩm bán chạy</h2>
                    <table class="table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên</th>
                            <th>Danh mục</th>
                            <th>Đã bán</th>
                            <th>Doanh thu</th>
                            <th>Tồn kho</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in topProducts" :key="item.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.category }}</td>
                            <td>{{ item.sold }}</td>
                            <td>{{ (item.sold * item.price).toLocaleString('vi-VN') }} ₫</td>
                            <td>{{ item.stock }}</td>
                        </tr>
                        </tbody>
                    </table>
                </section>
                <div>
                    <h2 class="text-xl font-semibold mb-3">Thống kê chi tiêu khách hàng</h2>
                    <table class="table-auto w-full border">
                        <thead>
                            <tr class="bg-gray-100">
                            <th class="p-2 border">#</th>
                            <th class="p-2 border">Khách hàng</th>
                            <th class="p-2 border">Tổng chi tiêu ($)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in customerStats" :key="item.customer">
                            <td class="border p-2">{{ index + 1 }}</td>
                            <td class="border p-2">{{ item.customer }}</td>
                            <td class="border p-2">${{ item.total.toLocaleString() }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <section>
                    <h2 class="text-xl font-semibold mb-3">Biểu đồ doanh thu theo sản phẩm</h2>
                    <canvas ref="chartRef"></canvas>
                </section>

                <section>
                    <h2 class="text-xl font-semibold mb-3">Cảnh báo sản phẩm sắp hết hàng</h2>
                    <table class="table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên</th>
                            <th>Tồn kho</th>
                            <th>Trạng thái</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in lowStockProducts" :key="item.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.stock }}</td>
                            <td class="text-red-500 font-semibold">Sắp hết hàng</td>
                        </tr>
                        </tbody>
                    </table>
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
    .table {
        width: 100%;
        border-collapse: collapse;
        background: #fff;
    }
    .table th, .table td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }
    .table th {
        background: #f1f5f9;
    }
    .btn-outline-danger{
        margin-left: 10px;
    }
    .catagory{
      margin-top: 10px;
    }
    .users{
      margin-top: 10px;
      margin-left: 10px;
    }
</style>