import { Button, Divider } from '@mantine/core'
import { Text } from '@mantine/core'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import classes from './MissingList.module.css'

const MissingList = () => {
  const router = useRouter()
  const { t } = useTranslation('list')
  const handleClick = () => {
    router.push('/')
  }
  return (
    <div className={classes.container}>
      <h1>{t('no-list')}</h1>
      <p>{t('deleted-list')}</p>
      <Divider />
      <div className={classes.buttonContainer}>
        <span>👉</span>
        <Button onClick={handleClick}>{t('back-home')}</Button>
        <span>👈</span>
      </div>
    </div>
  )
}

export { MissingList }
