import { IBuyableItem } from "../../components/ListItem"
import superagent from "superagent"
import { buildApiLink } from "../../libs/linkBuilder"

export const createBuyableItem = (data: IBuyableItem) => {
  if (!data) throw new Error("[createBuyableItem] data was undefined")
  return superagent.post(buildApiLink("/buyable-item")).send(data)
}