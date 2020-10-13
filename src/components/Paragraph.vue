<template lang="pug">
.paragraph-skeleton--component-wrapper(
  :id="componentRef"
)
  .element.line(v-for='n in lines', :key='n', :class='rendLineName(n)', :style="rendStyle")
</template>

<script>
export default {
  name: 'ParagraphComponent',
  props: {
    lines: {
      type: Number,
      required: false,
      default: 3
    },
    fontSize: {
      // in pixel
      type: Number,
      required: false,
      default: 18
    }
  },
  computed: {
    rendStyle() {
      return {
        ...this.rendBaseStyle,
        height: `${this.fontSize}px`
      }
    }
  },
  methods: {
    /**
     * @param {Number} n - number
     * @return {String}
     */
    rendLineName(n) {
      return `paragraph-line-${n}`
    }
  }
}
</script>
