import { Container } from '@mantine/core'
import Head from 'next/head'
import { useEffect } from 'react'
import { useCallback, useState } from 'react'
import { createListItem } from '../../gateway/rest/createListItem'
import { deleteListItem } from '../../gateway/rest/deleteListItem'
import { editListItem } from '../../gateway/rest/editListItem'
import { useLastVisitedListsLocalStorage } from '../../hooks/useLastVisitedListsLocalStorage'
import { useListContext } from '../../hooks/useListContext'
import { useMediaQuery } from '../../hooks/useMediaQuery'
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
  BABY: { value: 'BABY', label: 'Babies', icon: '👶' },
  BAKERY: { value: 'BAKERY', label: 'Bakery', icon: '🍰' },
  BEAUTY_PERSONAL_HYGIENE: {
    value: 'BEAUTY_PERSONAL_HYGIENE',
    label: 'Beauty and personal hygiene',
    icon: '💄',
  },
  BEER_WINE_SPIRITS: {
    value: 'BEER_WINE_SPIRITS',
    label: 'Alcohol, wine and beer',
    icon: '🍷',
  },
  CANS_JARS: { value: 'CANS_JARS', label: 'Cans and jars', icon: '🥫' },
  CEREAL_MUESLI: { value: 'CEREAL_MUESLI', label: 'Cereal', icon: '🥣' },
  CLOTHING: { value: 'CLOTHING', label: 'Clothing', icon: '👚' },
  COFFEE_TEA: { value: 'COFFEE_TEA', label: 'Coffee and tea', icon: '☕' },
  DAIRY_EGGS: { value: 'DAIRY_EGGS', label: 'Dairy and eggs', icon: '🥛' },
  DRINKS: { value: 'DRINKS', label: 'Drinks', icon: '🥤' },
  ELECTRONICS_OFFICE: {
    value: 'ELECTRONICS_OFFICE',
    label: 'Electronics and office',
    icon: '💾',
  },
  FISH_SEAFOOD: {
    value: 'FISH_SEAFOOD',
    label: 'Fish and seafood',
    icon: '🦞',
  },
  FROZEN: { value: 'FROZEN', label: 'Frozen Food', icon: '🍦' },
  FRUITS_VEGETABLES: {
    value: 'FRUITS_VEGETABLES',
    label: 'Fruits and vegetables',
    icon: '🥕',
  },
  'HOUSE-CLEANING_PRODUCTS': {
    value: 'HOUSE-CLEANING_PRODUCTS',
    label: 'Cleaning',
    icon: '🧽',
  },
  KITCHEN_UTENSILS: {
    value: 'KITCHEN_UTENSILS',
    label: 'Kitchen utensils',
    icon: '🍽️',
  },
  MEAT_POULTRY: {
    value: 'MEAT_POULTRY',
    label: 'Meat and poultry',
    icon: '🥩',
  },
  OTHER: { value: 'OTHER', label: 'Other', icon: '🤷' },
  PASTRY: { value: 'PASTRY', label: 'Pastry', icon: '🍰' },
  READY_MEALS: { value: 'READY_MEALS', label: 'Instant meals', icon: '🍜' },
  SNACKS_SWEETS: { value: 'SNACKS_SWEETS', label: 'Snacks', icon: '🍿' },
  SAUCES: { value: 'SAUCES', label: 'Sauces', icon: '🍝' },
  SPICES: { value: 'SPICES', label: 'Spices', icon: '🍃' },
  STATIONARY: { value: 'STATIONARY', label: 'Stationary', icon: '🖋️' },
}

const List = () => {
  const list: IList = useListContext()

  const [listItems, setListItems] = useState<IListItem[]>(list?.items || [])
  const isBreakpoint = useMediaQuery(880)

  const { addList } = useLastVisitedListsLocalStorage()

  useEffect(() => {}, [])

  useEffect(() => {
    if (list) {
      addList(list)

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
          .map((listItem: IListItem) => listItem.buyableItem.name)
          .indexOf(buyableItem.name)
        const newList = [...listItems]
        newList[indexOfItem].quantity = newList[indexOfItem].quantity + 1
        const listItem = newList[indexOfItem]
        editListItem(listItem._id, { quantity: listItem.quantity }).then(
          (res) => {
            setListItems(newList)
          }
        )
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

  const GoogleAdVertical = ({ slotId }: { slotId: string }) => {
    useEffect(() => {
      ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      )
    }, [])

    return (
      <>
        <Head>
          <script
            async
            nonce="script-ga2"
            src="https://www.googletagmanager.com/gtag/js?id=G-6GXGD6L270"
          ></script>
          <script
            nonce="script-ga"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6GXGD6L270');
          `,
            }}
          />
          <script
            async
            nonce="script-ga3"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2039881454710498"
            crossOrigin="anonymous"
          ></script>
        </Head>
        <ins
          className="adsbygoogle ad"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-2039881454710498"
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </>
    )
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>{list.description}</h1>
      <div className={classes.flexcontainer}>
        {isBreakpoint || (
          <div style={{ width: '300px' }} className={classes.googleAd}>
            <GoogleAdVertical slotId="5334228675" />
          </div>
        )}
        <div className={classes.listContainer}>
          <AddItemButton onAdd={addListItem} />
          <div className={classes.list}>
            {listItems.length === 0 && (
              <span className={classes.noItems}>No Items ...</span>
            )}
            {Object.entries(CATEGORIES).map(([category, value]: [any, any]) => {
              return (
                <SubList
                  key={category}
                  category={category}
                  listItems={listItems}
                  setListItems={setListItems}
                />
              )
            })}
          </div>
        </div>
        {isBreakpoint || (
          <div style={{ width: '300px' }} className={classes.googleAd}>
            <GoogleAdVertical slotId="1838956353" />
          </div>
        )}
      </div>
    </div>
  )
}

export default List
