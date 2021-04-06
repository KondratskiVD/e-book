<template>
  <div>
    <Search
      @search-value="search"
    />
    <div v-if="isLoadedData">
      <div class="flex justify-between items-center pt-6">
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
        <p class="text-2xl text-dark">Про книгу</p>
        <p/>
      </div>
      <div class="grid-container  py-6">
        <div class="grid-item item1">
          <div v-if="!book.scan_book">
            <Cover
              :computed-class-width="computedClassWidth"
              :key="computedClassWidth"
              class="view-book pr-4"
              :description="book"/>
          </div>
          <div v-else>
            <img :src="book.scan_book" class="view-book pr-4 cover"/>
          </div>
        </div>
        <div class="grid-item item2">
          <p class="md:text-3xl">{{book.title}}</p>
          <p class="text-grey-4 mt-6">ISBN <span v-for="(isbn, index) in book.isbn" :key="index">{{ isbn.name }}</span></p>
          <p class="mt-6">{{  book.author}}</p>
        </div>
        <div class="grid-item item3 flex justify-start">
          <div class="mr-6">
            <p class="text-grey-4 text-sm">Жанр</p>
            <p class="mt-2">
              {{book.rubric}}
            </p>
            <div class="flex w-full mt-6">
              <div CLASS="mr-6">
                <p class="text-grey-4 text-sm">Рiк</p>
                <p>{{ book.year }}</p>
              </div>
              <div>
                <p class="text-grey-4 text-sm">Видачi</p>
                <p>{{ book.count_reads }}</p>
              </div>
            </div>
          </div>
          <div>
            <p class="text-grey-4 text-sm">Видавництво</p>
            <p  class="mt-2">
              {{ book.publication }}
            </p>
            <p class="text-grey-4 mt-6 text-sm">Рейтинг</p>
            <star-rating
                :star-size="25"
                :show-rating="false"
                v-model="book.rating"/>
          </div>
        </div>
        <div class="grid-item item4">
          <p class="text-grey-4 md:mt-8 text-sm ">Наявнiсть у бiблiотеках:</p>
          <div class="flex justify-between">
            <ul class="px-0 w-full" v-if="book.libraries.length > 0">
              <li
                  v-for="library in book.libraries"
                  :key="library.id"
                  class="border-b-2 w-full list-none flex justify-between items-end rounded-sm py-3">
                {{ library.title }}
                <span class="bg-blue-1 rounded-md p-3 text-green-1 text-sm font-bold ml-5 whitespace-nowrap">
                В НАЯВНОСТI
              </span>
              </li>
            </ul>
            <span
                v-else
                class="bg-red-1 rounded-md p-3 text-red-1 text-sm font-bold">
            НЕМАЄ В НАЯВНОСТI
          </span>
          </div>
        </div>
      </div>
    </div>
    <Loader v-else/>
  </div>
</template>

<script>
import Cover from '@/components/Cover.vue'
import StarRating from 'vue-star-rating'
import Loader from '@/components/Loader'
import Search from '@/components/Search'
import resizeCoverMixin from '@/mixins/resizeCoverMixin'
export default {
  name: 'Book',
  mixins: [resizeCoverMixin],
  components: {
    Search,
    StarRating,
    Cover,
    Loader
  },
  data () {
    return {
      isLoadedData: false,
      bookmark: 'none',
      book: null
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      const bookId = this.$route.params.id
      const url = `api/lib/books/${bookId}`
      this.$http.get(url)
        .then((response) => {
          this.book = this.transformData(response.data.data)
          this.isLoadedData = true
        })
        .catch((error) => {
          console.error(error)
          this.isLoadedData = true
        })
    },
    transformData (data) {
      return {
        title: data.title ?? 'Немає назви',
        isbn: data.isbn ?? [],
        author: data.author?.name ?? 'Немає автора',
        year: data.year ?? 'Немає року',
        rating: data.rating ?? 5,
        libraries: data.libraries,
        publication: data.publication?.name ?? '-',
        count_reads: data.count_reads ?? 0,
        rubric: data.rubric?.name ?? '-',
        scan_book: data.scan_book ?? false

      }
    },
    goBack () {
      this.$router.back()
    },
    search (value) {
      this.$router.push({ name: 'search', params: {query: value} })
    }
  }
}
</script>

<style scoped>

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

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 10px;
  text-align: left;
  padding: 10px;
}

.item1 {
  grid-column: 1/2;
  grid-row: 1/4;
}

.item2 {
  grid-column: 2/4;
  grid-row: 1/2;
}
.item3 {
  grid-column: 2/4;
  grid-row: 2/3;
}
.item4 {
  grid-column: 2/4;
  grid-row: 3/4;
}
@media screen and (min-width: 1025px) {
  .view-book {
    width: 250px;
  }
}
@media screen and (max-width: 1024px) {
  .view-book {
    width: 190px;
  }
}
@media screen and (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr 1fr;
  }
    .item1 {
      grid-column: 1/2;
      grid-row: 1/2;
    }
    .item2 {
      grid-column: 2/3;
      grid-row: 1/2;
    }
    .item3 {
      grid-column: 1/3;
      grid-row: 2/3;
      flex-direction: column;
    }
    .item4 {
      grid-column: 1/3;
      grid-row: 3/4;
    }
}
@media screen and (max-width: 450px) {
  .item2 {
    overflow: hidden;
  }
  .view-book {
    width: 120px;
  }
}

</style>
