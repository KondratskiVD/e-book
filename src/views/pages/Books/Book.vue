<template>
  <div>
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
      <p class="text-pink cursor-pointer flex"
        @click="addToBookmark"
      >
        <svg xmlns="http://www.w3.org/2000/svg"
             :fill="bookmark"
             class="h-6 w-6 icon mr-3"
             viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span>
          в закладки
        </span>
      </p>
    </div>
    <div class="grid grid-cols-3 gap-16 grid-flow-col py-8">
      <div>
        <div>
          <img src="@/assets/images/2021-03-09_15-42.png" alt="">
        </div>
        <div class="flex justify-between py-6">
          <p class="text-pink text-sm cursor-pointer">
            <span>
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="h-6 w-6 icon mr-1 inline"
                  stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </span>
            АУДIО
            <span>50 грн.</span>
          </p>
          <p class="text-sm text-blue-2 cursor-pointer">
            <span>
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="h-6 w-6 icon mr-1 inline"
                  stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </span>
            ЕЛЕКТРОННА <span>99 грн.</span></p>
        </div>
      </div>
      <div class="col-span-2 text-left">
        <p class="text-3xl">Алиса в стране чудес ч.1. Алиса в зазеркалье</p>
        <p class="text-grey-4 mt-6">ISBN: 978-966-343-740-8</p>
        <p class="mt-6">Кэролл Л.,  (Орла,  В [Перекладач],  Калиновський, Г [Iлюстратор]</p>
        <div class="flex justify-between mt-6">
          <div>
            <p class="text-grey-4 text-sm">Жанр</p>
            <p class="mt-2">Художня лiтература</p>
            <div class="flex justify-between w-full mt-6">
              <div>
                <p class="text-grey-4 text-sm">Рiк</p>
                <p>2003</p>
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
                v-model="rating"/>
          </div>
        </div>
        <p class="text-grey-4 mt-8 text-sm">Бiблiотека</p>
        <div class="flex justify-between">
          <select v-model="selectedLibrary" class="max-w-lg bg-white w-full border-b-2">
            <option v-for="(Library, index) in Libraries" :key="index">{{Library}}</option>
          </select>

          <span class="bg-blue-1 rounded-md p-3 text-green-1 text-sm font-bold">
            В НАЯВНОСТI
          </span>
        </div>
        <button class="bg-green-1 rounded-md py-5 px-10 text-white text-xl mt-8 shadow-2xl font-bold">
          ЗАБРОНЮВАТИ В БIБЛIОТЕЦI
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
const Libraries = ['Бiблiотека №1', 'Бiблiотека №2']
export default {
  name: "Book",
  components: {
    StarRating
  },
  data() {
    return {
      bookmark: 'none',
      rating: 4,
      selectedLibrary: Libraries[0],
      Libraries,
    }
  },
  methods: {
    addToBookmark() {
      this.bookmark = this.bookmark === 'none' ? '#FE9780' : 'none'
    },
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  select.bg-white {
    background: white !important;
  }
</style>
