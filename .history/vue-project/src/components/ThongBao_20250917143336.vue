<template>
    <div class="message">
        <span>{{message}}</span>
    </div>
</template>
<script setup>
defineProps({
    message: String
})
</scipt>
<style scoped>
.message {
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}
</style>