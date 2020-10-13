<template lang="pug">
.line-skeleton--component-wrapper(
  :id="componentRef"
)
  .element.line(:style="rendStyle", :class="rendClass")
</template>

<script>
import { isNil } from '~utils'

const authorizedTypes = ['p', 'h1', 'h2', 'h3']

export default {
  name: 'LineComponent',
  props: {
    lines: {
      type: Number,
      required: false,
      default: 3
    },
    height: {
      // in pixel
      type: Number,
      required: false,
      default: null
    },
    width: {
      // in pixel
      type: Number,
      required: false,
      default: 100
    },
    type: {
      type: String,
      required: false,
      default: 'p',
      validator: (v) => authorizedTypes.includes(v)
    }
  },
  computed: {
    /**
     * @return {Object}
     */
    rendStyle() {
      const _r = {
        ...this.rendBaseStyle,
        width: `${this.width}px`
      }
      if (!isNil(this.height)) _r.height = `${this.height}px`
      return _r
    },

    /**
     * @return {String}
     */
    rendClass() {
      const { height, type } = this
      return isNil(height) ? `font_${type}` : ''
    }
  }
}
</script>
