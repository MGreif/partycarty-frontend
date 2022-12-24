import { Divider, Popover, Badge } from '@mantine/core'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useLastVisitedListsLocalStorage } from '../../hooks/useLastVisitedListsLocalStorage'
import classes from './index.module.css'
import { Info } from './Info'
import { LastList } from './LastList'

const LastVisitedLists = () => {
  const { lists } = useLastVisitedListsLocalStorage()
  const { t } = useTranslation('newPage')
  if (Object.keys(lists).length === 0) return null

  return (
    <>
      <Divider />
      <div className={classes.container}>
        <h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5em"}}>
          {t('recent-lists')}<Info />
          </div>
        </h2>
        {Object.entries(lists).map(([id, description]) => (
          <LastList key={id} id={id} description={description} />
        ))}
      </div>
    </>
  )
}

export { LastVisitedLists }
