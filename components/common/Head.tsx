import { FunctionComponent } from 'react';
import NextHead from 'next/head';
import { DefaultSeo } from 'next-seo';
import { config } from '../../config/seo';

const Head: FunctionComponent = (): JSX.Element => {
  return (
    <>
      <DefaultSeo {...config} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
};

export default Head;
