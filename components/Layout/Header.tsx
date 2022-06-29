import { Container, Header as HeaderMantine } from '@mantine/core'
import * as p from '../../package.json'
import classes from './Header.module.css'
import Link from 'next/link'

const Header = () => {
  return (
    <HeaderMantine height={60} p="xs" className={classes.header}>
      <Container fluid className={classes.container}>
        <span className={classes.meta}>Beta</span>
        <span className={classes.title}>
          <Link className={classes.link} href="/">
            PartyCarty - Clever Shopping Lists
          </Link>
        </span>
        <span className={classes.meta}>{p.version}</span>
      </Container>
    </HeaderMantine>
  )
}

export default Header
