import { useEffect, useState } from 'react'
import { getListStorage } from '../libs/sessionStorage'

const useVotedIdsSessionStorage = (listId: string) => {
  const [votedIds, setVotedIds] = useState<string[]>([])

  useEffect(() => {
    setVotedIds(getListStorage(listId))
  }, [])

  return votedIds
}

export { useVotedIdsSessionStorage }
