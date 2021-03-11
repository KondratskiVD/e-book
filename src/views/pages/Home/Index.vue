<template>
  <div>
    <div class="flex">
      <!--    <div class="relative px-4 sm:px-6 lg:px-8">-->
      <!--      <nav class="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">-->
      <!--        <div class="hidden md:block md:ml-10 md:pr-4 md:space-x-8">-->
      <!--          <router-link v-for="(link, index) in links"-->
      <!--                       :key="index"-->
      <!--                       class="font-medium text-gray-500 hover:text-gray-900"-->
      <!--                       :to="link.url"-->
      <!--                       tag="a"-->
      <!--          >{{ link.title }}</router-link>-->
      <!--        </div>-->
      <!--      </nav>-->
      <!--    </div>-->
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
        <input class="input-field w-full" type="text" placeholder="Назва книжки або автора" v-model="model">
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

    <div class="py-6" v-for="row in books" :key="row.id">
      <h2 class="text-2xl text-blue-4 text-left pb-2">{{  row.name | capitalize }}</h2>
      <swiper
          class="swiper"
          :options="swiperOption"
      >
        <swiper-slide v-for="book in row.descriptions" :key="book.id">
          <Cover
            :description="book"
          />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
<!--    <div class="pt-10 flex justify-between items-center">-->
<!--      <h2 class="text-2xl text-blue-4 inline-block">Популярнi жанри</h2>-->
<!--      <p class="text-blue-1 cursor-pointer">Бiльше</p>-->
<!--    </div>-->
<!--    <div class="py-6">-->
<!--      <div class="grid grid-cols-6 gap-4">-->
<!--        <div v-for="(genre, index) in genres" :key="index">-->
<!--          <p-->
<!--              :style="{background: randomColor[index]}"-->
<!--              class="py-5 text-white"-->
<!--          >{{ genre }}</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="pt-10 flex justify-between items-center">-->
<!--      <h2 class="text-2xl text-blue-4 inline-block">Популярнi автори</h2>-->
<!--      <p class="text-blue-1 cursor-pointer">Бiльше</p>-->
<!--    </div>-->
<!--    <div class="py-6">-->
<!--      <div class="grid grid-cols-10 gap-4">-->
<!--        <div>-->
<!--          <img-->
<!--              @click="viewBook"-->
<!--              src="@/assets/images/2021-03-10_08-54.png" alt="">-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import 'vue-simple-suggest/dist/styles.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import Cover from '@/components/Cover.vue';

export default {
  components: {
    Swiper,
    SwiperSlide,
    Cover
  },
  data() {
    return {
      books: null,
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      model: '',
      selected: {
        product_name: null,
        id: null
      },
      getList: '',
      foundText: null,
      loading: true
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const url = `https://ebook.unltd.ws/api/lib/main`
        const response = await this.$http.get(url)
        this.books = response.data.data.list
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
      }
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

input.input-field::placeholder {
  color: #AEADC3;
  font-size: 14px;
}

button:focus {
  outline: 0;
}
</style>

