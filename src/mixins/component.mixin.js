const authorisedFloats = ['left', 'right']

export default {
  name: 'ComponentMixin',
  props: {
    margin: {
      type: String,
      required: false,
      default: null,
    },
    float: {
      type: String,
      required: false,
      default: null,
      validator: (v) => authorisedFloats.includes(v),
    },
  },
  computed: {
    /**
     * @param {String}
     */
    componentRef() {
      const k = this.$utils.makeKey(10)
      return `skeleton_component_${k}`
    },

    /**
     * @return {Object}
     */
    rendBaseStyle() {
      const {
        radius,
        gradientStart,
        gradientEnd,
        fontP,
        fontH1,
        fontH2,
        fontH3,
      } = this.customPluginOptions
      const _r = {
        '--radius': radius + 'px',
        '--gradient-start': gradientStart || '#ffffff',
        '--gradient-end': gradientEnd || '#e6e6e6',
        '--font-p': !this.$utils.isNil(fontP) ? `${fontP}px` : '18px',
        '--font-h1': !this.$utils.isNil(fontH1) ? `${fontH1}px` : '40px',
        '--font-h2': !this.$utils.isNil(fontH2) ? `${fontH2}px` : '33px',
        '--font-h3': !this.$utils.isNil(fontH3) ? `${fontH3}px` : '24px',
      }
      if (!this.$utils.isNil(this.margin)) _r.margin = this.margin
      if (!this.$utils.isNil(this.float)) _r.float = this.float
      return _r
    },
  },
}
