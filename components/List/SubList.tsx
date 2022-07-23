import { useTranslation } from 'next-i18next'
import { CATEGORIES } from '.'
import { IListItem, ListItem } from './ListItem'
import classes from './SubList.module.css'

interface ISubListProps {
  listItems: IListItem[]
  category: keyof typeof CATEGORIES
  setListItems: any
}

const SubList: React.FC<ISubListProps> = ({
  listItems,
  category,
  setListItems,
}) => {
  const { t } = useTranslation('list')
  const correspondingItems = listItems
    .filter((item) => item.buyableItem.category === category)
    .sort((a, b) => a.buyableItem.name.localeCompare(b.buyableItem.name))

  if (!correspondingItems.length) return null

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <span>
          {CATEGORIES[category].icon}{' '}
          {t('categories.' + CATEGORIES[category].value)}{' '}
          {CATEGORIES[category].icon}
        </span>
      </div>
      {correspondingItems.map((item) => (
        <ListItem
          key={item.buyableItem.name}
          listItem={item}
          listItems={listItems}
          setListItems={setListItems}
        />
      ))}
    </div>
  )
}

export default SubList
