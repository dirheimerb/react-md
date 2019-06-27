/* eslint-disable react/no-danger */
import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

import Analytics from 'components/Analytics';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    let theme = 'dark';
    if (ctx && ctx.req) {
      ({ theme = 'dark' } = ctx.req.cookies);
    }

    return {
      ...initialProps,
      theme,
    };
  }

  componentDidMount() {
    require('smoothscroll-polyfill').polyfill();
  }

  render() {
    const { theme } = this.props;
    return (
      <html
        lang="en"
        dir="ltr"
        className={theme === 'light' ? 'light-theme' : undefined}
      >
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="theme-color" content="#000000" />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Analytics />
          <script
            dangerouslySetInnerHTML={{ __html: 'window.Prism={manual:true}' }}
          />
        </body>
      </html>
    );
  }
}