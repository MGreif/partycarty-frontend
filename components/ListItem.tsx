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
    category: TCategory
    picture?: string
    fluid: boolean
}

type TCategory = {
  value: string,
  label: string
}

export const CATEGORIES = {
  "BABY": { value: "BABY", label: "Babies"},
  "BAKERY": { value: "BAKERY", label: "Bakery"},
  "BEAUTY_PERSONAL_HYGIENE": { value: "BEAUTY_PERSONAL_HYGIENE", label: "Beauty and personal hygiene"},
  "BEER_WINE_SPIRITS": { value: "BEER_WINE_SPIRITS", label: "Alcohol, wine and beer"},
  "CANS_JARS": { value: "CANS_JARS", label: "Cans and jars"},
  "CEREAL_MUESLI": { value: "CEREAL_MUESLI", label: "Cereal"},
  "CLOTHING": { value: "CLOTHING", label: "Clothing"},
  "COFFEE_TEA": { value: "COFFEE_TEA", label: "Coffee and tea"},
  "DAIRY_EGGS": { value: "DAIRY_EGGS", label: "Dairy and eggs"},
  "ELECTRONICS_OFFICE": { value: "ELECTRONICS_OFFICE", label: "Electronics and office"},
  "FISH_SEAFOOD": { value: "FISH_SEAFOOD", label: "Fish and seafood"},
  "FROZEN": { value: "FROZEN", label: "Frozen Food"},
  "FRUITS_VEGETABLES": { value: "FRUITS_VEGETABLES", label: "Fruits and vegetables"},
  "HOUSE-CLEANING_PRODUCTS": { value: "HOUSE-CLEANING_PRODUCTS", label: "Cleaning"},
  "MEAT_POULTRY": { value: "MEAT_POULTRY", label: "Meat and poultry"},
  "OTHER": { value: "OTHER", label: "Other"},
  "READY_MEALS": { value: "READY_MEALS", label: "Instant meals"},
  "SNACKS_SWEETS": { value: "SNACKS_SWEETS", label: "Snacks"},
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