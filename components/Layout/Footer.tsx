import classes from './Footer.module.css'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

const Footer = () => {
  const { t } = useTranslation('common')
  return (
    <footer className={classes.container}>
      <span>
        <Link href="https://de.linkedin.com/in/mika-greif">Mika Greif</Link>
      </span>
      <span>|</span>
      <span>
        <Link href="/imprint">{t('imprint')}</Link>
      </span>
    </footer>
  )
}

export default Footer
