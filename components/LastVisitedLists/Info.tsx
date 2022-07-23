import { useState } from 'react'
import { Popover, Badge, createStyles } from '@mantine/core'
import { useTranslation } from 'next-i18next'

const useStyles = createStyles({
  container: {
    fontSize: '8pt',
    lineHeight: '20px',
    border: '1px solid #cccccc',
    borderRadius: '20px',
    width: '20px',
    height: '20px',
    '> span': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  },
})

const Info = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { t } = useTranslation('newPage')
  const { classes } = useStyles()
  return (
    <Popover
      opened={open}
      onClose={() => setOpen(false)}
      position="top"
      placement="center"
      withArrow
      trapFocus={false}
      closeOnEscape={false}
      width={260}
      styles={{ body: { pointerEvents: 'none' } }}
      target={
        <div
          className={classes.container}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <span>?</span>
        </div>
      }
    >
      {t('recent-lists-info')}
    </Popover>
  )
}

export { Info }
