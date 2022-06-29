import { Container } from '@mantine/core'
import { useEffect } from 'react'
import { useCallback, useState } from 'react'
import { createListItem } from '../../gateway/rest/createListItem'
import { useListContext } from '../../hooks/useListContext'
import { randomString } from '../../libs/mockGenerator'
import AddItemButton from '../AddItemButton'
import classes from './index.module.css'
import { IBuyableItem, IListItem, ListItem } from './ListItem'
import SubList from './SubList'

export interface IList {
  _id: string
  items: IListItem[]
  editable: boolean
  lastEdited: Date
  description: string
}

export type TCategory = {
  value: string
  label: string
}

export const CATEGORIES = {
  BABY: { value: 'BABY', label: 'Babies' },
  BAKERY: { value: 'BAKERY', label: 'Bakery' },
  BEAUTY_PERSONAL_HYGIENE: {
    value: 'BEAUTY_PERSONAL_HYGIENE',
    label: 'Beauty and personal hygiene',
  },
  BEER_WINE_SPIRITS: {
    value: 'BEER_WINE_SPIRITS',
    label: 'Alcohol, wine and beer',
  },
  CANS_JARS: { value: 'CANS_JARS', label: 'Cans and jars' },
  CEREAL_MUESLI: { value: 'CEREAL_MUESLI', label: 'Cereal' },
  CLOTHING: { value: 'CLOTHING', label: 'Clothing' },
  COFFEE_TEA: { value: 'COFFEE_TEA', label: 'Coffee and tea' },
  DAIRY_EGGS: { value: 'DAIRY_EGGS', label: 'Dairy and eggs' },
  ELECTRONICS_OFFICE: {
    value: 'ELECTRONICS_OFFICE',
    label: 'Electronics and office',
  },
  FISH_SEAFOOD: { value: 'FISH_SEAFOOD', label: 'Fish and seafood' },
  FROZEN: { value: 'FROZEN', label: 'Frozen Food' },
  FRUITS_VEGETABLES: {
    value: 'FRUITS_VEGETABLES',
    label: 'Fruits and vegetables',
  },
  'HOUSE-CLEANING_PRODUCTS': {
    value: 'HOUSE-CLEANING_PRODUCTS',
    label: 'Cleaning',
  },
  MEAT_POULTRY: { value: 'MEAT_POULTRY', label: 'Meat and poultry' },
  OTHER: { value: 'OTHER', label: 'Other' },
  READY_MEALS: { value: 'READY_MEALS', label: 'Instant meals' },
  SNACKS_SWEETS: { value: 'SNACKS_SWEETS', label: 'Snacks' },
}

const List = () => {
  const list: IList = useListContext()
  console.log('list', list)

  const [listItems, setListItems] = useState<IListItem[]>(list?.items || [])

  useEffect(() => {
    if (list) {
      setListItems(list.items)
    }
  }, [list])

  // Probably useless. We gonna refetch on change and instantly POST the changes to the service

  const addListItem = useCallback(
    (buyableItem: IBuyableItem) => {
      if (
        listItems
          .map((listItem) => listItem.buyableItem.name)
          .includes(buyableItem.name)
      ) {
        const indexOfItem = listItems
          .map((listItem) => listItem.buyableItem.name)
          .indexOf(buyableItem.name)
        const newList = [...listItems]
        newList[indexOfItem].quantity = newList[indexOfItem].quantity + 1
        setListItems(newList)
      } else {
        const newListItem = {
          bought: false,
          buyableItem: buyableItem._id,
          quantity: 1,
          votes: 0,
        }
        createListItem(list._id, newListItem)
          .then(({ body }: { body: any }) => {
            const item = {
              ...{ ...newListItem, _id: body.listitemId },
              buyableItem,
            }
            setListItems([item, ...listItems])
          })
          .catch((err) => {
            console.error(err)
          })
      }
    },
    [listItems, list._id]
  )

  //
  if (!list) return null

  return (
    <div className={classes.container}>
      <h1>{list.description}</h1>
      <Container size={800} px={0}>
        <AddItemButton onAdd={addListItem} />
        <div className={classes.list}>
          {listItems.length === 0 && <span>No Items</span>}
          {Object.entries(CATEGORIES).map(([category, value]: [any, any]) => {
            return <SubList category={category} listItems={listItems} />
          })}
        </div>
      </Container>
    </div>
  )
}

export default List
