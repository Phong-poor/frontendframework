<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const cart = computed(() => store.getters.cartItems)
const cartTotal = computed(() => store.getters.cartTotal)

const removeItem = (id) => {
  store.commit('REMOVE_FROM_CART', id)
}
</script>

<template>
    div.pag
    <div class="container mt-4">
        <h2>🛒 Giỏ hàng của bạn</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Tổng</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in cart" :key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.price * item.quantity }}</td>
                        <td><button class="btn btn-sm btn-danger" @click="removeItem(item.id)">Xóa</button></td>
                    </tr>
                </tbody>
            </table>
        <p class="fw-bold text-end">Tổng cộng: ${{ cartTotal }}</p>
    </div>
</template>