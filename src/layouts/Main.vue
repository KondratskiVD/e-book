<template>
  <div class="max-w-screen-xl m-auto px-5">
    <Header/>
    <router-view/>
  </div>
</template>

<script>

import Header from "@/components/Header";
export default {
  components: {
    Header
  },
  data () {
    return {

    }
  },
  methods: {

  }
}

</script>

<style scoped>

</style>
