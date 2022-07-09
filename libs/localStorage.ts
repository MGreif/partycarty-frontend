import { IList } from '../components/List'

export const getLastLists = () => {
  if (typeof window === 'undefined') return {}
  return JSON.parse(localStorage.getItem('latest') || '{}')
}

export const addLastList = (args: IList) => {
  if (typeof window !== 'undefined') {
    const currentLastLists = getLastLists()
    currentLastLists[args._id] = args.description
    localStorage.setItem('latest', JSON.stringify(currentLastLists))
  }
}
