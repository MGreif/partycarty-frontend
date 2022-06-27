import { AppShell, Navbar, Header } from '@mantine/core';
import Navigation from './Navigation';

function Layout ({children}: any) {
  return (
    <AppShell
      padding="md"
      //navbar={<Navigation />}
      header={<Header height={60} p="xs">Shopping List</Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      {children}
    </AppShell>
  );
}

export default Layout