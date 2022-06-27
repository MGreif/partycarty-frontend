import { Navbar } from '@mantine/core'

function Navigation () {
    return (
      <Navbar height={600} p="xs" width={{ base: 300 }}>
        <Navbar.Section mt="xs">
            <span>test</span>
        </Navbar.Section>
        <Navbar.Section grow mt="md">
            <span>Test 2</span>
        </Navbar.Section>
        <Navbar.Section>
            <span>Test 3</span>
        </Navbar.Section>
      </Navbar>
    );
  }
  

  export default Navigation