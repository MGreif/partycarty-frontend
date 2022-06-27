import superagent from "superagent"
import { buildApiLink } from "../../libs/linkBuilder"

const fetchListitems = (id: string) => {
  return superagent.get(buildApiLink('/shopping-list/'+id))
}