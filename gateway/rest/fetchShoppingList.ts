import superagent from "superagent"
import { IList } from "../../components/List"
import { buildApiLink } from "../../libs/linkBuilder"

const fetchShoppingList: any= (id: string) => {
  return superagent.get(buildApiLink('/shopping-list/'+id))
}

export { fetchShoppingList }