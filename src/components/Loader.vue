<template>
  <div class="spinner flex justify-center items-center fixed">
    <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
  </div>
</template>

<script>
export default {
name: "Loader"
}
</script>

<style scoped>
  .spinner {
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0
  }
  .loader {
    border-top-color: #9082C9;
    -webkit-animation: spinner 1.5s linear infinite;
    animation: spinner 1.5s linear infinite;
  }

  @-webkit-keyframes spinner {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spinner {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
