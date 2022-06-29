import { Button, Checkbox, Group, Text } from '@mantine/core'
import { useEffect, useLayoutEffect } from 'react'
import { useListContext } from '../../hooks/useListContext'
import {
  checkIfVotedFor,
  toggleVoteInSessionStorage,
} from '../../libs/sessionStorage'
import { CATEGORIES } from '.'
import classes from './ListItem.module.css'
import { useVotedIdsSessionStorage } from '../../hooks/useVotedIdsSessionStorage'
import { useState } from 'react'
import { editListItem } from '../../gateway/rest/editListItem'

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
  onBuy: any
  onDelete: any
}

export interface IBuyableItem {
  _id: string
  name: string
  category: keyof typeof CATEGORIES
  picture?: string
  fluid: boolean
}

const ListItem: React.FC<IListItemProps> = ({ listItem, onBuy, onDelete }) => {
  const list = useListContext()
  const votedIds = useVotedIdsSessionStorage(list._id)
  const userHasInitiallyVoted = votedIds.includes(listItem._id)
  console.log('usevoted', userHasInitiallyVoted)
  const [isVoted, setIsVoted] = useState<boolean>(userHasInitiallyVoted)
  console.log('isvoted', isVoted, userHasInitiallyVoted)

  useEffect(() => {
    setIsVoted(userHasInitiallyVoted)
  }, [userHasInitiallyVoted])

  const handleVote = (value: boolean) => {
    toggleVoteInSessionStorage(list._id, listItem._id)
    setIsVoted(value)

    editListItem(listItem._id, {
      votes: calculateVotes(value),
    }).then(console.log)
  }

  const calculateVotes = (value: boolean) => {
    if (!userHasInitiallyVoted && value) return listItem.votes + 1
    if (userHasInitiallyVoted && !value) return listItem.votes - 1
    return listItem.votes
  }

  console.log(listItem)
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
      {(listItem.votes || isVoted) && (
        <div className={classes.votes}>{calculateVotes(isVoted)}👍</div>
      )}
      <Button
        onClick={() => handleVote(!isVoted)}
        className={classes.button}
        style={{
          marginLeft: listItem.votes ? 0 : 'auto',
          backgroundColor: isVoted ? 'green' : '#D9D9D9',
        }}
      >
        Vote
      </Button>
      {listItem.tag && <span className={classes.tag}>tag: {listItem.tag}</span>}
      <Button
        className={classes.button}
        onClick={() => onBuy(listItem._id, !listItem.bought)}
        style={{ backgroundColor: listItem.bought ? 'green' : '#D9D9D9' }}
      >
        Bought
      </Button>
      <Button
        onClick={() => onDelete(listItem._id)}
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
