import superagent from 'superagent'
import { buildApiLink } from '../../libs/linkBuilder'

const fetchBuyableItems: any = (searchString: string) => {
  return superagent.get(
    buildApiLink(
      searchString
        ? '/buyable-item?searchTerm=' + encodeURI(searchString)
        : '/buyable-item'
    )
  )
}

export { fetchBuyableItems }
