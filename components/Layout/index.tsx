import { AppShell } from '@mantine/core'
import Header from './Header'
import Footer from './Footer'

function Layout({ children }: any) {
  return (
    <AppShell
      padding={0}
      //navbar={<Navigation />}
      footer={<Footer />}
      header={<Header />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  )
}

export default Layout
