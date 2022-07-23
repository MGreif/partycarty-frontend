import classes from './NewPage.module.css'
import NewListForm from './NewListForm'
import { Divider } from '@mantine/core'
import { LastVisitedLists } from './LastVisitedLists'
import { useTranslation } from 'next-i18next'

const NewPage = () => {
  const { t } = useTranslation('newPage')
  return (
    <div className={classes.container}>
      <h1 className={classes.centered}>{t('title-text')}</h1>
      <article className={classes.article}>
        <p>{t('intro')}</p>
        <p>{t('party-management')}</p>
        <p>{t('voting')}</p>
      </article>
      <LastVisitedLists />
      <Divider />
      <NewListForm />
      <Divider />
      <div>
        <section className={classes.flexSection}>
          <div>
            <h2>{t('instructions')}</h2>
            <ol>
              <li>{t('name')}</li>
              <li>{t('share')}</li>
              <li>
                {t('everyone-can')}
                <ul style={{ listStyle: 'none', paddingLeft: '1em' }}>
                  <li>{t('add')}</li>
                  <li>{t('set-as-bought')}</li>
                  <li>{t('vote')}</li>
                </ul>
              </li>
              <li>
                <b>{t('buy-desired-items')}</b>
              </li>
            </ol>
          </div>
          <div>
            <h2>{t('expanding-items')}</h2>
            <p>{t('user-experience')}</p>
            <p>{t('categorized')}</p>
            <p>
              {t('autofil1')} <strong>{t('autofil2')}</strong> {t('autofil3')}
            </p>
          </div>
        </section>
      </div>
      <Divider />
      <h3 style={{ margin: '1em auto' }}>{t('happy-shopping')}</h3>
    </div>
  )
}

export default NewPage
