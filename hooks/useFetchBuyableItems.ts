import { useEffect, useState } from 'react'
import { IBuyableItem } from '../components/List/ListItem'
import { fetchBuyableItems } from '../gateway/rest/fetchBuyableItems'

const useFetchBuyableItems = () => {
  const [buyableItems, setBuyableItems] = useState<IBuyableItem[]>([])
  const [addedItems, setAddedItems] = useState<IBuyableItem[]>([])
  const fetch = (searchString: string) => {
    fetchBuyableItems(searchString).then((res: any) => {
      setBuyableItems(res.body)
    })
  }

  const mutateBuyableItems = (item: IBuyableItem) => {
    setAddedItems([item, ...addedItems])
    setBuyableItems([item, ...buyableItems])
  }

  return { fetch, buyableItems, mutateBuyableItems, addedItems }
}

export { useFetchBuyableItems }
