<template>
  <div>
    <div v-if="isLoadedData">
      <div class="flex justify-between items-center">
        <p class="text-blue-1 cursor-pointer">
        <span class="flex justify-end items-center text-icon p-2">
          <svg xmlns="http://www.w3.org/2000/svg"
               fill="none"
               @click="goBack"
               viewBox="0 0 24 24"
               class="h-6 w-6 text-gray-300 icon"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </span>
        </p>
        <p class="text-2xl text-dark">Пошук</p>
        <p/>
      </div>


      <div class="grid grid-cols-3auto gap-4 py-8">
        <div v-for="(book, index) in books" :key="index">
          <div
              @click="handleClickSlide(book.id)"
              class="flex">
            <Cover
                class="w-1/2"
                :height="'h-250'"
              :description="book.description"/>
            <div class="ml-5 text-left w-1/2">
              <p class="text-xl">{{book.title}}</p>
              <p class="text-grey-4 mt-6">ISBN: {{  book.isbn }}</p>
              <p class="mt-6">{{  book.author}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loader v-else/>
  </div>
</template>

<script>
import Cover from '@/components/Cover.vue';
import Loader from "@/components/Loader";

export default {
  name: 'Search',
  components: {
    Cover,
    Loader
  },
  data() {
    return {
      books: null,
      isLoadedData: false,
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    handleClickSlide(id) {
      this.$router.push({ name: 'book', params: {id: id} })
    },
    async fetchData() {
      try {
        const url = `api/lib/search`
        const query = this.$route.params.query
        const response = await this.$http.get(url, {params : {s: query}})
        this.books = this.transformData(response.data.data.items)
        this.isLoadedData = true
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log("Server Error:", err)
        } else if (err.request) {
          // client never received a response, or request never left
          console.log("Network Error:", err)
        } else {
          console.log("Client Error:", err)
        }
        this.isLoadedData = true
      }
    },
    transformData(data) {
      const transformedData = data.map(book => ({
        title: book.description.title ?? 'Немає назви',
        isbn: book.description.isbn[0]?.name ?? 'Немає ISBN',
        author: book.description.author?.name ?? 'Немає автора',
        description: book.description,
        id: book.description.id
        })
      )
      return transformedData
    },
    goBack () {
      this.$router.back()
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

