import * as utils from '@poulycroc/js-utils/utils.js'

import components from './services/components.service'

// Import All Mixins
import componentMixins from './mixins/component.mixin'

import './assets/sass/app.scss'

function install(Vue, options) {
  if (install.installed) return
  install.installed = true

  Vue.prototype.$utils = utils

  // Declare all components when options is not set or array is empty
  // Or when the user explicitely specify it
  for (const component in components) {
    if (
      !options ||
      !options.components ||
      options.components.length === 0 ||
      options.components.includes(component)
    ) {
      const componentName = `${utils.toKebabCase(component)}-skeleton`

      Vue.component(componentName, {
        extends: components[component],
        mixins: [componentMixins],
        props: {
          customPluginOptions: {
            type: Object,
            default: () => ({ ...options }),
          },
        },
      })
    }
  }
}

// Create module definition for Vue.use()
const plugin = {
  install,
}

// To auto-install when vue is found
let GlobalVue = null

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}

if (GlobalVue) GlobalVue.use(plugin)

// To allow use as module (npm/webpack/etc.) export components
export default plugin
