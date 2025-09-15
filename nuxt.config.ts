// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
  ],
  devtools: { enabled: true },
  css: [
    './src/app/styles/normalize.scss',
    './src/app/styles/fonts.scss',
  ],
  dir: {
    pages: './src/app/routes',
    assets: './src/shared/assets',
  },
  alias: {
    '@': '../src',
    '~': '../src',
  },
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
