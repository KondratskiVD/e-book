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
          v-if="books.length > 0">
        <div class="flex flex-col md:grid xl:grid-cols-3auto md:grid-cols-2auto gap-4 py-6">
          <div v-for="(book, index) in books" :key="index">
            <div
                @click="handleClickSlide(book.id)"
                class="flex item-book mb-4">
              <template v-if="!book.scan_book">
                <Cover
                    class="md:w-1/2"
                    :computed-class-width="computedClassWidth"
                    :description="book.description"/>
              </template>
              <template v-else>
                <img :src="book.scan_book" :class="computedClassWidth + 'cover'"/>
              </template>
              <div class="book-text ml-5 text-left md:w-1/2">
                <p class="md:text-xl">{{book.title}}</p>
                <p class="text-grey-4 mt-6">ISBN: {{  book.isbn }}</p>
                <p class="mt-6">{{  book.author}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-100" v-if="(total / per_page) > 1">
          <paginate
              :page-count="Math.ceil(total/per_page)"
              v-model="current_page"
              :next-class="'hidden'"
              :prev-class="'hidden'"
              :click-handler="clickCallback"
              :container-class="'pagination'">
          </paginate>
        </div>
      </div>
      <div
        v-else
      >
        <p class="text-left pt-12 text-xl">Нiчого не знайдено</p>
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
import Paginate from 'vuejs-paginate'
import _ from 'lodash'
import {SET_QUERY_WORD} from '@/constats'

export default {
  name: 'Result',
  mixins: [resizeCoverMixin],
  components: {
    Search,
    Cover,
    Loader,
    Paginate
  },
  data () {
    return {
      books: [],
      isLoadedData: false,
      loadingNextData: false,
      last_page: null,
      current_page: 1,
      total: null,
      per_page: null
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
  methods: {
    clickCallback (pageNum) {
      this.fetchData(pageNum)
    },
    handleClickSlide (id) {
      this.$router.push({ name: 'book', params: {id} })
    },
    async fetchData (page = 1) {
      this.isLoadedData = false
      try {
        const url = 'api/lib/search'
        const searchParams = _.cloneDeep(this.getSearchParams)
        searchParams.page = page
        const transformSearchParams = this.transformParams(searchParams)

        const response = await this.$http.get(url, { params : { ...transformSearchParams }})
        if (response.data.data.items.length > 0) {
          this.books = this.transformData(response.data.data.items)
          this.last_page = response.data.data.last_page
          this.per_page = response.data.data.per_page
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
    transformData (data) {
      return data.map(book => ({
        title: book.description.title ?? 'Немає назви',
        isbn: book.description.isbn[0]?.name ?? 'Немає ISBN',
        author: book.description.author?.name ?? 'Немає автора',
        scan_book: book.description.scan_book ?? false,
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
      this.$store.commit(SET_QUERY_WORD, {s: ''})
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

.cover {
  background-size: 100% 100%;
  text-align: left;
  position: relative;
  border: #AEADC3 1px solid;
  -webkit-box-shadow: 0px 0px 19px -10px rgba(0,0,0,0.81);
  -moz-box-shadow: 0px 0px 19px -10px rgba(0,0,0,0.81);
  box-shadow: 0px 0px 19px -10px rgba(0,0,0,0.81);
  overflow: hidden;
}

.h-170 {
  height: 170px;
  width: 115px;
}
.h-250 {
  height: 250px;
  width: 190px;
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

