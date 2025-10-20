<script setup>

</script>

<template>
    <div class="page-wrapper">
        <header class="py-4 bg-white border-bottom mb-4">
            <div class="container d-flex align-items-center justify-content-between">
                <h1 class="h4 mb-0">MyShop</h1>
                <button class="btn btn-primary" @click="goToAdmin">Quản lý</button>
                <button @click="handleDangXuat" class="btn btn-outline-danger">Đăng xuất</button>
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
                                        <label for="pTitle" class="form-label">Tên sản phẩm</label>
                                        <input type="text" v-model="product.name" class="form-control" id="pTitle" name="name" placeholder="Product name" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="pPrice" class="form-label">Giá (USD)</label>
                                        <input type="number" v-model="product.price" class="form-control" id="pPrice" name="price" step="0.01" min="0" placeholder="0.00" required>
                                    </div>
                                    <div class="mb-3">
                                    <label for="pPrice" class="form-label">Số lượng</label>
                                    <input type="number" v-model="product.price" class="form-control" id="pPrice" name="price" step="0.01" min="0" placeholder="0.00" required>
                                    </div>
                                    <div class="mb-3">
                                    <label for="pCategory" class="form-label">Danh mục</label>
                                    <select id="pCategory" v-model="product.category" class="form-select" name="category" required>
                                        <option value="" disabled selected>Choose...</option>
                                        <option  v-for="item in categories" :key="item.id" :value="item.tenDM">{{ item.tenDM }}</option>
                                    </select>
                                    </div>
                                    <div class="mb-3">
                                    <label for="pImage" class="form-label">URL Hình ảnh</label>
                                    <input type="url" v-model="product.image" class="form-control" id="pImage" name="image" placeholder="https://example.com/image.jpg" required>
                                    </div>
                                    <div class="mb-3">
                                    <label for="pDesc" class="form-label">Mô tả</label>
                                    <textarea id="pDesc" v-model="product.description" class="form-control" name="description" rows="3" placeholder="Short product description" required></textarea>
                                    </div>

                                    <div class="d-flex gap-2">
                                    <button type="submit" class="btn btn-primary">Lưu</button>
                                    <button type="reset" class="btn btn-outline-secondary">Cài lại</button>
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
</style>