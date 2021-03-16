
export default {
  methods: {
    onFiltered (data = {}) {
      const searchParams = { ...this.searchParams, ...data }
      this.$router.replace({ query: searchParams })
      this.searchParams = searchParams
    }
  }
}
