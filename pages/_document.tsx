import Document, { Head, Html, Main, NextScript } from 'next/document';

class AppDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
