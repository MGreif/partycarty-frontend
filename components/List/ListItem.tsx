import { Button, Checkbox, Group, Text } from '@mantine/core'
import { useEffect } from 'react'
import { useListContext } from '../../hooks/useListContext'
import {
  checkIfVotedFor,
  toggleVoteInSessionStorage,
} from '../../libs/sessionStorage'
import { CATEGORIES } from '.'
import classes from './ListItem.module.css'

export interface IListItem {
  _id: string
  buyableItem: IBuyableItem
  quantity: number
  votes: number
  bought: boolean
  tag?: string
}

export interface IListItemProps {
  listItem: IListItem
  onCheck: any
}

export interface IBuyableItem {
  _id: string
  name: string
  category: keyof typeof CATEGORIES
  picture?: string
  fluid: boolean
}

const ListItem: React.FC<IListItemProps> = ({ listItem, onCheck }) => {
  const list = useListContext()
  const userVotedForThisItem = checkIfVotedFor(list._id, listItem._id)

  const handleVote = () => {
    toggleVoteInSessionStorage(list._id, listItem._id)
  }
  return (
    <Group className={classes.container} position="apart" noWrap spacing="xl">
      <div className={classes.category}>
        <span>{listItem.buyableItem.category.toString().substring(0, 1)}</span>
      </div>
      <div className={classes.name}>
        <Text>{listItem.buyableItem.name}</Text>
        <Text size="xs" color="dimmed">
          Qty: {listItem.quantity}
        </Text>
      </div>
      {listItem.votes && <div>{listItem.votes}</div>}
      <Button
        onClick={handleVote}
        className={classes.button}
        style={{
          backgroundColor: userVotedForThisItem ? 'green' : '#D9D9D9',
        }}
      >
        Vote
      </Button>
      {listItem.tag && <span className={classes.tag}>tag: {listItem.tag}</span>}
      <Button
        className={classes.button}
        onClick={onCheck}
        style={{ backgroundColor: listItem.bought ? 'green' : '#D9D9D9' }}
      >
        Bought
      </Button>
      <Button
        onClick={onCheck}
        style={{
          backgroundColor: '#F7F7F7',
          color: 'black',
          padding: '0.2em 0.9em 0.2em 0',
        }}
      >
        X
      </Button>
    </Group>
  )
}

export { ListItem }
