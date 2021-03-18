<template>
  <div>
    <Search
      @search-value="search"
    />
    <div v-if="isLoadedData">
      <div class="py-6" v-for="(row, index) in books" :key="index">
        <h2 class="text-2xl text-blue-4 text-left pb-2">{{  row.name | capitalize }}</h2>
        <swiper
            class="swiper"
            :key="swiperOption.slidesPerView"
            :options="swiperOption"
        >
          <swiper-slide v-for="(book, index) in row.descriptions" :key="index">
            <div @click="handleClickSlide(book.id)">
              <Cover
                  :computed-class-width="computedClassWidth"
                  :is-slider="true"
                  :description="book"/>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
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
        pagination: {
          el: '.swiper-pagination',
          clickable: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleClickSlide (id) {
      this.$router.push({ name: 'book', params: {id} })
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

</style>

