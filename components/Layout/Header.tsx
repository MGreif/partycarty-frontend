import { Container, Header as HeaderMantine } from '@mantine/core'
import * as p from '../../package.json'
import classes from './Header.module.css'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const Header = () => {
  const { i18n, t } = useTranslation('newPage')
  const router = useRouter()
  const currentURI = router.asPath
  return (
    <HeaderMantine height={60} p="xs" className={classes.header}>
      <Container fluid className={classes.container}>
        <span className={classes.meta}>
          <Link locale={i18n.language === 'de' ? 'en' : 'de'} href={currentURI}>
            {i18n.language === 'de' ? '🇺🇸 EN' : '🇩🇪 GER'}
          </Link>
        </span>
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
