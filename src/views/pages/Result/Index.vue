<template>
  <div>
    <Search
      :total="total"
      @search-value="search"
    />
    <div v-if="isLoadedData">
      <div class="flex justify-between items-center mt-6">
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
              class="flex item-book mb-4">
            <Cover
                class="md:w-1/2"
                :computed-class-width="computedClassWidth"
              :description="book.description"/>
            <div class="book-text ml-5 text-left md:w-1/2">
              <p class="md:text-xl">{{book.title}}</p>
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
        <div class="spinner flex justify-center items-center py-16">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
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
import resizeCoverMixin from '@/mixins/resizeCoverMixin'

export default {
  name: 'Result',
  mixins: [resizeCoverMixin],
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
        const searchParams = this.transformParams(this.getSearchParams)
        const response = await this.$http.get(url, { params : { ...searchParams }})
        if (response.data.data.items.length > 0) {
          this.books = this.transformData(response.data.data.items)
          this.last_page = response.data.data.last_page
          this.current_page = response.data.data.current_page
          this.total = response.data.data.total
        } else {
          this.books = []
        }
        this.isLoadedData = true
      } catch (err) {
        if (err.response) {
          console.log('Server Error:', err)
        }
        this.isLoadedData = true
      }
    },
    fetchNextData () {
      this.loadingNextData = true
      const url = 'api/lib/search'
      const page = ++this.current_page
      this.$http.get(url, {params : {...this.getSearchParams, page}})
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
    transformParams (data) {
      const searchParams = {}
      const searchEntries = Object.entries(data)
      for (const [key, value] of searchEntries) {
        if (value !== null) {
          if (key !== 'authors') {
            searchParams[key] = value
          } else {
            searchParams['author'] = value
          }
        }
      }
      return searchParams
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
.spinner {
  width: 100%;
  left: 0;
  bottom: 0
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

