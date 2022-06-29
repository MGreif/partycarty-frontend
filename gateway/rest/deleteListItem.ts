import superagent from 'superagent'
import { buildApiLink } from '../../libs/linkBuilder'

const deleteListItem = (listItemId: string) => {
  return superagent.delete(buildApiLink('/list-item/' + listItemId))
}

export { deleteListItem }
