import superagent from 'superagent'
import { buildApiLink } from '../../libs/linkBuilder'
import { IListItem } from '../../components/List/ListItem'

const editListItem = (listItemId: string, update: Partial<IListItem>) => {
  return superagent.patch(buildApiLink('/list-item/' + listItemId)).send(update)
}

export { editListItem }
