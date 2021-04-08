<template>
  <div>
    <Search @search-value="search"/>
    <div v-if="isLoadedData">
      <div class="py-6" v-for="row in books" :key="row.id">
        <h2 class="text-2xl text-blue-4 text-left pb-2">{{  row.name | capitalize }}</h2>
        <swiper
          class="swiper"
          :key="swiperOption.slidesPerView"
          :options="swiperOption"
          @click="handleClickSlide"
        >
          <swiper-slide
              v-for="book in row.descriptions"
              :id="book.id"
              :key="book.id">
            <div v-if="book.scan_book == null">
              <Cover
                :computed-class-width="computedClassWidth"
                :is-slider="true"
                :description="book"/>
            </div>
            <div @click="handleClickSlide(book.id)" v-else>
              <div class="cover-img">
                <img :src="book.scan_book" :class="computedClassWidth + ' cover'"
                  :is-slider="true" />
              </div>
            </div>
          </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
    </div>
    <Loader v-else/>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import Cover from '@/components/Cover.vue'
import Loader from '@/components/Loader.vue'
import Search from '@/components/Search.vue'
import resizeCoverMixin from '@/mixins/resizeCoverMixin'

export default {
  components: {
    Search,
    Swiper,
    SwiperSlide,
    Cover,
    Loader
  },
  mixins: [resizeCoverMixin],
  data () {
    return {
      books: null,
      isLoadedData: false,
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleClickSlide (e) {
      const slide = e.target.closest('.swiper-slide')
      if (slide) {
        this.$router.push({ name: 'book', params: {id: slide.id} })
      }
    },
    async fetchData () {
      try {
        const url = 'api/lib/main'
        const response = await this.$http.get(url)
        this.books = response.data.data.list
        this.isLoadedData = true
      } catch (err) {
        if (err.response) {
          console.log('Server Error:', err)
        }
        this.isLoadedData = true
      }
    },
    search () {
      this.$router.push({ name: 'search' })
    }
  }
}
</script>

<style scoped>
.cover-img {
  cursor: pointer;
}
</style>
