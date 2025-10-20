<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const products = ref([])
const topProducts = ref([])
const lowStockProducts = ref([])

const chartRef = ref(null)
let chartInstance = null

const stockThreshold = 10

const fetchProducts = async () => {
    const res = await axios.get('http://localhost:3000/products')
    products.value = res.data

    topProducts.value = [...products.value]
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 5)

    lowStockProducts.value = products.value.filter(p => p.stock <= stockThreshold)

    // Vẽ biểu đồ
    renderChart()
}

const renderChart = () => {
  const labels = products.value.map(p => p.name)
  const data = products.value.map(p => p.sold * p.price)

  if (chartInstance) chartInstance.destroy()

  chartInstance = new Chart(chartRef.value, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Doanh thu (VNĐ)',
          data: data,
          backgroundColor: '#3b82f6'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        tooltip: { enabled: true }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  })
}

onMounted(() => {
  fetchProducts()
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