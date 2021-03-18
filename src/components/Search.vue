<template>
  <div>
    <div class="flex">
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
        <input
            class="input-field w-full h-12"
            type="text"
            placeholder="Назва книжки або автора"
            v-model="query"
            @blur="setKeyWord"
            v-on:keyup.enter="searchBooks($event)">
      </div>
      <button
          @click="openFilter"
          class="text-icon pl-4">
        <p class="font-semibold text-xs w-12 h-12 flex justify-center items-center">
          <svg
              :class="{'active-icon': showFilter}"
              class="h-6 w-6 transform rotate-90"
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
    <collapse-transition>
      <div v-if="showFilter" class="py-8">
        <p class="text-2xl text-dark text-left mb-8">Розширенний Пошук <span> - Знайдено {{ total }} книг(и)</span></p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-12">
          <SelectSuggest
            @filtered="onFiltered"
            :fields="REQUEST_FILTER_FIELDS.TYPES"
            :key="getSearchParams[REQUEST_FILTER_FIELDS.TYPES.keyWord]"
            class="filter-item"
          />
          <SelectSuggest
              @filtered="onFiltered"
              :fields="REQUEST_FILTER_FIELDS.AUTHORS"
              :min-length="2"
              :key="getSearchParams[REQUEST_FILTER_FIELDS.AUTHORS.keyWord]"
              class="filter-item"
          />
          <SelectSuggest
              @filtered="onFiltered"
              :fields="REQUEST_FILTER_FIELDS.AUDIENCES"
              :key="getSearchParams[REQUEST_FILTER_FIELDS.AUDIENCES.keyWord]"
              class="filter-item"
          />
          <SelectSuggest
              @filtered="onFiltered"
              :fields="REQUEST_FILTER_FIELDS.RUBRICS"
              :key="getSearchParams[REQUEST_FILTER_FIELDS.RUBRICS.keyWord]"
              class="filter-item"
          />
          <SelectSuggest
              @filtered="onFiltered"
              :fields="REQUEST_FILTER_FIELDS.PUBLISHERS"
              :min-length="2"
              :key="getSearchParams[REQUEST_FILTER_FIELDS.PUBLISHERS.keyWord]"
              class="filter-item"
          />
          <SelectSuggest
              @filtered="onFiltered"
              :fields="REQUEST_FILTER_FIELDS.LANGUAGES"
              :key="getSearchParams[REQUEST_FILTER_FIELDS.LANGUAGES.keyWord]"
              class="filter-item"
          />
        </div>
        <div class="pt-4">
          <div class="text-left">
            <span class="whitespace-nowrap text-label">ДІАПАЗОН ДАТ ПУБЛІКАЦІЇ</span>
          </div>
          <div class="flex">
            <datepicker
              v-model="defaultDateFrom"
              class="w-28"
              placeholder="дата від"
              minimum-view="year"
              @selected="selectDateFrom"
              :format="DatePickerFormat"
            />
            <div></div>
            <datepicker
              v-model="defaultDateTo"
              class="w-28 right-datepicker"
              placeholder="дата до"
              minimum-view="year"
              @selected="selectDateTo"
              :format="DatePickerFormat"
            />
          </div>
        </div>
        <div class="flex justify-end mt-4 sm:mt-0">
          <button
            @click="searchBooksByFilter"
            class="bg-green-1 text-white py-4 px-8 rounded-md shadow mr-0 mr-4">ПОШУК</button>
          <button class="text-grey-4 py-4 px-4 rounded-md border border-grey-button"
          @click="clearFilter">СКУСУВАТИ</button>
        </div>
      </div>
    </collapse-transition>
  </div>
</template>

<script>
import REQUEST_FILTER_FIELDS, {
  SET_FILTER_PARAMS,
  SET_QUERY_WORD,
  CLEAR_FILTER_PARAMS,
  SET_FILTER_DATE_FROM,
  SET_FILTER_DATE_TO
} from '@/constats'
import { CollapseTransition } from '@ivanv/vue-collapse-transition'
import SelectSuggest from '@/components/SelectSuggest'
import Datepicker from 'vuejs-datepicker'
import {mapState} from 'vuex'

export default {
  name: 'Search',
  props: {
    total: {
      default: 0
    }
  },
  components: {SelectSuggest, CollapseTransition, Datepicker},
  data () {
    return {
      REQUEST_FILTER_FIELDS,
      showFilter: false,
      DatePickerFormat: 'yyyy',
      query: null,
      defaultDateFrom: null,
      defaultDateTo: null
    }
  },
  computed: {
    ...mapState(['searchWords']),
    getSearchParams () {
      return this.$store.state.searchParams
    }
  },
  mounted () {
    this.query = this.getSearchParams.s
    this.defaultDateFrom = new Date(String(this.getSearchParams.date_from ?? '2000'))
    this.defaultDateTo = new Date(String(this.getSearchParams.date_to ?? '2020'))
  },
  methods: {
    setKeyWord (event) {
      const query = event.target.value
      this.$store.commit(SET_QUERY_WORD, {s: query})
    },
    onFiltered (data = {}) {
      this.$store.commit(SET_FILTER_PARAMS, data)
    },
    searchBooksByFilter () {
      this.$store.commit(SET_QUERY_WORD, {s: this.query})
      this.$emit('search-value')
    },
    searchBooks (event) {
      const query = event.target.value
      this.$store.commit(SET_QUERY_WORD, {s: query})
      this.$emit('search-value')
    },
    openFilter () {
      this.showFilter = !this.showFilter
    },
    selectDateFrom (date) {
      const year = this.getYear(date)
      this.$store.commit(SET_FILTER_DATE_FROM, year)
    },
    selectDateTo (date) {
      const year = this.getYear(date)
      this.$store.commit(SET_FILTER_DATE_TO, year)
    },
    getYear (date) {
      const fullDate = new Date(date)
      return fullDate.getFullYear()
    },
    clearFilter () {
      this.$store.commit(CLEAR_FILTER_PARAMS)
      this.defaultDateFrom = new Date('2000')
      this.defaultDateTo = new Date('2020')
    }
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
input {
  outline: none;
}
input.input-field::placeholder {
  color: #AEADC3;
  font-size: 14px;
}

button:focus {
  outline: 0;
}
.active-icon {
  color: #8E8AD3;
  background: #F4F4FF;
  border-radius: 50%;
  border: solid 11px #F4F4FF;
  box-sizing: content-box;
}
</style>
