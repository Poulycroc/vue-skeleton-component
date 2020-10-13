<template lang="pug">
.forme-skeleton--component-wrapper(
  :id="componentRef"
)
  .element.forme(:class='rendClass', :style="rendStyle")
</template>

<script>
import { isNil } from '~utils'

const authorizedTypes = ['square', 'round', 'circle']

export default {
  name: 'FormeComponent',
  props: {
    type: {
      type: String,
      required: false,
      default: 'square',
      validator: (v) => authorizedTypes.includes(v)
    },
    centered: {
      type: Boolean,
      required: false,
      default: false
    },
    mq: {
      type: Object,
      required: false,
      default: null
    },
    size: {
      type: [Number, String],
      default: null
    }
  },
  data() {
    return {
      responsiveState: {
        size: this.size
      }
    }
  },
  computed: {
    /**
     * @return {String}
     */
    rendSizeStyle() {
      const { size } = this.responsiveState
      return {
        maxWidth: `${size}px`,
        maxHeight: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        width: `${size}px`,
        height: `${size}px`
      }
    },

    /**
     * @param {Object}
     */
    rendStyle() {
      return {
        ...this.rendBaseStyle,
        ...this.rendSizeStyle
      }
    },

    /**
     * @return {String}
     */
    rendClass() {
      return [this.type, this.rendSizeStyle]
    }
  },
  mounted() {
    if (process.browser) {
      window.addEventListener('resize', this.mqChanger)
    }
    this.mqChanger()
  },
  beforeDestroy() {
    if (process.browser) {
      window.removeEventListener('resize', this.mqChanger)
    }
  },
  methods: {
    /**
     * @param {Array} arr
     * @param {*} goal
     * @return {any}
     */
    getClosestBiggerInt(arr, goal) {
      for (let i = 0; i < arr.length; i++) {
        const arrInt = Number(arr[i])
        const goalInt = Number(goal)
        if (arrInt > goalInt) {
          return arrInt !== undefined ? arrInt : null
        }
      }
    },

    mqChanger() {
      if (this.mq === null) return
      const s = process.browser ? window.innerWidth : 0
      const responsiveMap = Object.keys(this.mq)

      const targetKey = this.getClosestBiggerInt(responsiveMap, s)
      // if (s <= ) return users[Number(key)]
      this.responsiveState.size = !isNil(targetKey)
        ? this.mq[targetKey].size
        : this.size

      // this.vpWidth = s
    }
  }
}
</script>
