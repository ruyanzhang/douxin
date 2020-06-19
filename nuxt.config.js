const host = process.env.NODE_ENV === 'development'
  ? global.server.dev.host : global.server.product.host
const port = process.env.NODE_ENV === 'development'
  ? global.server.dev.port : global.server.product.port
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/js/flexible.js', type: 'text/javascript', charset: 'utf-8' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/babel-polyfill', ssr: false },
    { src: '~/plugins/io.socket', ssr: false },
    '~/plugins/nutui',
    '~/plugins/store'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'vue-wait/nuxt',
    ['vue-wait/nuxt', { useVuex: true }],
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: [
      '~/assets/scss/custom.scss'
    ],
    less: ['~/assets/less/params.less']
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  wait: { useVuex: true },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    postcss: [
      require('postcss-px2rem')({
        remUnit: 75
      })
    ],
    loaders: {
    },
    extend (config, ctx) {
    }
  },
  server: {
    port, // default: 3000
    host // default: localhost,
  }
}
