import Document, { Html, Main, Head, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel='shortcut icon' href='/assets/favicon.png' />
          <script
            async
            src='https://www.googletagmanager.com/gtag/js?id=G-E0X9Z3JTN3'
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-E0X9Z3JTN3', {
              page_path: window.location.pathname,
            });`,
            }}
          />
        </Head>
        <body>
          <Main />
          <div id='modal' />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
