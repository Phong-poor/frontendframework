<script setup>

</script>

<template>

</template>

<style scoped>
    .post-excerpt {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .post-thumb {
      width: 120px; height: 80px; object-fit: cover; border-radius: .5rem;
    }
    @media (max-width: 575.98px) {
      .post-thumb { width: 100%; height: 160px; }
    }
</style>