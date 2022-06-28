import { Container, Header as HeaderMantine } from "@mantine/core"
import * as p from '../../package.json'
import classes from './Header.module.css'

const Header = () => {
  return <HeaderMantine height={60} p="xs" className={classes.header} >
      <Container fluid className={classes.container}>
        <span>Beta</span>
        <span className={classes.title}>PartyCarty - Shopping Lists</span>
        <span>{p.version}</span>
      </Container>
    </HeaderMantine>
}

export default Header 