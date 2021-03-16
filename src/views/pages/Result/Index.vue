<template>
  <div>
    <Search
      :total="total"
      @search-value="search"
    />
    <div v-if="isLoadedData">
      <div class="flex justify-betwesearch-valueen items-center mt-6">
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
      <div
          v-if="books.length > 0"
          class="flex flex-col md:grid xl:grid-cols-3auto md:grid-cols-2auto gap-4 py-6">
        <div v-for="(book, index) in books" :key="index">
          <div
              @click="handleClickSlide(book.id)"
              class="flex item-book">
            <Cover
                class="w-1/2 view-book"
                :height="'h-250'"
              :description="book.description"/>
            <div class="book-text ml-5 text-left w-1/2">
              <p class="text-xl">{{book.title}}</p>
              <p class="text-grey-4 mt-6">ISBN: {{  book.isbn }}</p>
              <p class="mt-6">{{  book.author}}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
      >
        <p class="text-left pt-12 text-xl">Нiчого не знайдено</p>
      </div>
      <div v-if="loadingNextData">
        <div class="spinner flex justify-center items-center py-12">
          <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      </div>
    </div>
    <Loader v-else/>
  </div>
</template>

<script>
import Cover from '@/components/Cover.vue'
import Loader from '@/components/Loader'
import Search from '@/components/Search'

export default {
  name: 'Result',
  components: {
    Search,
    Cover,
    Loader
  },
  data () {
    return {
      books: [],
      isLoadedData: false,
      loadingNextData: false,
      last_page: null,
      current_page: null,
      total: null
    }
  },
  computed: {
    getSearchParams () {
      return this.$store.state.searchParams
    }
  },
  beforeMount () {
    this.fetchData()
  },
  mounted () {
    this.scroll()
  },
  methods: {
    handleClickSlide (id) {
      this.$router.push({ name: 'book', params: {id} })
    },
    async fetchData () {
      this.isLoadedData = false
      try {
        const url = 'api/lib/search'
        const response = await this.$http.get(url, { params : { ...this.getSearchParams }})

        this.books = this.transformData(response.data.data.items)
        this.last_page = response.data.data.last_page
        this.current_page = response.data.data.current_page
        this.total = response.data.data.total
        this.isLoadedData = true
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log('Server Error:', err)
        } else if (err.request) {
          // client never received a response, or request never left
          console.log('Network Error:', err)
        } else {
          console.log('Client Error:', err)
        }
        this.isLoadedData = true
      }
    },
    fetchNextData () {
      this.loadingNextData = true
      const url = 'api/lib/search'
      const query = this.$route.params.query
      const page = ++this.current_page
      this.$http.get(url, {params : {s: query, page}})
        .then((response) => {
          const transformedData = this.transformData(response.data.data.items)
          this.books = this.books.concat(transformedData)
          this.loadingNextData = false
        })
        .catch((error) => {
          console.error(error)
          this.loadingNextData = false
        })
    },
    scroll () {
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
        if (bottomOfWindow && this.last_page > this.current_page) {
          this.fetchNextData()
        }
      }
    },
    transformData (data) {
      return data.map(book => ({
        title: book.description.title ?? 'Немає назви',
        isbn: book.description.isbn[0]?.name ?? 'Немає ISBN',
        author: book.description.author?.name ?? 'Немає автора',
        description: book.description,
        id: book.description.id
      })
      )
    },
    goBack () {
      this.$router.back()
    },
    search () {
      this.fetchData()
    }
  }
}

</script>

<style scoped>
.input-icons span {
  position: absolute;
  left: 10px;
}
.view-book {
  width: 190px;
}
@media screen and (max-width: 450px) {
  .item-book {
    flex-direction: column;
  }
  .book-text {
    margin-left: 0;
    margin-top: 20px;
    margin-bottom: 50px;
  }
}
.spinner {
  width: 100%;
  left: 0;
  bottom: 0
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

