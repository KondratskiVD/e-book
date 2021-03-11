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
      <vue-simple-suggest
          pattern="\w+"
          v-model="model"
          :list="getList"
          :max-suggestions="5"
          :min-length="3"
          :debounce="200"
          :filter-by-query="false"
          :prevent-submit="true"
          :controls="{
                  selectionUp: [38, 33],
                  selectionDown: [40, 34],
                  select: [13, 36],
                  hideList: [27, 35]
                }"
          mode="input"
          :nullable-select="true"
          ref="suggestComponent"
          value-attribute="product_id"
          display-attribute="product_name"
          @select="onSuggestSelect"
          class="w-full"
      >
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

        <!--        <template slot="misc-item-above" slot-scope="{ suggestions, query }">-->

        <!--          <template v-if="suggestions.length > 0">-->
        <!--            <div class="misc-item">-->
        <!--              <span>{{ suggestions.length }} предложенных вариантов...</span>-->
        <!--            </div>-->
        <!--            <hr>-->
        <!--          </template>-->

        <!--          <div class="misc-item" v-else>-->
        <!--            <span>Нет результатов поиска</span>-->
        <!--          </div>-->
        <!--        </template>-->

        <div slot="suggestion-item" slot-scope="scope" :title="scope.suggestion.description">
          <div class="text">
            <span v-html="boldenSuggestion(scope)"></span>
          </div>
        </div>

        <!--        <div class="misc-item" slot="misc-item-below" slot-scope="{ suggestions }">-->
        <!--          <span>Загрузка...</span>-->
        <!--        </div>-->
      </vue-simple-suggest>
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
    <div class="pt-10 flex justify-between items-center">
      <h2 class="text-2xl text-blue-4 inline-block">Популярнi книжки</h2>
      <p class="text-blue-1 cursor-pointer">Бiльше</p>
    </div>
    <div class="py-6">
      <div class="grid grid-cols-6 gap-4">
        <div>
          <img src="@/assets/images/2021-03-09_15-42.png" alt="">
        </div>
        <div>
          <img src="@/assets/images/2021-03-09_15-50.png" alt="">
        </div>
        <div>
          <img src="@/assets/images/2021-03-09_15-52.png" alt="">
        </div>
        <div>
          <img src="@/assets/images/2021-03-09_15-53.png" alt="">
        </div>
        <div>
          <img src="@/assets/images/2021-03-09_15-55.png" alt="">
        </div>
        <div>
          <img src="@/assets/images/2021-03-09_15-42.png" alt="">
        </div>
      </div>
    </div>
    <div class="pt-10 flex justify-between items-center">
      <h2 class="text-2xl text-blue-4 inline-block">Популярнi жанри</h2>
      <p class="text-blue-1 cursor-pointer">Бiльше</p>
    </div>
    <div class="py-6">
      <div class="grid grid-cols-6 gap-4">
        <div v-for="(genre, index) in genres" :key="index">
          <p
              :style="{background: randomColor[index]}"
              class="py-5 text-white"
          >{{ genre }}</p>
        </div>
      </div>
    </div>
    <div class="pt-10 flex justify-between items-center">
      <h2 class="text-2xl text-blue-4 inline-block">Популярнi автори</h2>
      <p class="text-blue-1 cursor-pointer">Бiльше</p>
    </div>
    <div class="py-6">
      <div class="grid grid-cols-10 gap-4">
        <div>
          <img
              @click="viewBook"
              src="@/assets/images/2021-03-10_08-54.png" alt="">
        </div>
        <div>
          <img src="@/assets/images/2021-03-10_09-04.png" alt="">
        </div>
        <div>
          <img src="@/assets/images/2021-03-10_09-05.png" alt="">
        </div>
        <div>
          <img src="@/assets/images/2021-03-10_09-06.png" alt="">
        </div>
        <div>
          <img src="@/assets/images/2021-03-10_09-06.png" alt="">
        </div>
        <div>
          <img src="@/assets/images/2021-03-10_08-54.png" alt="">
        </div>
        <div>
          <img src="@/assets/images/2021-03-10_09-04.png" alt="">
        </div>
        <div>
          <img src="@/assets/images/2021-03-10_09-05.png" alt="">
        </div>
        <div>
          <img src="@/assets/images/2021-03-10_09-06.png" alt="">
        </div>
        <div>
          <img src="@/assets/images/2021-03-10_09-06.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSimpleSuggest from 'vue-simple-suggest'
import 'vue-simple-suggest/dist/styles.css'
import axios from 'axios'

export default {
  components: {
    VueSimpleSuggest
  },
  data() {
    return {
      links: [
        {url: 'home', title: 'Головна'},
        {url: 'books', title: 'Книжки'}
      ],
      genres: [
        'Iсторичнi',
        'Детективи',
        'Художня',
        'Готична',
        'Автобіографічнi',
        'Пригодницькi'
      ],
      randomColor: [
        '#3183CE',
        '#21A28E',
        '#7C4CAB',
        '#6FB742',
        '#AB4C4C',
        '#7A9346'
      ],
      model: '',
      selected: {
        product_name: null,
        id: null
      },
      foundText: null,
      loading: true
    }
  },
  methods: {
    viewBook() {
      this.$router.push({ name: 'book', params: {id: 1} })
    },
    getList(inputValue) {
      return new Promise((resolve, reject) => {
        axios.get('/admin/cabinet/search-product', {
          params: {
            searchValue: inputValue,
            lang_id: 1
          }
        })
            .then(response => {
              const result = response.data.data
              this.foundText = result
              resolve(result)
            })
            .catch(error => {
              this.loading = false
              reject(error)
            })
      })
    },
    onSuggestSelect(suggest) {
      this.selected = suggest
    },
    boldenSuggestion(scope) {
      if (!scope) return scope
      const {suggestion, query} = scope
      const result = this.$refs.suggestComponent.displayProperty(suggestion)
      if (!query) {
        return result
      }
      const texts = query.split(/[\s-_/\\|.]/gm).filter(t => !!t) || ['']

      if (typeof result === 'string') {
        return result.replace(new RegExp(`(.*?)(${texts.join('|')})(.*?)`, 'gi'), '$1<b>$2</b>$3')
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

