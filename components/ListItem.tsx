import { Button, Checkbox, Group, Text } from "@mantine/core"
import { useEffect } from "react"
import { useListContext } from "../hooks/useListContext"
import { checkIfVotedFor, toggleVoteInSessionStorage } from "../libs/sessionStorage"
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
    _id: string,
    name: string,
    category: ECategory
    picture?: string
    fluid: boolean
}

export enum ECategory {
    FRUITS = "FRUITS",
    VEGETABLES = "VEGETABLES",
    ALCOHOL = "ALCOHOL",
    DRINKS = "DRINKS",
    SNACKS = "SNACKS",
    FROZEN = "FROZEN"
}

const ListItem: React.FC<IListItemProps> = ({listItem, onCheck}) => {
    const list = useListContext()
    const userVotedForThisItem = checkIfVotedFor(list._id, listItem._id)

    const handleVote = () => {
      toggleVoteInSessionStorage(list._id, listItem._id)
    }
    return <Group className={classes.container} position="apart" noWrap spacing="xl">
      <div className={classes.category}><span>{listItem.buyableItem.category.toString().substring(0,1)}</span></div>
      <div className={classes.name}>
        <Text>{listItem.buyableItem.name}</Text>
        <Text size="xs" color="dimmed">
          Qty: {listItem.quantity}
        </Text>
      </div>
      <div className={classes.votes}>
        <Button
          onClick={handleVote}
          style={{ backgroundColor: userVotedForThisItem ? "red" : "green"}}
        >{listItem.votes}</Button>
      </div>
      {listItem.tag && <span className={classes.tag}>tag: {listItem.tag}</span>}
      <Checkbox className={classes.checkbox} onChange={onCheck} checked={listItem.bought} size="lg" />
    </Group>
}

export { ListItem }