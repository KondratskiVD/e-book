<template>
  <div id="cover">
    <div v-if="cover === 1"
         v-bind:style="sliderWidth"
         :class="computedClassWidth"
         class="cover bg-1">
      <div v-if="description">
        <div class="description">
          <div class="w-99">
            <h1><b>{{ description.title }}</b></h1>
            <h3>{{ description.author ? description.author.name : '' }}</h3>
          </div>
        </div>
        <div class="isbn">
          ISBN <span v-for="(isbn, index) in description.isbn" :key="index">{{ isbn.name }}</span>
        </div>
      </div>
      <div v-else>
        <div class="description">
          <div class="w-99">
            <h1><b>Алиса в Стране чудес</b></h1>
            <h3>Льюис Керолл</h3>
          </div>
        </div>
        <div class="isbn">
          ISBN 000-00-0-000
        </div>
      </div>
    </div>
    <div v-if="cover === 2"
         v-bind:style="sliderWidth"
         :class="computedClassWidth"
         class="cover bg-2">
      <div v-if="description">
        <div class="description-2">
          <div class="w-99">
            <h3>{{ description.author ? description.author.name : '' }}</h3>
            <h1>{{ description.title }}</h1>
          </div>
        </div>
        <div class="isbn">
          ISBN <span v-for="(isbn, index) in description.isbn" :key="index">{{ isbn.name }}</span>
        </div>
      </div>
      <div v-else>
        <div class="description-2">
          <div class="w-99">
            <h3><i>Льюис Керолл</i></h3>

            <h1><b>Алиса в Стране чудес</b></h1>
          </div>
        </div>
        <div class="isbn">
          ISBN 000-00-0-000
        </div>
      </div>
    </div>
    <div v-if="cover === 3"
         v-bind:style="sliderWidth"
         :class="computedClassWidth"
         class="cover bg-3">
      <div v-if="description">
        <div class="description">
          <div class="w-99">
            <h1><b>{{ description.title }}</b></h1>
            <h3><i>{{ description.author ? description.author.name : '' }}</i></h3>
          </div>
        </div>
        <div class="isbn-3">
          ISBN <span v-for="(isbn, index) in description.isbn" :key="index">{{ isbn.name }}</span>
        </div>
      </div>
      <div v-else>
        <div class="description">
          <div class="w-99">
            <h3><i>Льюис Керолл</i></h3>
            <h1><b>Алиса в Стране чудес</b></h1>
          </div>
        </div>
        <div class="isbn-3">
          ISBN 000-00-0-000
        </div>
      </div>
    </div>
    <div v-if="cover === 4"
         v-bind:style="sliderWidth"
         :class="computedClassWidth"
         class="cover bg-4">
      <div v-if="description">
        <div class="description-4">
          <div class="w-99">
            <h1><b>{{ description.title }}</b></h1>
            <h3><i>{{ description.author ? description.author.name : '' }}</i></h3>
          </div>
        </div>
        <div class="isbn-4">
          ISBN <span v-for="(isbn, index) in description.isbn" :key="index">{{ isbn.name }}</span>
        </div>
      </div>
      <div v-else>
        <div class="description-4">
          <div class="w-99">
            <h1><b>Алиса в Стране чудес</b></h1>
            <h3><i>Льюис Керолл</i></h3>
          </div>
        </div>
        <div class="isbn-4">
          ISBN 000-00-0-000
        </div>
      </div>
    </div>
    <div v-if="cover === 5" class="cover bg-5">
      <div v-if="description">
        <div class="description-5">
          <h3 class="author"><i>{{ description.author ? description.author.name : '' }}</i></h3>
          <h1 class="title"><b>{{ description.title }}</b></h1>
          <div class="isbn-5">
            ISBN <span v-for="(isbn, index) in description.isbn" :key="index">{{ isbn.name }}</span>
          </div>

        </div>
      </div>
      <div v-else>
        <div class="description-5">
          <h3 class="author"><i>Льюис Керолл</i></h3>
          <h1 class="title"><b>Алиса в Стране чудес</b></h1>
          <div class="isbn-5">
            ISBN 000-00-0-000
          </div>

        </div>
      </div>
    </div>
    <div v-if="cover === 6" class="cover bg-6">
      <div v-if="description">
        <div class="description-6">
          <h1><b>{{ description.title }}</b></h1>
          <h3><i>{{ description.author ? description.author.name : '' }}</i></h3>
        </div>
        <div class="isbn-6">
          ISBN <span v-for="(isbn, index) in description.isbn" :key="index">{{ isbn.name }}</span>
        </div>
      </div>
      <div v-else>
        <div class="description-6">
          <h1><b>Алиса в Стране чудес</b></h1>
          <h3><i>Льюис Керолл</i></h3>
        </div>
        <div class="isbn-6">
          ISBN 000-00-0-000
        </div>
      </div>
    </div>
    <div v-if="!description" class="cover bg-1">
      <div class="description">
        <div class="w-99">
          <h1><b>Алиса в Стране чудес</b></h1>
          <h3>Льюис Керолл</h3>
        </div>
      </div>
      <div class="isbn">
        ISBN 000-00-0-000
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Cover',
  props: {
    description: {
      type: Object,
      default: () => {}
    },
    computedClassWidth: {
      type: String,
      default: ''
    },
    isSlider:{
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      image: null
    }
  },
  computed: {
    cover () {
      return Math.floor(Math.random() * Math.floor(4)) + 1
    },
    sliderWidth () {
      if (this.isSlider) {
        return {width: '100%'}
      }
      return ''
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: TTNormsPro-Black; /* Имя шрифта */
  src: url(../assets/fonts/TTNormsPro-Black.ttf); /* Путь к файлу со шрифтом */
}

@font-face {
  font-family: TTNormsPro-MediumItalic; /* Имя шрифта */
  src: url(../assets/fonts/TTNormsPro-MediumItalic.ttf); /* Путь к файлу со шрифтом */
}

@font-face {
  font-family: AvenirNext-Regular; /* Имя шрифта */
  src: url(../assets/fonts/AvenirNextCyr-Regular.ttf); /* Путь к файлу со шрифтом */
}

.bg-1 {
  background-image: url("../assets/images/cover-1.png");
}

.bg-2 {
  background-image: url("../assets/images/cover-2.png");
}

.bg-3 {
  background-image: url("../assets/images/cover-3.png");
}

.bg-4 {
  background-image: url("../assets/images/cover-4.png");
}

/*.bg-5 {*/
/*  background-image: url("../assets/images/cover-5.png");*/
/*}*/

/*.bg-6 {*/
/*  background-image: url("../assets/images/cover-6.png");*/
/*}*/

#cover {
  /*width: 490px;*/
  /*z-index: -1;*/
  /*position:relative;*/
  cursor: pointer;
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

h1 {
  font-size: 18px;
}

h3 {
  font-size: 14px;
  font-style: normal;
}

.description {
  padding: 10px;
}

.description h1 {
  font-family: TTNormsPro-MediumItalic;
}

.description-2 h1 {
  font-family: TTNormsPro-MediumItalic;
}

.description-2 h3 {
  font-family: TTNormsPro-MediumItalic;
}

.description-2 {
  /*padding: 450px 60px 0;*/
  position: absolute;
  bottom: 20%;
  left: 5%;
}

.description-4 {
  padding: 10px;
}

.description-4 h1 {
  font-family: AvenirNext-Regular;
  color: rgb(143, 129, 200);
}

.description-5 {
  position: absolute;
  bottom: 30%;
  left: 25%;
  right: 25%;
  text-align: center;
}

.description-6 {
  position: absolute;
  bottom: 0%;
  width: 70%;
  text-align: center;
  left: 15%;
}

.description-6 h1, .description-6 h3 {
  color: black !important;
  font-family: TTNormsPro-MediumItalic;
}
.isbn {
  font-size: 11px;
  position: absolute;
  bottom: 10%;
  left: 5%;
  font-family: AvenirNext-Regular;
  white-space: nowrap;
}

.isbn-3 {
  font-size: 11px;
  position: absolute;
  bottom: 10%;
  left: 8%;
}

.isbn-4 {
  font-size: 11px;
  position: absolute;
  bottom: 10%;
  left: 8%;
}

.isbn-5 {
  font-size: 14px;
}

.isbn-6 {
  font-size: 14px;
  color: black;
  position: absolute;
  top: 0;
  left: 25%;
}

.title {
  background-color: #FF8A84;
}

.author {
  background-color: #F5F7FA;
}
.h-170 {
  height: 170px;
  width: 115px;
}
.h-250 {
  height: 250px;
  width: 190px;
}
</style>
