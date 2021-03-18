
export default {
  data () {
    return {
      windowWidth: 0,
      computedClassWidth: '',
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 30
      }
    }
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
      switch (true) {
      case (this.windowWidth <= 375) :
        this.swiperOption.slidesPerView = 2
        this.computedClassWidth = 'h-170'
        break
      case (this.windowWidth <= 530) :
        this.swiperOption.slidesPerView = 3
        this.computedClassWidth = 'h-170'
        break
      case (this.windowWidth <= 650) :
        this.swiperOption.slidesPerView = 4
        this.computedClassWidth = 'h-170'
        break
      case (this.windowWidth <= 768) :
        this.swiperOption.slidesPerView = 3
        this.computedClassWidth = 'h-250'
        break
      case (this.windowWidth <= 1024) :
        this.swiperOption.slidesPerView = 4
        this.computedClassWidth = 'h-250'
        break
      case (this.windowWidth <= 1200) :
        this.swiperOption.slidesPerView = 5
        this.computedClassWidth = 'h-250'
        break
      default:
        this.swiperOption.slidesPerView = 6
        this.computedClassWidth = 'h-250'
        this.swiperOption.spaceBetween = 30
      }
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  }
}
