import { useEffect } from 'react'
import { useCallback, useState } from 'react'
import { createListItem } from '../gateway/rest/createListItem'
import { useListContext } from '../hooks/useListContext'
import { randomString } from '../libs/mockGenerator'
import AddItemButton from './AddItemButton'
import classes from './List.module.css'
import { IBuyableItem, IListItem, ListItem } from './ListItem'

export interface IList {
    _id: string,
    items: IListItem[]
    editable: boolean
    lastEdited: Date
    description: string
}

const List = () => {

    const list: IList = useListContext()
    console.log("list", list)
    
    const [listItems, setListItems] = useState<IListItem[]>(list?.items || [])
    
    useEffect(() => {
      if (list) {
        setListItems(list.items)
      }
    }, [list])

    // Probably useless. We gonna refetch on change and instantly POST the changes to the service

    const addListItem = useCallback((buyableItem: IBuyableItem) => {
        if (listItems.map(listItem => listItem.buyableItem.name).includes(buyableItem.name)) {
            const indexOfItem = listItems.map(listItem => listItem.buyableItem.name).indexOf(buyableItem.name)
            const newList = [...listItems]
            newList[indexOfItem].quantity = newList[indexOfItem].quantity + 1
            setListItems(newList)
        } else {
            const newListItem = {
                bought: false,
                buyableItem: buyableItem._id,
                quantity: 1,
                votes: 0
            }
            createListItem(list._id, newListItem).then(({ body }: { body: any }) => {
              const item = {...{...newListItem, _id: body.listitemId}, buyableItem}
              setListItems([item, ...listItems])
            }).catch((err) => {
              console.error(err)
            })
        }
    }, [listItems, list._id])

    //
    if (!list) return null

    return <div className={classes.container}>
        <h1>{list.description}</h1>
        <div style={{width: "100%", maxWidth: "500px"}}>
            <AddItemButton onAdd={addListItem} />
            <div className={classes.list}>
                {
                    listItems.length === 0 && <span>No Items</span>
                }
                {listItems.map(data =>
                    <ListItem
                        key={data.buyableItem.name}
                        listItem={data}
                        onCheck={console.log}
                    />)}
            </div>
        </div>
    </div>
}

export default List