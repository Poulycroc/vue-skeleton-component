<template lang="pug">
  .button-skeleton--component-wrapper(
    :id="componentRef"
    :class="rendPositionClass"
  )
    .element.button(
      :style="rendStyle"
      :class="rendClass" 
    )
</template>

<script>
const mapHeight = {
  big: '51px',
  default: '40px',
  medium: '36px',
  small: '32px',
  mini: '28px'
}
const authorizedSizes = Object.keys(mapHeight)

export default {
  name: 'ButtonComponent',
  props: {
    full: {
      type: Boolean,
      required: false,
      default: false
    },
    circle: {
      type: Boolean,
      required: false,
      default: false
    },
    round: {
      type: Boolean,
      required: false,
      default: false
    },
    width: {
      type: Number,
      required: false,
      default: 100
    },
    size: {
      type: String,
      required: false,
      default: 'default',
      validator: (v) => authorizedSizes.includes(v)
    },
    centered: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    /**
     * @return {Object}
     */
    rendClass() {
      return {
        'is-full': this.full,
        'is-circle': this.circle,
        'is-round': this.round
      }
    },

    /**
     * @return {Object}
     */
    rendStyle() {
      return {
        ...this.rendBaseStyle,
        width: `${this.width}px`,
        height: mapHeight[this.size]
      }
    },

    /**
     * @return {String}
     */
    rendPositionClass() {
      if (!this.centered) return
      return 'centered_content'
    }
  }
}
</script>
