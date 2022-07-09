import { useEffect, useState } from 'react'
import { IList } from '../components/List'
import { getLastLists, addLastList } from '../libs/localStorage'

export type TLocalStorageList = {
  [listName: string]: string
}

const useLastVisitedListsLocalStorage = () => {
  const [lists, setLists] = useState<TLocalStorageList>({})

  useEffect(() => {
    setLists(getLastLists())
  }, [])

  const addList = (list: IList) => {
    addLastList(list)
  }

  return { lists, addList }
}

export { useLastVisitedListsLocalStorage }
