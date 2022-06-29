import superagent from 'superagent'
import { buildApiLink } from '../../libs/linkBuilder'

const fetchShoppingList: any = (id: string) => {
  return superagent.get(buildApiLink('/shopping-list/' + id))
}

export { fetchShoppingList }
