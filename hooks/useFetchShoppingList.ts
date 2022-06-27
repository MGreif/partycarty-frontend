import { useEffect, useState } from "react"
import { IList } from "../components/List"
import { fetchShoppingList } from "../gateway/rest/fetchShoppingList"

const useFetchShoppingList = (id: string) => {
  const [data, setData] = useState<IList>()
  const fetch = () => {
    fetchShoppingList(id).then((res: any) => {
      setData(res.body)
    })
  }


  return { fetch, data }
}

export { useFetchShoppingList }