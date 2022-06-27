import superagent from "superagent"
import { IList } from "../../components/List"
import { buildApiLink } from "../../libs/linkBuilder"

const fetchBuyableItems: any= (searchString: string) => {
  return superagent.get(buildApiLink(searchString ? '/buyable-item?'+encodeURI(searchString) : '/buyable-item'))
}

export { fetchBuyableItems }