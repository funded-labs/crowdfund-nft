import Document, { Html, Main, Head, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <body>
            <Head />
          <Main />
          <div id="modal" />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument