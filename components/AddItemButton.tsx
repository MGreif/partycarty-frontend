import { Autocomplete, Button, InputWrapper, Text } from '@mantine/core'
import { createRef, forwardRef, useEffect, useRef, useState } from 'react'
import { mockBuyableItem } from '../libs/mockGenerator'
import { IBuyableItem } from './List/ListItem'
import classes from './AddItemButton.module.css'
import { Group } from '@mantine/core'
import CreateItemButton from './CreateItemButton'
import { createBuyableItem } from '../gateway/rest/createBuyableItem'
import { useDebouncedValue } from '@mantine/hooks'
import { useFetchBuyableItems } from '../hooks/useFetchBuyableItems'

interface IAddItemButtonProps {
  onAdd: (buyableItem: IBuyableItem) => void
}

// Todo POST changes when added

const AddItemButton = ({ onAdd }: IAddItemButtonProps) => {
  const {
    fetch: fetchBuyableItems,
    buyableItems,
    mutateBuyableItems,
    addedItems,
  }: any = useFetchBuyableItems()

  const [searchTerm, setSearchTerm] = useState<string | undefined>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [item, setItem] = useState<IBuyableItem & { value: string }>()
  const [searchTermDebounce] = useDebouncedValue(searchTerm, 500)

  useEffect(() => {
    fetchBuyableItems(searchTermDebounce)
    // eslint-disable-next-line
  }, [searchTerm])

  const handleChange = (item: IBuyableItem & { value: string }) => {
    if (item?._id === 'add-button') {
      setModalOpen(true)
    } else {
      setItem(item)
    }
  }

  // eslint-disable-next-line react/display-name
  const AutoCompleteItem = forwardRef<HTMLDivElement, IBuyableItem>(
    ({ category, fluid, _id, name, ...others }: IBuyableItem, ref) => (
      <div ref={ref} {...others} key={_id}>
        {_id !== 'add-button' ? (
          <Group noWrap>
            <span>I</span>

            <div>
              <Text>{name}</Text>
              <Text size="xs" color="dimmed">
                {_id}
              </Text>
            </div>
          </Group>
        ) : (
          <div className={classes.autocompleteAdd}>
            <span>+</span>
          </div>
        )}
      </div>
    )
  )

  const handleModalSubmit = (values: IBuyableItem) => {
    createBuyableItem(values)
      .then(({ body }: { body: IBuyableItem }) => {
        mutateBuyableItems(body)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setModalOpen(false)
      })
  }

  const handleButtonClick = () => {
    const item = [...addedItems, ...buyableItems].find(
      (i: IBuyableItem) => i.name === searchTerm
    )
    if (!item) return
    onAdd(item)
    setSearchTerm('')
    setItem(undefined)
  }

  return (
    <div className={classes.container}>
      <CreateItemButton
        open={modalOpen}
        close={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        defaultValues={{ name: searchTerm }}
      />
      <Autocomplete
        className={classes.autocomplete}
        placeholder="Banana, Snickers, Whiskey ...."
        itemComponent={AutoCompleteItem}
        data={[
          ...buyableItems.map((x: IBuyableItem) => ({
            ...x,
            value: x.name,
            fluid: x.fluid.toString(),
          })),
          { value: searchTerm || '', _id: 'add-button' },
        ]}
        onItemSubmit={handleChange}
        onChange={(value: string) => setSearchTerm(value)}
        value={searchTerm}
        defaultValue=""
      />
      {item && <Button onClick={handleButtonClick}>+</Button>}
    </div>
  )
}

export default AddItemButton
