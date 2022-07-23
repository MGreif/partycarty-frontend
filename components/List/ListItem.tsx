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
import { deleteListItem } from '../../gateway/rest/deleteListItem'

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
  listItems: IListItem[]
  setListItems: any
}

export interface IBuyableItem {
  _id: string
  name: string
  category: keyof typeof CATEGORIES
  picture?: string
  fluid: boolean
}

const ListItem: React.FC<IListItemProps> = ({
  listItem,
  listItems,
  setListItems,
}) => {
  const list = useListContext()
  const votedIds = useVotedIdsSessionStorage(list._id)
  const userHasInitiallyVoted = votedIds.includes(listItem._id)
  const [isBought, setIsBought] = useState<boolean>(listItem.bought)
  const [isVoted, setIsVoted] = useState<boolean>(userHasInitiallyVoted)

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

  const handleBought = (id: string, value: boolean) => {
    editListItem(id, { bought: value }).then((res) => {
      setIsBought(value)
    })
  }

  const handleDelete = (id: string) => {
    const listItem = listItems.find((listItem) => listItem._id === id)
    if (!listItem) return
    if (listItem.quantity > 1) {
      const newList = [...listItems]
      const indexOfItem = newList.map((x) => x._id).indexOf(id)
      newList[indexOfItem].quantity = newList[indexOfItem].quantity - 1
      const listItem = newList[indexOfItem]
      editListItem(listItem._id, { quantity: listItem.quantity }).then(
        (res) => {
          setListItems(newList)
        }
      )
    } else {
      deleteListItem(id).then(() => {
        setListItems(listItems.filter((item) => item._id !== id))
      })
    }
  }

  return (
    <Group className={classes.container} position="apart" noWrap spacing="xs">
      <div className={classes.category}>
        <span>
          {listItem.buyableItem.name
            .toLocaleUpperCase()
            .toString()
            .substring(0, 1)}
        </span>
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
        onClick={() => handleBought(listItem._id, !isBought)}
        style={{
          backgroundColor: isBought ? 'green' : '#D9D9D9',
        }}
      >
        Bought
      </Button>
      <Button
        onClick={() => handleDelete(listItem._id)}
        style={{
          backgroundColor: '#F7F7F7',
          color: 'black',
          padding: '0.2em 0.9em 0.1em 0',
        }}
      >
        X
      </Button>
    </Group>
  )
}

export { ListItem }
