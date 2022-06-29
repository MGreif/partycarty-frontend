import superagent from 'superagent'
import { buildApiLink } from '../../libs/linkBuilder'

export const createListItem = (listId: string, data: any) => {
  console.log(data)
  if (!listId) throw new Error('[createListItem] listId was undefined')
  if (!data) throw new Error('[createListItem] data was undefined')
  return superagent.post(buildApiLink('/list-item/' + listId)).send(data)
}
