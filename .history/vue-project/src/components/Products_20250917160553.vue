<script setup>
const { products } = defineProps({
    products: Array
})
</script>

<template>
    <div class="row">
        <h1>Danh sách sản phẩm</h1>
        <div class="col col-md-3" v-for="product in products":key="product.id">
            <img :src="product.image" />
            <h3>{{ product.name }}</h3> <br/>
        </div>
    </div>
</template>