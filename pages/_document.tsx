import { createGetInitialProps } from '@mantine/next'
import Document, { Head, Html, Main, NextScript } from 'next/document'
const getInitialProps = createGetInitialProps()

export default class _Document extends Document {
  static getInitialProps = getInitialProps

  render() {
    return (
      <Html>
        <Head></Head>
        <body style={{ backgroundColor: '#E3E3E3' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
