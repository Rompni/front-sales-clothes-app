import { FunctionComponent } from 'react';
import Head from 'next/head';

export type AppHeadProps = {
  title?: string;
};

const AppHead: FunctionComponent<AppHeadProps> = ({ title }): JSX.Element => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title ? title + ' -' : ''} Zukka</title>
    </Head>
  );
};

export default AppHead;
