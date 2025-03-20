import {DefaultSeoProps} from 'next-seo';

const config: DefaultSeoProps = {
  defaultTitle: 'KARA Shop',
  titleTemplate: '%s | KARA Shop',
  description:
    'Лучшие кроссовки только в KARA Shop!',
  canonical: 'https://karashop.vercel.app',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://karashop.vercel.app',
    siteName: 'KARA Shop',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

export default config;
