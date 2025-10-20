<script setup>

</script>

<template>
    <div class="page-wrapper">
        <header class="py-4 bg-white border-bottom mb-4 position-relative">
            <div class="container">
                <div class="row align-items-center">
                <div class="col-4">
                    <h1 class="h4 mb-0">MyShop</h1>
                </div>

                <div class="col-4 text-center">
                    <button class="btn btn-primary" @click="goToAdmin">Quản lý</button>
                </div>

                <div class="col-4 d-flex justify-content-end align-items-center gap-2">
                    <!-- ❤️ Dropdown yêu thích (click toggle) -->
                    <div class="favorite-dropdown">
                    <button
                        class="btn btn-outline-danger position-relative"
                        @click="toggleFavoriteDropdown"
                    >
                        ❤️ Yêu thích
                        <span v-if="favorites.length" class="favorite-count">
                        {{ favorites.length }}
                        </span>
                    </button>

                    <div v-if="showFavoriteDropdown" class="dropdown-menu-custom shadow" @click.stop>
                        <template v-if="favorites.length > 0">
                            <div
                                v-for="item in favorites"
                                :key="item.id"
                                class="dropdown-item d-flex justify-content-between align-items-center"
                            >
                                <div
                                class="d-flex align-items-center gap-2 cursor-pointer"
                                @click="viewProduct(item.id)"
                                >
                                <img :src="item.image" class="fav-thumb" />
                                <span class="text-truncate">{{ item.name }}</span>
                                </div>
                                <button
                                class="btn btn-sm btn-outline-danger"
                                @click.stop="removeFavorite(item.id)"
                                >
                                ✕
                                </button>
                            </div>
                        </template>
                        <div v-else class="text-center text-muted p-2">Chưa có sản phẩm</div>
                    </div>
                </div>

                <router-link to="/giohang" class="btn btn-success">Giỏ hàng</router-link>
                <button class="btn btn-success" @click="goToUser">Tài khoản</button>
                <button @click="handleDangXuat" class="btn btn-outline-danger">Đăng xuất</button>
                </div>
                </div>
            </div>
        </header>
    </div>
</template>

<style scoped>

</style>