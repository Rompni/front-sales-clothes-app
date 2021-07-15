import NextI18Next from 'next-i18next';
import * as nextConfig from 'next/config';
import * as path from 'path';

const i18 = new NextI18Next({
  otherLanguages: ['es', 'en'],
  defaultLanguage: 'es',
  localeSubpaths: nextConfig.default().publicRuntimeConfig.localeSubpaths,
  defaultNS: 'common',
  localePath: path.resolve('./public/static/locales'),
});

module.exports = i18;

export const appWithTranslation = i18.appWithTranslation;

export const withTranslation = i18.withTranslation;
