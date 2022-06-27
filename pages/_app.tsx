import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';


function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Carty | Clever Shopping List</title>
        <meta name="name" content="Carty | Clever Shopping List" />
        <meta httpEquiv="content-Type" content="text/html; utf-8" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta name="robots" content="INDEX,NOFOLLOW" />
        <meta httpEquiv="content-Language" content="en" />
        <meta name="description" content="Free clever shopping lists for social events (parties, conventions, etc..)" />
        <meta name="keywords" content="Free no-signup Shopping lists clever autofill social events online on the fly shopping list share" />
        <meta name="author" content="Mika Greif" />
        <meta name="publisher" content="Mika Greif" />
        <meta name="copyright" content="Mika Greif" />
        <meta name="audience" content="Alle" />
        <meta name="page-type" content="List, Persistant, Teilbar, Shareable" />
        <meta name="page-topic" content="Shopping, Online, Lists" />
        <meta httpEquiv="Reply-to" content="Mika@greif.me" />
        <meta name="expires" content="" />
        <meta name="revisit-after" content="15 days" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </>
  );
}

export default App
