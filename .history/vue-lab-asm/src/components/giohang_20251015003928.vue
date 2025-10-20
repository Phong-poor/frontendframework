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
    <div class="page-wrapper">

    </div>
    
</template>