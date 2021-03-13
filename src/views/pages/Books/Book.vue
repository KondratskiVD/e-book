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
        <p class="text-2xl text-dark">Про книгу</p>
        <p/>
      </div>
      <div class="grid grid-cols-3 gap-16 grid-flow-col py-8">
        <div>
          <div>
            <Cover
                :height="'h-450'"
                :description="book"/>
          </div>
          <!--        <div class="flex justify-between py-6">-->
          <!--          <p class="text-pink text-sm cursor-pointer">-->
          <!--            <span>-->
          <!--              <svg-->
          <!--                  xmlns="http://www.w3.org/2000/svg"-->
          <!--                  fill="none"-->
          <!--                  viewBox="0 0 24 24"-->
          <!--                  class="h-6 w-6 icon mr-1 inline"-->
          <!--                  stroke="currentColor">-->
          <!--                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />-->
          <!--              </svg>-->
          <!--            </span>-->
          <!--            АУДIО-->
          <!--            <span>50 грн.</span>-->
          <!--          </p>-->
          <!--          <p class="text-sm text-blue-2 cursor-pointer">-->
          <!--            <span>-->
          <!--              <svg-->
          <!--                  xmlns="http://www.w3.org/2000/svg"-->
          <!--                  fill="none"-->
          <!--                  viewBox="0 0 24 24"-->
          <!--                  class="h-6 w-6 icon mr-1 inline"-->
          <!--                  stroke="currentColor">-->
          <!--                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />-->
          <!--              </svg>-->
          <!--            </span>-->
          <!--            ЕЛЕКТРОННА <span>99 грн.</span></p>-->
          <!--        </div>-->
        </div>
        <div class="col-span-2 text-left">
          <p class="text-3xl">{{book.title}}</p>
          <p class="text-grey-4 mt-6">ISBN: {{  book.isbn }}</p>
          <p class="mt-6">{{  book.author}}</p>
          <div class="flex justify-between mt-6">
            <div>
              <p class="text-grey-4 text-sm">Жанр</p>
              <p class="mt-2">Художня лiтература</p>
              <div class="flex justify-between w-full mt-6">
                <div>
                  <p class="text-grey-4 text-sm">Рiк</p>
                  <p>{{ book.year }}</p>
                </div>
                <div>
                  <p class="text-grey-4 text-sm">Видачi</p>
                  <p>1245</p>
                </div>
              </div>
            </div>
            <div>
              <p class="text-grey-4 text-sm">Видавництво</p>
              <p  class="mt-2">Х.; Белгород, Клуб семейного отдыха</p>
              <p class="text-grey-4 mt-6 text-sm">Рейтинг</p>
              <star-rating
                  :star-size="25"
                  :show-rating="false"
                  v-model="book.rating"/>
            </div>
          </div>
          <p class="text-grey-4 mt-8 text-sm">Наявнiсть у бiблiотеках:</p>
          <div class="flex justify-between">
            <ul class="px-0 w-full" v-if="book.libraries.length > 0">
              <li
                  v-for="library in book.libraries"
                  :key="library.id"
                  class="border-b-2 w-full list-none flex justify-between items-end rounded-sm py-3">
                {{ library.title }}
                <span class="bg-blue-1 rounded-md p-3 text-green-1 text-sm font-bold ml-5">
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
import Cover from '@/components/Cover.vue';
import StarRating from 'vue-star-rating'
import Loader from "@/components/Loader";
export default {
  name: "Book",
  components: {
    StarRating,
    Cover,
    Loader
  },
  data() {
    return {
      isLoadedData: false,
      bookmark: 'none',
      book: null
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const bookId = this.$route.params.id
      console.log(bookId)
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
    transformData(data) {
      return{
        title: data.title ?? 'Немає назви',
        isbn: data.isbn[0]?.name ?? 'Немає ISBN',
        author: data.author?.name ?? 'Немає автора',
        year: data.year ?? 'Немає року',
        rating: data.rating ?? 5,
        libraries: data.libraries
      }
    },
    goBack () {
      this.$router.back()
    }
  },
}
</script>

<style scoped>
  select.bg-white {
    background: white !important;
  }
</style>
