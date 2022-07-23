import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core'
import { appWithTranslation } from 'next-i18next'

function App(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <>
      <Head>
        <title>PartyCarty | Clever Shopping List</title>
        <meta name="name" content="PartyCarty | Clever Shopping List" />
        <meta httpEquiv="content-Type" content="text/html; utf-8" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta name="robots" content="INDEX,NOFOLLOW" />
        <meta httpEquiv="content-Language" content="en" />
        <meta
          name="description"
          content="Create and share your shoppinglists among friends, family and groups for free! PartyCarty provides clever autofill and categorizes the items for the best experience!"
        />
        <meta
          name="keywords"
          content="Free no-signup Shopping lists clever autofill social events online on the fly shopping list share parties party"
        />
        <meta name="author" content="Mika Greif" />
        <meta name="publisher" content="Mika Greif" />
        <meta name="copyright" content="Mika Greif" />
        <meta name="audience" content="Alle" />
        <meta name="page-type" content="List, Persistant, Teilbar, Shareable" />
        <meta
          name="page-topic"
          content="Shopping, Online, Lists, Party, Shoppingliste, Shoppingslist, Einkaufsliste"
        />
        <meta httpEquiv="Reply-to" content="Mika@greif.me" />
        <meta name="expires" content="" />
        <meta name="revisit-after" content="15 days" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colors: {
            main: [
              '#E7F5FF',
              '#D0EBFF',
              '#A5D8FF',
              '#74C0FC',
              '#4DABF7',
              '#228BE6',
              '#009CDF',
              '#1C7ED6',
              '#1971C2',
              '#1864AB',
            ],
          },
          primaryColor: 'main',
          colorScheme: 'light',
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </>
  )
}

export default appWithTranslation(App)
