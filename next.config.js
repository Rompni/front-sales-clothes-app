// eslint-disable-next-line @typescript-eslint/no-var-requires
const { nextI18NextRewrites } = require('next-i18next/rewrites');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withImages = require('next-images');

const localeSubpaths = { es: 'es', en: 'en' };

module.exports = withImages({
  inlineImageLimit: false,
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
});
