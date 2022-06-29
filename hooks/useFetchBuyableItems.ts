import { useEffect, useState } from 'react'
import { IBuyableItem } from '../components/List/ListItem'
import { fetchBuyableItems } from '../gateway/rest/fetchBuyableItems'

const useFetchBuyableItems = () => {
  const [buyableItems, setBuyableItems] = useState<IBuyableItem[]>([])
  const fetch = (searchString: string) => {
    fetchBuyableItems(searchString).then((res: any) => {
      setBuyableItems(res.body)
    })
  }

  return { fetch, buyableItems }
}

export { useFetchBuyableItems }
