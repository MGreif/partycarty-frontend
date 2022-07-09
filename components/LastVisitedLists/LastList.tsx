import { createStyles, Divider } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useLastVisitedListsLocalStorage } from '../../hooks/useLastVisitedListsLocalStorage'
import classes from './LastList.module.css'

const useStyles = createStyles((theme: any) => ({
  container: {
    padding: '0.5em',
    margin: '0.5em 0',
    backgroundColor: theme.colors.main[6],
    borderRadius: '5px',
    color: 'white',
    fontWeight: 500,
    wordWrap: 'break-word',
    fontSize: '13pt',
    ':hover': {
      backgroundColor: theme.colors.main[7],
      cursor: 'pointer',
    },
  },
}))

const LastList = ({ id, description }: any) => {
  const router = useRouter()
  const { lists } = useLastVisitedListsLocalStorage()
  const { classes } = useStyles()
  if (Object.keys(lists).length === 0) return null

  return (
    <div
      className={classes.container}
      onClick={() => router.push('/shared/' + id)}
    >
      <Link href={'/shared/' + id}>{description}</Link>
    </div>
  )
}

export { LastList }
