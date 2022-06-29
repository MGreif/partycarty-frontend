import { CATEGORIES } from '.'
import { IListItem, ListItem } from './ListItem'
import classes from './SubList.module.css'

interface ISubListProps {
  listItems: IListItem[]
  category: keyof typeof CATEGORIES
  onDeleteListItem: any
  onBuyListItem: any
}

const SubList: React.FC<ISubListProps> = ({
  listItems,
  category,
  onDeleteListItem,
  onBuyListItem,
}) => {
  const correspondingItems = listItems.filter(
    (item) => item.buyableItem.category === category
  )

  if (!correspondingItems.length) return null

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <span>{CATEGORIES[category].label}</span>
      </div>
      {correspondingItems.map((item) => (
        <ListItem
          key={item.buyableItem.name}
          listItem={item}
          onDelete={onDeleteListItem}
          onBuy={onBuyListItem}
        />
      ))}
    </div>
  )
}

export default SubList
