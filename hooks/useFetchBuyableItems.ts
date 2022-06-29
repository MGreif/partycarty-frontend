import { useEffect, useState } from 'react'
import { IList } from '../components/List'
import { IBuyableItem } from '../components/List/ListItem'
import { fetchBuyableItems } from '../gateway/rest/fetchBuyableItems'
import { useListContext } from './useListContext'

const useFetchBuyableItems = () => {
  const list: IList = useListContext()
  const [buyableItems, setBuyableItems] = useState<IBuyableItem[]>([])
  const [addedItems, setAddedItems] = useState<IBuyableItem[]>([])
  const fetch = (searchString: string) => {
    fetchBuyableItems(searchString).then((res: any) => {
      setBuyableItems(res.body)
    })
  }

  const mutateBuyableItems = (item: IBuyableItem) => {
    setAddedItems([item, ...addedItems])
  }

  return {
    fetch,
    buyableItems: [
      ...buyableItems,
      ...addedItems,
      ...list.items.map((item) => item.buyableItem),
    ].filter(
      (value, index, self) =>
        index ===
        self.findIndex((t) => t._id === value._id && t.name === value.name)
    ),
    mutateBuyableItems,
    addedItems,
  }
}

export { useFetchBuyableItems }
