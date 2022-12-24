import { useState } from 'react'
import { Popover, Badge, createStyles } from '@mantine/core'
import { useTranslation } from 'next-i18next'

const useStyles = createStyles({
  container: {
    fontSize: '8pt',
    lineHeight: '20px',
    display: "block",
    position: "relative",
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
  infoText: {
    fontSize: "12pt",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: 1.15
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
      withArrow
      trapFocus={false}
      closeOnEscape={false}
      width={260}
      styles={{ dropdown: { pointerEvents: "none" }}}
    >
      <Popover.Target>
      <span
          className={classes.container}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <span>?</span>
        </span>
      </Popover.Target>
      <Popover.Dropdown>
        <span className={classes.infoText}>{t('recent-lists-info')}</span>
      </Popover.Dropdown>
    </Popover>
  )
}

export { Info }
