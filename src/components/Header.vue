<template>
  <div class="flex">
    <div class="input-icons w-full">
      <span class="w-auto flex justify-end items-center text-icon p-2">
        <svg
            class="h-6 w-6 text-gray-300 icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </span>
      <input
          class="input-field w-full"
          type="text"
          placeholder="Назва книжки або автора"
          v-on:keyup.enter="searchBooks($event)">
    </div>
    <button class="text-icon p-2 pl-4 pr-4">
      <p class="font-semibold text-xs">
        <svg
            class="h-6 w-6 text-gray-300 transform rotate-90"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
        </svg>
      </p>
    </button>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    searchBooks(event) {
      const querySearch = event.target.value
      this.$router.push({ name: 'search', params: {query: querySearch} })
      console.log(event.target.value)
    },
  }
}
</script>

<style scoped>
.input-icons span {
  position: absolute;
  left: 10px;
}

.input-icons {
  width: 100%;
  position: relative;
}

input.input-field {
  padding: 10px 10px 10px 60px !important;
  background-color: #F1F4F8 !important;
  border: 0 !important;
  border-radius: 10px !important;
}
input {
  outline: none;
}
input.input-field::placeholder {
  color: #AEADC3;
  font-size: 14px;
}

button:focus {
  outline: 0;
}
</style>
