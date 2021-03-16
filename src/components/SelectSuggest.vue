<template>
  <div>
    <div class="text-left">
      <span class="whitespace-nowrap text-label">{{ fields.label.toUpperCase() }}</span>
    </div>
    <vue-simple-suggest
        pattern="\w+"
        v-model="model"
        :list="getList"
        :max-suggestions="5"
        :min-length="1"
        :debounce="0"
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
        value-attribute="id"
        display-attribute="name"
        @select="onSuggestSelect"
        @blur="checkWhenBlur"
    >
      <div class="g relative">
        <input type="text" :placeholder="fields.placeholder" v-model="model">
        <span v-if="loading" class="suggest_mini-spinner absolute">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
        <span v-else class="suggest_arrow-down absolute"/>
      </div>

      <template slot="misc-item-above" slot-scope="{ suggestions, query }">

        <template v-if="suggestions.length > 0">
        </template>

        <div class="misc-item" v-else-if="!loading">
          <span >Нічого не знайдено</span>
        </div>
      </template>

      <div slot="suggestion-item" slot-scope="scope" :title="scope.suggestion.description">
        <div class="text-left text">
          <span v-html="boldenSuggestion(scope)"></span>
        </div>
      </div>
    </vue-simple-suggest>
  </div>
</template>

<script>
import VueSimpleSuggest from 'vue-simple-suggest'
import 'vue-simple-suggest/dist/styles.css'
import {mapState} from 'vuex'

export default {
  name: 'SelectSuggest',
  components: {
    VueSimpleSuggest
  },
  props: {
    fields: {
      type: Object,
      default: () => {}
    },
    btnClickHandler: {

    }
  },
  data () {
    return {
      chosen: '',
      selected: {
        name: null,
        id: null
      },
      model: '',
      mode: 'input',
      loading: false,
      log: [],
      foundText: null
    }
  },
  computed: {
    ...mapState(['searchWords']),
    getSearchWords () {
      return this.$store.state.searchWords
    }
  },
  mounted () {
    this.model = this.getSearchWords[this.fields.keyWord]
  },
  methods: {
    checkWhenBlur () {
      if (!this.model) {
        this.clearValue()
      }
    },
    onSuggestSelect (suggest) {
      this.selected = suggest
      this.changeValue(suggest)
    },
    clearValue (word) {
      this.$emit('filtered', {
        key: this.fields.keyWord,
        name: null,
        id: null
      })
    },
    changeValue (word) {
      this.$emit('filtered', {
        key: this.fields.keyWord,
        name: word.name,
        id: word.id
      })
    },
    boldenSuggestion (scope) {
      if (!scope) return scope
      const {suggestion, query} = scope
      const result = this.$refs.suggestComponent.displayProperty(suggestion)
      if (!query) {
        return result
      }
      const texts = query.split(/[\s-_/\\|.]/gm).filter(t => !!t) || ['']

      if (typeof result === 'string') {
        return result.replace(new RegExp(`(.*?)(${  texts.join('|')  })(.*?)`, 'gi'), '$1<b>$2</b>$3')
      }
    },
    getList (inputValue) {
      return new Promise((resolve, reject) => {
        this.loading = true
        this.$http.get(`/api/lib/${this.fields.keyWord}`, {
          params: {
            name: inputValue
          }
        })
          .then(response => {
            const result = response.data.data
            this.foundText = result
            this.loading = false
            resolve(result)
          })
          .catch(error => {
            this.loading = false
            reject(error)
          })
      })
    }
  }
}
</script>

<style>
.vue-simple-suggest.designed .input-wrapper input , .vue-simple-suggest.designed.focus .input-wrapper input {
  border: 0;
  border-bottom: 1px solid #CCCCCC;
  border-radius: 0;
  outline: none;
  padding-left: 0;
  padding-top: 5px;
  padding-right: 20px;
}
.suggest_arrow-down {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 5px solid #A7AFBA;
  top: 20px;
  right: 0;
}
.suggest_mini-spinner {
  top: 10px;
  right: -10px;
}
</style>
