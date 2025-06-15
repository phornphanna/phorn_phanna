<template>
  <div class="network-error-overlay" >
    <div class="error-box text-center">
      <i class="bi bi-wifi-off fs-1 text-danger mb-3"></i>
      <h3 class="text-danger fw-bold mb-2">Connection Lost</h3>
      <p class="text-muted mb-4">
        Server is unreachable or your network is too slow. Please check your internet or try again later.
      </p>
      <button class="btn btn-outline-danger" @click="reloadPage">
        <i class="bi bi-arrow-clockwise me-2"></i> Retry
      </button>
    </div>
  </div>
</template>

<script setup>



const reloadPage = () => {
  
};

</script>

<style scoped>

</style>
