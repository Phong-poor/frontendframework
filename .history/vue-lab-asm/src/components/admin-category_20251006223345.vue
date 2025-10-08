<script setup>

</script>

<template>
  <header class="py-4 bg-white border-bottom mb-4">
    <div class="container d-flex align-items-center justify-content-between">
      <h1 class="h4 mb-0">MyShop</h1>
      <router-link to="/" class="btn btn-primary">Trở lại trang chủ</router-link>
      <button class="btn btn-outline-danger">Đăng xuất</button>
    </div>
  </header>

  <main class="container pb-5">
    <div class="row g-4">
      <!-- Danh sách danh mục -->
      <section class="col-lg-8">
        <div class="card shadow-sm">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span class="fw-semibold">Quản lý danh mục</span>
            <small class="text-secondary">Quản lý tên, mã và icon</small>
          </div>

          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th style="width:80px">#</th>
                    <th style="width:200px">Mã danh mục</th>
                    <th>Tên danh mục</th>
                    <th style="width:120px" class="text-end">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item in categories" :key="item.id">
                    <td></td>
                    <td><span class="badge bg-secondary"></span></td>
                    <td><i class="fs-4 text-primary"></i></td>
                    <td class="text-end">
                      <a href="#editForm" class="btn btn-sm btn-outline-secondary">Sửa</a>
                      <a href="#deleteForm" class="btn btn-sm btn-outline-danger">Xóa</a>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="5" class="text-center text-muted py-3">Không có danh mục nào</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- Form thêm/sửa danh mục -->
      <aside class="col-lg-4">
        <div class="card shadow-sm sticky-col" id="editForm">
          <div class="card-header">Thêm / Sửa Danh mục</div>
          <div class="card-body">
            <form action="#" method="post">
              <div class="mb-3">
                <label for="maDM" class="form-label">Mã danh mục</label>
                <input type="text" class="form-control" id="maDM" name="maDM" placeholder="VD: DM01" required>
              </div>
              <div class="mb-3">
                <label for="tenDM" class="form-label">Tên danh mục</label>
                <input type="text" class="form-control" id="tenDM" name="tenDM" placeholder="Nhập tên danh mục" required>
              </div>
              <div class="mb-3">
                <label for="icon" class="form-label">Icon (class FontAwesome)</label>
                <input type="text" class="form-control" id="icon" name="icon" placeholder="VD: fa-solid fa-laptop">
              </div>

              <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">Lưu</button>
                <button type="reset" class="btn btn-outline-secondary">Làm mới</button>
              </div>
            </form>
          </div>
        </div>
      </aside>
    </div>
  </main>

  <footer class="py-4 bg-dark text-white">
    <div class="container d-flex flex-wrap justify-content-between align-items-center gap-3">
      <span>© <span id="year">2025</span> MyShop</span>
      <a class="btn btn-outline-light btn-sm" href="#top">Lên đầu trang</a>
    </div>
  </footer>
</template>

<style scoped>
body {
  background-color: #f8f9fa;
}

.sticky-col {
  position: sticky;
  top: 1rem;
}

.table td,
.table th {
  vertical-align: middle;
}

.card-header {
  background-color: #f5f5f5;
  font-weight: 500;
}

.btn-outline-danger {
  border-color: #dc3545;
  color: #dc3545;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  color: white;
}
</style>