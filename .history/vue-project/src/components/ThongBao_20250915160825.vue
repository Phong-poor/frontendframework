<script setup>
defineProps({
    message: String
})
</scipt>
<template>
    <div class="message">
        <span>{{message}}</span>
    </div>
</template>

<style scoped>
.thong-bao {
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}
</style>