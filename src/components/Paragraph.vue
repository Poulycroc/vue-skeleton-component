<template lang="pug">

  .paragraph-skeleton--component-wrapper(
    :id="componentRef"
    :class="rendClass"
  )
    .element.line(
      v-for='n in lines'
      :key='n'
      :class='rendLineName(n)'
      :style="rendStyle"
    )

</template>

<script>
const authoriedAligns = ['left', 'right', 'center']

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
    },
    align: {
      type: String,
      required: false,
      default: 'left',
      validator: (v) => authoriedAligns.includes(v)
    }
  },
  computed: {
    /**
     * @return {Object}
     */
    rendStyle() {
      return {
        ...this.rendBaseStyle,
        height: `${this.fontSize}px`
      }
    },

    /**
     * @return {String}
     */
    rendClass() {
      return `is-align-${this.align}`
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
