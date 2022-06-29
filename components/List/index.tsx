import { Container } from '@mantine/core'
import { useEffect } from 'react'
import { useCallback, useState } from 'react'
import { createListItem } from '../../gateway/rest/createListItem'
import { deleteListItem } from '../../gateway/rest/deleteListItem'
import { editListItem } from '../../gateway/rest/editListItem'
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

  const handleDelete = (id: string) => {
    deleteListItem(id).then(() => {
      setListItems(listItems.filter((item) => item._id !== id))
    })
  }

  const handleBought = (id: string, value: boolean) => {
    editListItem(id, { bought: value }).then((res) => {
      const oldListItem = listItems.find((item) => item._id === id)
      if (oldListItem) {
        oldListItem.bought = value
        setListItems(
          listItems.map((item) => {
            if (item._id === id) item.bought = value
            return item
          })
        )
      }
    })
  }

  //
  if (!list) return null

  const GoogleAdVertical = ({ slotId }: { slotId: string }) => {
    useEffect(() => {
      ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      )
    }, [])
    return (
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2039881454710498"
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    )
  }

  return (
    <div className={classes.container}>
      <h1>{list.description}</h1>
      <div className={classes.flexcontainer}>
        <div style={{ width: '300px' }} className={classes.googleAd}>
          <GoogleAdVertical slotId="5334228675" />
        </div>
        <div className={classes.listContainer}>
          <AddItemButton onAdd={addListItem} />
          <div className={classes.list}>
            {listItems.length === 0 && <span>No Items</span>}
            {Object.entries(CATEGORIES).map(([category, value]: [any, any]) => {
              return (
                <SubList
                  key={category}
                  category={category}
                  listItems={listItems}
                  onBuyListItem={handleBought}
                  onDeleteListItem={handleDelete}
                />
              )
            })}
          </div>
        </div>
        <div style={{ width: '300px' }} className={classes.googleAd}>
          <GoogleAdVertical slotId="1838956353" />
        </div>
      </div>
    </div>
  )
}

export default List
